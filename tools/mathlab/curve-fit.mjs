// tools/mathlab/curve-fit.mjs — fits a quadratic to the measured slotWins curve and reports the local derivative at center.

import fs from 'fs';

// Quadratic fit: y = a + b*x + c*x^2, x = ovr - center (so b = derivative at center, c = curvature).
// Points: (x_i, y_i) for x in [-10,-7,-5,-3,0,3,5,7,10] measured at center.
// Returns {b, c, r2, yAtCenter, points}.
function quadFit(points) {
  const n = points.length;
  const sx = points.reduce((s, p) => s + p.x, 0);
  const sy = points.reduce((s, p) => s + p.y, 0);
  const sx2 = points.reduce((s, p) => s + p.x * p.x, 0);
  const sx3 = points.reduce((s, p) => s + p.x * p.x * p.x, 0);
  const sx4 = points.reduce((s, p) => s + p.x * p.x * p.x * p.x, 0);
  const sxy = points.reduce((s, p) => s + p.x * p.y, 0);
  const sx2y = points.reduce((s, p) => s + p.x * p.x * p.y, 0);
  // Normal equations for y = a + b*x + c*x^2:
  // n*a + sx*b + sx2*c = sy
  // sx*a + sx2*b + sx3*c = sxy
  // sx2*a + sx3*b + sx4*c = sx2y
  const M = [
    [n, sx, sx2, sy],
    [sx, sx2, sx3, sxy],
    [sx2, sx3, sx4, sx2y]
  ];
  // Gaussian elimination
  for (let i = 0; i < 3; i++) {
    let p = i;
    for (let k = i + 1; k < 3; k++) if (Math.abs(M[k][i]) > Math.abs(M[p][i])) p = k;
    [M[i], M[p]] = [M[p], M[i]];
    for (let k = i + 1; k < 3; k++) {
      const q = M[k][i] / M[i][i];
      for (let j = i; j <= 3; j++) M[k][j] -= q * M[i][j];
    }
  }
  const a = new Array(3).fill(0);
  for (let i = 2; i >= 0; i--) {
    let v = M[i][3];
    for (let j = i + 1; j < 3; j++) v -= M[i][j] * a[j];
    a[i] = v / M[i][i];
  }
  const [aa, b, c] = a;
  // R^2
  const yMean = sy / n;
  const ssTot = points.reduce((s, p) => s + (p.y - yMean) * (p.y - yMean), 0);
  const ssRes = points.reduce((s, p) => s + Math.pow(p.y - (aa + b * p.x + c * p.x * p.x), 2), 0);
  const r2 = ssTot > 0 ? 1 - ssRes / ssTot : 1;
  return { a: aa, b, c, r2, yAtCenter: aa };
}

// Given the JSON from local-slope.mjs, compute the quadratic fit derivative at center for each slot.
function analyze(localSlopeJson) {
  const slots = localSlopeJson.slots;
  const out = {};
  Object.keys(slots).forEach(s => {
    const e = slots[s];
    const points = [];
    // center point: wins at center = 0 (relative to baseline context)
    points.push({ x: 0, y: 0 });
    Object.keys(e).forEach(k => {
      if (k.startsWith('spread')) {
        const sp = parseInt(k.replace('spread', ''), 10);
        points.push({ x: -sp, y: e[k].loWins });
        points.push({ x: sp, y: e[k].hiWins });
      }
    });
    const f = quadFit(points);
    out[s] = {
      group: e.group,
      center: e.center,
      oldSlope: e.oldSlope,
      secantSlope: (e.spread10.hiWins - e.spread10.loWins) / 20,
      quadDerivative: Number(f.b.toFixed(6)),
      quadCurvature: Number((f.c * 100).toFixed(6)),
      quadR2: Number(f.r2.toFixed(6)),
      spreadSlopes: {
        s3: Number(e.spread3.slope.toFixed(6)),
        s5: Number(e.spread5.slope.toFixed(6)),
        s7: Number(e.spread7.slope.toFixed(6)),
        s10: Number(e.spread10.slope.toFixed(6))
      }
    };
  });
  return out;
}

const path = process.argv[2];
const json = JSON.parse(fs.readFileSync(path, 'utf8'));
const result = analyze(json);
console.log(JSON.stringify(result, null, 2));
export { quadFit, analyze };