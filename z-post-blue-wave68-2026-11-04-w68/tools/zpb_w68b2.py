#!/usr/bin/env python3
"""w68 chain step 2b — the battery caught the LIVE schedule-tile renderer (the w33-era
`renderUserScheduleHTML = function` override at the tiles block) still separating the
single-game score with the middle dot. Per the Owner's dash law: a game score reads the DASH."""
import hashlib

SRC = '/home/z/my-project/work/w68/Football-Sim-Z-post-blue-w68.html'
STEP6_MD5 = '8efd44da834f6230b1e947bffa246235'

raw = open(SRC, 'rb').read()
assert hashlib.md5(raw).hexdigest() == STEP6_MD5, 'input md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

rep("""   res = '<span class="zst-res"><b class="zst-mine">' + fs + '</b><span> · </span><span>' + os + '</span><em class="zst-o">' + o + '</em></span>';""",
    """   res = '<span class="zst-res"><b class="zst-mine">' + fs + '</b><span> - </span><span>' + os + '</span><em class="zst-o">' + o + '</em></span>'; // W68 (Owner): a single-game score reads the DASH (the battery caught this live tile renderer)""",
    'live tile score dash')

open(SRC, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step2b done -> {SRC} md5 {h} bytes {len(src.encode("utf-8"))}')
