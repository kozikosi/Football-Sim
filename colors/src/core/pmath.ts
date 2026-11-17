// Portable math (S2). exp, log, tanh, sqrt and the inverse normal CDF built ONLY from + - * /, comparisons and floor.
//
// Why: ECMAScript lets Math.exp / log / tanh / pow / sin / cos differ in the last bits between engines (V8, SpiderMonkey, JavaScriptCore) and from
// Python's libm. Anything that must replay the same on every device or be checked against the Python lab bit for bit (the keyed RNG's Gaussians, the
// pack bake, the matchup curve) goes through this file instead. IEEE-754 defines + - * / and floor exactly, and JavaScript and CPython both perform each
// operation separately in double precision (no fused multiply-add), so the same inputs give the same bits (verified by the vectors, not assumed:
// test/core/pmath.test.ts and tools/mathlab/pmath_check.py). tools/mathlab/pmath.py is a line-for-line port; keep the two in step.
//
// Accuracy target: 1e-12 relative to a high-precision reference over the stated ranges (measured much tighter, see the test). NOT correctly rounded.
// Nothing here is a drop-in bit match for Math.*: switching a caller from Math.exp to pexp changes its output in the last digits, once, on purpose.

const LN2_HI = 6.93147180369123816490e-01;   // fdlibm ln2 split: k * LN2_HI is exact for |k| < 2^11
const LN2_LO = 1.90821492927058770002e-10;
const LOG2E = 1.4426950408889634;
const TWO64 = 18446744073709551616;
const INV_TWO64 = 5.421010862427522e-20;     // 2^-64, exact
const SQRT2 = 1.4142135623730951;
const INV_SQRT_2PI = 0.3989422804014327;
const SQRT_2PI = 2.5066282746310002;

const floor = Math.floor;                    // exact by definition
// m * 2^k with at most ONE rounding: the power of two is built exactly (doubling or halving 1), in chunks of 1000 so it never overflows or underflows on its own,
// and applied by multiplication. (Halving m step by step would round repeatedly once the result is subnormal.)
const pow2 = (k: number): number => { let f = 1; while (k > 0) { f *= 2; k--; } while (k < 0) { f /= 2; k++; } return f; };
const scale2 = (m: number, k: number): number => {
  while (k > 1000) { m *= pow2(1000); k -= 1000; }
  while (k < -1000) { m *= pow2(-1000); k += 1000; }
  return m * pow2(k);
};

/** e^x. Reduce x = k ln2 + r with |r| <= 0.347, Taylor to degree 14 (truncation about 1e-19), scale by 2^k. */
export function pexp(x: number): number {
  if (x !== x) return NaN;
  if (x > 709.782712893384) return Infinity;
  if (x < -745.1332191019411) return 0;
  const k = floor(x * LOG2E + 0.5);
  const r = (x - k * LN2_HI) - k * LN2_LO;
  let s = 1;
  for (let n = 14; n >= 1; n--) s = 1 + (r / n) * s;
  return scale2(s, k);
}

/** e^x - 1 without the cancellation near 0. */
export function pexpm1(x: number): number {
  if (x !== x) return NaN;
  if (x < 0.35 && x > -0.35) {
    let s = 1;
    for (let n = 14; n >= 2; n--) s = 1 + (x / n) * s;
    return x * s;
  }
  return pexp(x) - 1;
}

/** Natural log. Reduce to m in [sqrt(1/2), sqrt(2)) by exact powers of two, then 2 atanh((m-1)/(m+1)) as a degree-14 series in z = s^2. */
export function plog(x: number): number {
  if (x !== x || x < 0) return NaN;
  if (x === 0) return -Infinity;
  if (x === Infinity) return Infinity;
  let m = x, e = 0;
  while (m >= TWO64) { m *= INV_TWO64; e += 64; }
  while (m < INV_TWO64) { m *= TWO64; e -= 64; }
  while (m >= SQRT2) { m /= 2; e += 1; }
  while (m < SQRT2 / 2) { m *= 2; e -= 1; }
  const s = (m - 1) / (m + 1), z = s * s;
  let acc = 1 / 29;
  for (let j = 13; j >= 0; j--) acc = acc * z + 1 / (2 * j + 1);
  return e * LN2_HI + (e * LN2_LO + 2 * s * acc);
}

/** tanh x = t / (t + 2) with t = expm1(2x); saturates at +-1 beyond |x| = 22 (the difference is below 1e-19). */
export function ptanh(x: number): number {
  if (x !== x) return NaN;
  if (x > 22) return 1;
  if (x < -22) return -1;
  const t = pexpm1(2 * x);
  return t / (t + 2);
}

/** Square root by a fixed 7 Newton steps on m in [1, 4) (error under 1e-29 after step 6), then exact scaling by 2^e. */
export function psqrt(x: number): number {
  if (x !== x || x < 0) return NaN;
  if (x === 0 || x === Infinity) return x;
  let m = x, e = 0;
  while (m >= 4) { m /= 4; e++; }
  while (m < 1) { m *= 4; e--; }
  let y = (1 + m) / 2;
  for (let i = 0; i < 7; i++) y = (y + m / y) / 2;
  return scale2(y, e);
}

