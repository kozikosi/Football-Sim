#!/usr/bin/env python3
"""w45_check.py — extract every <script> block and node --check it (the shipped-wave gate)."""
import re, subprocess, sys, os

B = open('Football-Sim-Z-post-blue-w45.html', encoding='utf-8').read()
blocks = re.findall(r'<script(?![^>]*src=)[^>]*>(.*?)</script>', B, re.S)
print(f"{len(blocks)} inline script blocks")
os.makedirs('chk', exist_ok=True)
bad = 0
for i, s in enumerate(blocks):
    if not s.strip(): continue
    p = f'chk/b{i}.js'
    open(p, 'w', encoding='utf-8').write(s)
    r = subprocess.run(['node', '--check', p], capture_output=True, text=True)
    if r.returncode != 0:
        bad += 1
        print(f"FAIL block {i}: {r.stderr[:400]}")
print("ALL SYNTAX OK" if bad == 0 else f"{bad} BAD BLOCKS")
# leftover markers
for m in ['TODO', 'XXX', 'undefined\n', 'w41 (W3, Owner): no duplicate — on a loss the shimmer button leads alone</div']:
    hits = [mm.start() for mm in re.finditer(re.escape(m), B)]
    if m == 'undefined\n':
        hits = []
    print(f"marker {m!r}: {len(hits)}")
# the leaked comment must exist only as a real JS comment (outside template literal)
i = B.find('w41 (W3, Owner): no duplicate')
print('leaked comment occurrences:', B.count('w41 (W3, Owner): no duplicate'))
seg = B[i-90:i+30]
print('context:', repr(seg))
