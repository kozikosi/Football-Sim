#!/usr/bin/env python3
"""Rebuild the w66 chain from the pristine baseline, cascading each step's md5 into the
next step's assertion, then verify the final md5 is stable across a full re-run."""
import hashlib, re, subprocess, sys

TOOLS = '/home/z/my-project/work/w66/tools'
STEPS = ['zpb_w66.py', 'zpb_w66b.py', 'zpb_w66c.py', 'zpb_w66d.py', 'zpb_w66e.py',
         'zpb_w66f.py', 'zpb_w66g.py', 'zpb_w66h.py', 'zpb_w66i.py', 'zpb_w66j.py', 'zpb_w66k.py',
         'zpb_w66l.py', 'zpb_w66m.py', 'zpb_w66n.py', 'zpb_w66o.py', 'zpb_w66p.py', 'zpb_w66q.py', 'zpb_w66r.py', 'zpb_w66s.py', 'zpb_w66t.py', 'zpb_w66u.py']

md5s = {}
for i, s in enumerate(STEPS):
    # patch this script's expected input md5 (the previous step's output)
    if i > 0:
        prev = md5s[STEPS[i - 1]]
        p = f'{TOOLS}/{s}'
        txt = open(p, encoding='utf-8').read()
        var = f'STEP{i}_MD5' if i < 10 else None
        # constants are named STEP{n}_MD5 by the step that consumes them
        consumer_var = f'STEP{i}_MD5'
        m = re.search(re.escape(consumer_var) + r" = '([0-9a-f]{32})'", txt)
        assert m, f'{s}: no {consumer_var} constant'
        if m.group(1) != prev:
            txt = txt.replace(m.group(0), f"{consumer_var} = '{prev}'")
            open(p, 'w', encoding='utf-8').write(txt)
    r = subprocess.run(['python3', f'{TOOLS}/{s}'], capture_output=True, text=True)
    assert r.returncode == 0, f'{s} failed:\n{r.stderr[-500:]}'
    out = r.stdout.strip().splitlines()[-1]
    h = re.search(r'md5 ([0-9a-f]{32})', out)
    md5s[s] = h.group(1)
    print(f'{s} → {h.group(1)}')

print('CHAIN OK · final md5', md5s[STEPS[-1]])
