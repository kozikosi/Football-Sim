#!/usr/bin/env python3
"""w68 chain step 6b — the REPAIR: step 4's plant swallowed the previous style block's
closing tag (the anchor '</style>\\n</body>' included the closer and the replacement did not
restore it), so the w68 style tag itself was parsed as CSS text inside the w67-intro block
and .zpb-mygold never applied. Restore the closer. The battery caught it (trust screenshots
and probes over green checks — the w65 lesson, again)."""
import hashlib

SRC = '/home/z/my-project/work/w68/Football-Sim-Z-post-blue-w68.html'
STEP2B_MD5 = '13fa15e6250f3e6769a528ba14d937ce'

raw = open(SRC, 'rb').read()
assert hashlib.md5(raw).hexdigest() == STEP2B_MD5, 'input md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

rep(""" .zpb-intro-star{padding:4px 8px;}
}
<style id="zpb-w68-css">""",
    """ .zpb-intro-star{padding:4px 8px;}
}
</style>
<style id="zpb-w68-css">""",
    'the w67-intro style block is closed again')

open(SRC, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step6b done -> {SRC} md5 {h} bytes {len(src.encode("utf-8"))}')