const HALF_PI = 1.5707963267948966;
// sin x and cos x for 0 <= x <= pi/4, nested Taylor to x^19 / x^18 with INTEGER divisors only (no rounded literals, so both languages build the same bits).
// Truncation below 1e-18 on this range.
function sinCosSmall(x: number): [number, number] {
  const z = x * x;
  let s = 1, c = 1;
  for (let k = 19; k >= 3; k -= 2) s = 1 - (z * s) / ((k - 1) * k);
  for (let k = 18; k >= 2; k -= 2) c = 1 - (z * c) / ((k - 1) * k);
  return [x * s, c];
}
// sin and cos of (r * pi/2) for r in [0, 1]: past r = 1/2 use the complement (1 - r is exact), so the angle never exceeds pi/4 and a small result keeps its relative accuracy.
function sinCosQuarter(r: number): [number, number] {
  if (r <= 0.5) return sinCosSmall(r * HALF_PI);
  const [s, c] = sinCosSmall((1 - r) * HALF_PI);
  return [c, s];
}
// Quarter-turn reduction of an angle given in TURNS (t = 1 is a full circle): every step (floor, subtract, multiply by 4) is exact, so there is no argument-reduction
// error however large t is, and the quadrant boundaries (t = 1/4, 1/2, ...) give exact 0 and +-1.
function turnParts(t: number): [number, number] {
  let f = t - floor(t);
  if (f >= 1) f = 0;                          // t = -1e-20: t - floor(t) rounds to 1; the true value is 1 - 1e-20, whose cos and sin are 1 and 0 to 1e-19
  const f4 = f * 4, q = floor(f4);
  return [q, f4 - q];
}

/** cos(2 pi t), t in turns. Absolute error about 1e-16 (NOT relative near a zero: cos(0.25) is exactly 0, cos of nearby t is accurate to its own size). NaN for non-finite t. */
export function pcos2pi(t: number): number {
  if (!(t - t === 0)) return NaN;
  const [q, r] = turnParts(t), [s, c] = sinCosQuarter(r);
  return q === 0 ? c : q === 1 ? 0 - s : q === 2 ? 0 - c : s;   // 0 - x, not -x: an exact zero stays +0
}

/** sin(2 pi t), t in turns. Same accuracy as pcos2pi. */
export function psin2pi(t: number): number {
  if (!(t - t === 0)) return NaN;
  const [q, r] = turnParts(t), [s, c] = sinCosQuarter(r);
  return q === 0 ? s : q === 1 ? c : q === 2 ? 0 - s : 0 - c;
}

// Upper-tail probability Q(y) = P(Z > y) for y >= 0. A power series below 2, a continued fraction (Mills ratio) from 2 up.
function qUpper(y: number): number {
  const phi = INV_SQRT_2PI * pexp(-0.5 * y * y);
  if (y < 2) {
    let term = y, sum = y;
    for (let n = 1; n <= 60; n++) { term = (term * y * y) / (2 * n + 1); sum += term; }
    return 0.5 - phi * sum;
  }
  let c = y;
  for (let k = 200; k >= 1; k--) c = y + k / c;
  return phi / c;
}

// Phi(x) - 1/2 for |x| <= about 1, as phi(x) * (x + x^3/3 + x^5/15 + ...): no cancellation, so the median keeps full relative accuracy.
function phiMinusHalf(x: number): number {
  let term = x, sum = x;
  for (let n = 1; n <= 40; n++) { term = (term * x * x) / (2 * n + 1); sum += term; }
  return INV_SQRT_2PI * pexp(-0.5 * x * x) * sum;
}

/** Inverse standard normal CDF: the x with P(Z <= x) = p. Halley iteration (cubic) from the Abramowitz-Stegun 26.2.23 start; 0 -> -Infinity, 1 -> +Infinity. */
export function pnorminv(p: number): number {
  if (p !== p || p < 0 || p > 1) return NaN;
  if (p === 0) return -Infinity;
  if (p === 1) return Infinity;
  if (p === 0.5) return 0;
  const d = p - 0.5;
  if (d <= 0.3 && d >= -0.3) {
    let x = d * SQRT_2PI;
    for (let i = 0; i < 6; i++) {
      const phi = INV_SQRT_2PI * pexp(-0.5 * x * x), del = (phiMinusHalf(x) - d) / phi;
      x = x - del / (1 + (x * del) / 2);
    }
    return x;
  }
  const q = p < 0.5 ? p : 1 - p;                              // 1 - p is exact for p >= 0.5
  const t = psqrt(-2 * plog(q));
  let y = t - (2.515517 + 0.802853 * t + 0.010328 * t * t) / (1 + 1.432788 * t + 0.189269 * t * t + 0.001308 * t * t * t);
  for (let i = 0; i < 4; i++) {
    const phi = INV_SQRT_2PI * pexp(-0.5 * y * y), del = (qUpper(y) - q) / phi;
    y = y + del / (1 - (y * del) / 2);
  }
  return p < 0.5 ? -y : y;
}
