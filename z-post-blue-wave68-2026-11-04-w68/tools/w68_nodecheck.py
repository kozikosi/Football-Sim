#!/usr/bin/env python3
"""Extract every <script> block from the w68 build and node --check it."""
import re, subprocess, sys

DST = sys.argv[1] if len(sys.argv) > 1 else '/home/z/my-project/work/w68/Football-Sim-Z-post-blue-w68.html'
src = open(DST, encoding='utf-8').read()
blocks = re.findall(r'<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>', src, re.S)
print(f'{len(blocks)} inline script blocks')
bad = 0
for i, b in enumerate(blocks):
    if not b.strip():
        continue
    p = f'/tmp/w68script_{i}.js'
    open(p, 'w', encoding='utf-8').write(b)
    r = subprocess.run(['node', '--check', p], capture_output=True, text=True)
    if r.returncode != 0:
        bad += 1
        print(f'BLOCK {i} FAIL:\n{r.stderr[:800]}')
print('SYNTAX OK' if bad == 0 else f'{bad} BLOCKS FAILED')
sys.exit(1 if bad else 0)
