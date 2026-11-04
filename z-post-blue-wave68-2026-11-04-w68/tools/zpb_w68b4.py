#!/usr/bin/env python3
"""w68 chain step 6c — the visual-polish pass the evidence shots demanded: the victory page's
god-ray wheels masked so they glow around the crest and fade before the edges (the full-screen
wash was too loud on desktop), the ray alphas softened to match."""
import hashlib

SRC = '/home/z/my-project/work/w68/Football-Sim-Z-post-blue-w68.html'
STEP6B_MD5 = '4df0c514119c577dd6d7e6ede5485693'

raw = open(SRC, 'rb').read()
assert hashlib.md5(raw).hexdigest() == STEP6B_MD5, 'input md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

rep(""".zpb-victory-rays,.zpb-victory-rays2{position:absolute;left:50%;top:42%;width:220vmax;height:220vmax;transform:translate(-50%,-50%);pointer-events:none;background:repeating-conic-gradient(from 0deg,rgba(217,169,76,.10) 0deg 7deg,transparent 7deg 18deg);-webkit-mask-image:radial-gradient(circle at 50% 50%,#000 0%,transparent 60%);mask-image:radial-gradient(circle at 50% 50%,#000 0%,transparent 60%);}""",
    """.zpb-victory-rays,.zpb-victory-rays2{position:absolute;left:50%;top:42%;width:220vmax;height:220vmax;transform:translate(-50%,-50%);pointer-events:none;background:repeating-conic-gradient(from 0deg,rgba(217,169,76,.08) 0deg 7deg,transparent 7deg 18deg);-webkit-mask-image:radial-gradient(circle at 50% 50%,#000 0%,rgba(0,0,0,.5) 7%,transparent 19%);mask-image:radial-gradient(circle at 50% 50%,#000 0%,rgba(0,0,0,.5) 7%,transparent 19%);} /* W68 (Owner): the rays glow around the crest and fade before the edges — the full-screen wash was too loud */""",
    'rays masked tight')

rep(""".zpb-victory-rays2{background:repeating-conic-gradient(from 180deg,rgba(217,169,76,.08) 0deg 11deg,transparent 11deg 26deg);}""",
    """.zpb-victory-rays2{background:repeating-conic-gradient(from 180deg,rgba(217,169,76,.06) 0deg 11deg,transparent 11deg 26deg);}""",
    'rays2 alpha softened')

open(SRC, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step6c done -> {SRC} md5 {h} bytes {len(src.encode("utf-8"))}')
