# Cross-language check for colors/src/core/keyedrng.ts. Reads colors/test/core/keyedrng-vectors.json (written by tools/mathlab/keyedrng-vectors.mjs).
# The Python twin (tools/mathlab/keyedrng.py) must reproduce every TypeScript output EXACTLY, normal() included (it runs on pmath, not libm).
# Anchors that do not come from our TypeScript: the Random123 known-answer vectors (published), checked here before anything else.
import json, os, struct, sys, math
sys.path.insert(0, os.path.dirname(__file__))
import keyedrng as K

bad = 0
def fail(*a):
    global bad
    bad += 1
    if bad <= 20: print('MISMATCH', *a)

KAT = [((0, 0, 0), (0xff1dae59, 0x6cd10df2)), ((0xffffffff,) * 3, (0x2c3f628b, 0xab4fd7ad)), ((0x243f6a88, 0x85a308d3, 0x13198a2e), (0xdd7ce038, 0xf62a4c12))]
for args, want in KAT:
    if K.philox2x32(*args) != want: fail('Random123 KAT', args, K.philox2x32(*args), want)
print('Random123 known-answer vectors:', 'ok' if bad == 0 else 'FAILED')

V = json.load(open(os.path.join(os.path.dirname(__file__), '..', '..', 'colors', 'test', 'core', 'keyedrng-vectors.json')))
hexd = lambda x: struct.pack('>d', x).hex()
seed = lambda s: K.game_key_of(int(s['v']) if s['k'] == 'int' else s['v'])

for v in V['philox']:
    if list(K.philox2x32(v['c0'], v['c1'], v['k'])) != v['out']: fail('philox', v)
for v in V['hash']:
    if K.hash_string(v['s']) != v['h']: fail('hash', repr(v['s'][:12]), K.hash_string(v['s']), v['h'])
for v in V['gamekey']:
    if list(seed(v['seed'])) != [v['hi'], v['lo']]: fail('gamekey', v['seed'])
for v in V['draw']:
    g = seed(v['seed'])
    nm = K.draw_numerator(g, v['event'], v['tag'], v['n'])
    if str(nm) != v['numer'] or hexd(K.draw(g, v['event'], v['tag'], v['n'])) != v['bits']: fail('draw', v['seed'], v['event'], v['n'])

nbit = 0
for v in V['rng']:
    g = seed(v['seed']); r = K.KeyedRng(g, v['event'], v['tag'])
    n1, n2 = r.next(), r.next(); i1, i2 = r.int(1, 6), r.int(0, 99); p = r.pick(list('abcdefg')); nm = r.normal(); n3 = r.next()
    if [hexd(n1), hexd(n2), hexd(n3)] != v['next']: fail('rng next', v['seed'])
    if [i1, i2] != v['ints'] or p != v['pick']: fail('rng int/pick', v['seed'])
    f1 = K.KeyedRng(g, v['event'], v['tag']).fork('x'); f2 = K.KeyedRng(g, v['event'], v['tag']).fork('x').fork('y')
    if [hexd(f1.next()), hexd(f1.next())] != v['fork'] or [hexd(f2.next())] != v['fork2']: fail('rng fork', v['seed'])
    if hexd(nm) != v['normal']: fail('rng normal', v['seed'], hexd(nm), v['normal'])
    nbit += 1
for v in V['throws']:
    try:
        K.draw(K.game_key_of(1), v['event'], 't', v['n']); threw = False
    except ValueError: threw = True
    if threw != v['threw']: fail('throws', v)

cnt = {k: len(V[k]) for k in V}
print('checked:', ', '.join(f'{k} {n}' for k, n in cnt.items()))
print(f'normal(): {nbit}/{len(V["rng"])} compared bit for bit')
print('RESULT:', 'Python twin reproduces every vector exactly, normal() included' if bad == 0 else f'{bad} MISMATCHES')
sys.exit(1 if bad else 0)
