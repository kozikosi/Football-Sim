# Line-for-line Python port of colors/src/core/pmath.ts (S2). Only + - * / comparisons and floor. Keep the two files in step:
# tools/mathlab/pmath_check.py proves they agree bit for bit on colors/test/core/pmath-vectors.json.
import math

LN2_HI = 6.93147180369123816490e-01
LN2_LO = 1.90821492927058770002e-10
LOG2E = 1.4426950408889634
TWO64 = 18446744073709551616.0
INV_TWO64 = 5.421010862427522e-20
SQRT2 = 1.4142135623730951
INV_SQRT_2PI = 0.3989422804014327
SQRT_2PI = 2.5066282746310002
INF = float('inf')
NAN = float('nan')


def _floor(x):
    return float(math.floor(x))


def _pow2(k):
    f = 1.0
    while k > 0:
        f *= 2.0
        k -= 1
    while k < 0:
        f /= 2.0
        k += 1
    return f


def _scale2(m, k):
    while k > 1000:
        m *= _pow2(1000)
        k -= 1000
    while k < -1000:
        m *= _pow2(-1000)
        k += 1000
    return m * _pow2(k)


def pexp(x):
    if x != x: return NAN
    if x > 709.782712893384: return INF
    if x < -745.1332191019411: return 0.0
    k = _floor(x * LOG2E + 0.5)
    r = (x - k * LN2_HI) - k * LN2_LO
    s = 1.0
    for n in range(14, 0, -1):
        s = 1 + (r / n) * s
    return _scale2(s, int(k))


def pexpm1(x):
    if x != x: return NAN
    if x < 0.35 and x > -0.35:
        s = 1.0
        for n in range(14, 1, -1):
            s = 1 + (x / n) * s
        return x * s
    return pexp(x) - 1


def plog(x):
    if x != x or x < 0: return NAN
    if x == 0: return -INF
    if x == INF: return INF
    m = x
    e = 0
    while m >= TWO64:
        m *= INV_TWO64; e += 64
    while m < INV_TWO64:
        m *= TWO64; e -= 64
    while m >= SQRT2:
        m /= 2; e += 1
    while m < SQRT2 / 2:
        m *= 2; e -= 1
    s = (m - 1) / (m + 1)
    z = s * s
    acc = 1 / 29
    for j in range(13, -1, -1):
        acc = acc * z + 1 / (2 * j + 1)
    return e * LN2_HI + (e * LN2_LO + 2 * s * acc)


def ptanh(x):
    if x != x: return NAN
    if x > 22: return 1.0
    if x < -22: return -1.0
    t = pexpm1(2 * x)
    return t / (t + 2)


def psqrt(x):
    if x != x or x < 0: return NAN
    if x == 0 or x == INF: return x
    m = x
    e = 0
    while m >= 4:
        m /= 4; e += 1
    while m < 1:
        m *= 4; e -= 1
    y = (1 + m) / 2
    for _ in range(7):
        y = (y + m / y) / 2
    return _scale2(y, e)


HALF_PI = 1.5707963267948966


def _sincos_small(x):
    z = x * x
    s = 1.0
    c = 1.0
    for k in range(19, 2, -2):
        s = 1 - (z * s) / ((k - 1) * k)
    for k in range(18, 1, -2):
        c = 1 - (z * c) / ((k - 1) * k)
    return x * s, c


def _sincos_quarter(r):
    if r <= 0.5:
        return _sincos_small(r * HALF_PI)
    s, c = _sincos_small((1 - r) * HALF_PI)
    return c, s


def _turn_parts(t):
    f = t - _floor(t)
    if f >= 1: f = 0.0
    f4 = f * 4
    q = _floor(f4)
    return q, f4 - q


def pcos2pi(t):
    if not (t - t == 0): return NAN
    q, r = _turn_parts(t)
    s, c = _sincos_quarter(r)
    return c if q == 0 else 0 - s if q == 1 else 0 - c if q == 2 else s


def psin2pi(t):
    if not (t - t == 0): return NAN
    q, r = _turn_parts(t)
    s, c = _sincos_quarter(r)
    return s if q == 0 else c if q == 1 else 0 - s if q == 2 else 0 - c


def _q_upper(y):
    phi = INV_SQRT_2PI * pexp(-0.5 * y * y)
    if y < 2:
        term = y
        s = y
        for n in range(1, 61):
            term = (term * y * y) / (2 * n + 1)
            s += term
        return 0.5 - phi * s
    c = y
    for k in range(200, 0, -1):
        c = y + k / c
    return phi / c


def _phi_minus_half(x):
    term = x
    s = x
    for n in range(1, 41):
        term = (term * x * x) / (2 * n + 1)
        s += term
    return INV_SQRT_2PI * pexp(-0.5 * x * x) * s


def pnorminv(p):
    if p != p or p < 0 or p > 1: return NAN
    if p == 0: return -INF
    if p == 1: return INF
    if p == 0.5: return 0.0
    d = p - 0.5
    if d <= 0.3 and d >= -0.3:
        x = d * SQRT_2PI
        for _ in range(6):
            phi = INV_SQRT_2PI * pexp(-0.5 * x * x)
            dl = (_phi_minus_half(x) - d) / phi
            x = x - dl / (1 + (x * dl) / 2)
        return x
    q = p if p < 0.5 else 1 - p
    t = psqrt(-2 * plog(q))
    y = t - (2.515517 + 0.802853 * t + 0.010328 * t * t) / (1 + 1.432788 * t + 0.189269 * t * t + 0.001308 * t * t * t)
    for _ in range(4):
        phi = INV_SQRT_2PI * pexp(-0.5 * y * y)
        dl = (_q_upper(y) - q) / phi
        y = y + dl / (1 - (y * dl) / 2)
    return -y if p < 0.5 else y
