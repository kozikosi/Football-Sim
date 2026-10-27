#!/usr/bin/env python3
# P-030 RNG inventory: map every Math.random() site in PreColors.html to its enclosing top-level function.
import re, sys

path = '/home/z/my-project/boot/PreColors.html'
lines = open(path, encoding='utf-8').read().splitlines()

fn_re = re.compile(r'^function (\w+)')
const_re = re.compile(r'^const (\w+)')

cur = '(top-level scope)'
inventory = []
for i, ln in enumerate(lines, 1):
    m = fn_re.match(ln)
    if m:
        cur = m.group(1)
    cm = const_re.match(ln)
    if cm:
        cur = 'const ' + cm.group(1)
    if 'Math.random()' in ln:
        # count sites on this line
        n = ln.count('Math.random()')
        inventory.append((i, cur, n, ln.strip()[:110]))

print(f'{len(inventory)} lines carry Math.random() ({sum(x[2] for x in inventory)} sites total)')
print()
cats = {}
for i, fn, n, txt in inventory:
    print(f'{i:5d}  {fn:32s} x{n}  {txt}')
