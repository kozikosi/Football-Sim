# Cross-language check for colors/src/core/pmath.ts. Reads colors/test/core/pmath-vectors.json (written by tools/mathlab/pmath-vectors.mjs):
#  1. the Python port (tools/mathlab/pmath.py) must reproduce every TypeScript output BIT FOR BIT;
#  2. fills in "ref" (libm / statistics.NormalDist, independent of pmath) and reports the worst relative error, which colors/test/core/pmath.test.ts bounds at 1e-12.
import json, math, os, statistics, struct, sys
sys.path.insert(0, os.path.dirname(__file__))
import pmath as P

path = os.path.join(os.path.dirname(__file__), '..', '..', 'colors', 'test', 'core', 'pmath-vectors.json')
V = json.load(open(path))
REF = {'pexp': math.exp, 'pexpm1': math.expm1, 'plog': math.log, 'ptanh': math.tanh, 'psqrt': math.sqrt, 'pnorminv': statistics.NormalDist().inv_cdf}
bad = 0
for name, d in V.items():
    fn = getattr(P, name)
    worst = 0.0
    d['ref'] = []
    for x, h in zip(d['x'], d['bits']):
        y = fn(float(x))
        if struct.pack('>d', y).hex() != h:
            bad += 1
            print('BIT MISMATCH', name, x, struct.pack('>d', y).hex(), h)
        r = REF[name](float(x)) if not (name == 'ptanh' and abs(x) > 22) else math.copysign(1.0, x)
        d['ref'].append(r)
        if r != 0: worst = max(worst, abs(y - r) / abs(r))
    print(f'{name}: {len(d["x"])} vectors, worst relative error vs reference {worst:.2e}')
json.dump(V, open(path, 'w'))
print('RESULT:', 'Python port reproduces every vector bit for bit' if bad == 0 else f'{bad} MISMATCHES')
sys.exit(1 if bad else 0)
