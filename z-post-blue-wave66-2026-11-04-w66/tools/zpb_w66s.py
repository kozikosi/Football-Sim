#!/usr/bin/env python3
"""w66 chain step 19 — regression fix caught by the round-2 battery: the shared Season
Review page (round 1, step 3) references ${user} but the extraction left the variable
behind in renderSeasonCompleteView's scope. The review page carries its own user now."""
import hashlib

DST = '/home/z/my-project/work/w66/Football-Sim-Z-post-blue-w66.html'
STEP18_MD5 = '54ccb70d3f95193da135d9ef5ddd2bef'

raw = open(DST, 'rb').read()
assert hashlib.md5(raw).hexdigest() == STEP18_MD5, 'step-18 md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

rep("function renderSeasonReviewView(container){\n html = `<div class=\"panel\" style=\"margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;\"><h2 style=\"margin:0;\">Season Review</h2>",
    "function renderSeasonReviewView(container){\n const user = seasonUserTeam(); // w66 fix (the round-2 battery caught it): the shared review body reads ${user} — the w65 inline copy had it in scope, the extracted function carries its own\n html = `<div class=\"panel\" style=\"margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;\"><h2 style=\"margin:0;\">Season Review</h2>",
    'shared review user scope', 1)

open(DST, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step 19 → md5 {h} · {len(src.encode("utf-8")):,} bytes')
