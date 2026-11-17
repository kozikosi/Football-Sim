"""Python twin of colors/src/core/keyedrng.ts (Philox-2x32-10 keyed RNG). The lab and the product must draw the SAME numbers for the same
(game, event, tag, n), so a conformance vector from the lab is a vector for the product.

Independent on purpose: the TypeScript multiplies with 16-bit limbs because JS has no 64-bit integers; here Python's native ints do the
64-bit product directly, so a mistake in one multiply cannot hide in both. Run `python3 -I tools/mathlab/keyedrng_check.py` for the check.

Bit-identical to TS: philox2x32, hash_string, game_key_of, draw, KeyedRng.next/int/pick/fork/normal. normal() goes through pmath (plog, psqrt, pcos2pi:
only + - * / and floor), so it matches too. Python's own math.cos and math.log are NOT used here on purpose.
"""
import math

from pmath import plog, psqrt, pcos2pi

M0 = 0xd256d193
W0 = 0x9e3779b9
U32 = 0xffffffff


def philox2x32(c0, c1, k):
    """Philox-2x32-10: counter (c0, c1), key k, all uint32. Returns the two output words."""
    x0, x1, key = c0 & U32, c1 & U32, k & U32
    for _ in range(10):
        p = M0 * x0                      # exact 64-bit product
        x0 = ((p >> 32) ^ key ^ x1) & U32
        x1 = p & U32
        key = (key + W0) & U32
    return x0, x1


def hash_string(s):
    """FNV-1a over UTF-16 code units (JS charCodeAt), so non-BMP and lone-surrogate strings hash as in TypeScript."""
    h = 2166136261
    b = s.encode('utf-16-le', 'surrogatepass')
    for i in range(0, len(b), 2):
        h ^= b[i] | (b[i + 1] << 8)
        h = (h * 16777619) & U32
    return h


def game_key_of(seed):
    """int (a JS-safe integer, any sign) or str -> (hi, lo)."""
    if isinstance(seed, bool):
        raise ValueError('game_key_of: bool is not a seed')
    if isinstance(seed, int):
        lo = seed & U32                  # JS: seed >>> 0
        hi = (seed >> 32) & U32          # JS: Math.floor(seed / 2**32) >>> 0 (arithmetic shift floors the same way)
        return philox2x32(hi ^ 0x5bd1e995, lo, 0x27d4eb2f)
    if isinstance(seed, str):
        return hash_string('keyed-game-a:' + seed), hash_string('keyed-game-b:' + seed)
    raise ValueError('game_key_of: seed must be int or str')


def _numerator(key, event_index, tag, n):
    if not (isinstance(event_index, int) and 0 <= event_index <= U32):
        raise ValueError('draw: eventIndex must be a uint32, got %r' % (event_index,))
    if not (isinstance(n, int) and 0 <= n <= U32):
        raise ValueError('draw: n must be a uint32, got %r' % (n,))
    sub = philox2x32(key[0], key[1], hash_string(tag))[0]
    w0, w1 = philox2x32(event_index, n, sub)
    return (w0 >> 5) * 67108864 + (w1 >> 6)      # integer in [0, 2**53)


def draw_numerator(key, event_index, tag, n=0):
    """The 53-bit integer behind a draw (exact, no float involved): draw = numerator / 2**53."""
    return _numerator(key, event_index, tag, n)


def draw(key, event_index, tag, n=0):
    return _numerator(key, event_index, tag, n) / 9007199254740992.0   # exact: numerator < 2**53


class KeyedRng:
    """Same cell as an Rng: a counter inside one (game, event, tag). fork(label) extends the tag with '/label'."""

    def __init__(self, key, event_index, tag=''):
        self.key, self.event_index, self.tag, self.n = key, event_index, tag, 0

    def next(self):
        v = draw(self.key, self.event_index, self.tag, self.n)
        self.n += 1
        return v

    def int(self, lo, hi):
        return lo + math.floor(self.next() * (hi - lo + 1))

    def pick(self, xs):
        i = math.floor(self.next() * len(xs))
        if not 0 <= i < len(xs):
            raise IndexError('pick: empty list')
        return xs[i]

    def normal(self):
        u = self.next()
        while u == 0:
            u = self.next()
        v = self.next()
        return psqrt(-2 * plog(u)) * pcos2pi(v)

    def fork(self, label):
        return KeyedRng(self.key, self.event_index, self.tag + '/' + label)
