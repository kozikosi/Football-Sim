# Cross-language check for colors/src/core/pmath.ts. Reads colors/test/core/pmath-vectors.json (written by tools/mathlab/pmath-vectors.mjs):
#  1. the Python port (tools/mathlab/pmath.py) must reproduce every TypeScript output BIT FOR BIT;
#  2. fills in "ref" (libm / statistics.NormalDist, independent of pmath) and reports the worst relative error, which colors/test/core/pmath.test.ts bounds at 1e-12.
import json, math, os, statistics, struct, sys
sys.path.insert(0, os.path.dirname(__file__))
import pmath as P

path = os.path.join(os.path.dirname(__file__), '..', '..', 'colors', 'test', 'core', 'pmath-vectors.json')
V = json.load(open(path))
from decimal import Decimal as _D, getcontext as _gc
from fractions import Fraction as _F
_gc().prec = 60
_PI = _D('3.14159265358979323846264338327950288419716939937510582097494')
def _trig2pi(x, want_cos):
    """cos / sin of 2 pi x at 60 digits (x is an exact double, reduced exactly): independent of pmath AND of libm."""
    fr = _F(float(x)); t = _D(fr.numerator) / _D(fr.denominator)
    a = 2 * _PI * (t - t.to_integral_value(rounding='ROUND_FLOOR'))
    if a > _PI: a -= 2 * _PI
    c, sn, tc, ts = _D(1), a, _D(1), a
    for k in range(1, 60):
        tc = -tc * a * a / ((2 * k - 1) * (2 * k)); c += tc
        ts = -ts * a * a / ((2 * k) * (2 * k + 1)); sn += ts
    return float(c if want_cos else sn)        # correctly rounded reference value: error vs the true value is at most 1 ulp of the result
def _cos2pi(x): return _trig2pi(x, True)
def _sin2pi(x): return _trig2pi(x, False)
ABS = {'pcos2pi', 'psin2pi'}        # trig sets are judged on ABSOLUTE error (relative is meaningless at a zero)
REF = {'pcos2pi': _cos2pi, 'psin2pi': _sin2pi, 'pexp': math.exp, 'pexpm1': math.expm1, 'plog': math.log, 'ptanh': math.tanh, 'psqrt': math.sqrt, 'pnorminv': statistics.NormalDist().inv_cdf}
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
        if name in ABS: worst = max(worst, abs(y - r))
        elif r != 0: worst = max(worst, abs(y - r) / abs(r))
    print(f'{name}: {len(d["x"])} vectors, worst {"absolute" if name in ABS else "relative"} error vs reference {worst:.2e}')
json.dump(V, open(path, 'w'))
print('RESULT:', 'Python port reproduces every vector bit for bit' if bad == 0 else f'{bad} MISMATCHES')
sys.exit(1 if bad else 0)
