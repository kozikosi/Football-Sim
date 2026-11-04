#!/usr/bin/env python3
"""w45_css_audit2.py — precise bug classes:
   (1) rules consuming the DARK inks (--tnd/--nmd/--nud) that are NOT dark-scoped
       → they feed light mode the pale dark ink (the 'super faded' bug).
   (2) rules consuming the LIGHT inks (--tn/--nm/--nu/--nmS) with no dark-scoped
       override for the same core selector → dark mode gets the dark-on-dark light ink."""
import re

B = open('base.html', encoding='utf-8').read()
blocks = []
for m in re.finditer(r'<style id="([^"]+)">(.*?)</style>', B, re.S):
    blocks.append((m.group(1), m.group(2)))

def parse_rules(css):
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    out = []
    i, n = 0, len(css)
    while i < n:
        j = css.find('{', i)
        if j < 0: break
        sel = css[i:j].strip()
        depth, k = 1, j+1
        while k < n and depth:
            if css[k] == '{': depth += 1
            elif css[k] == '}': depth -= 1
            k += 1
        body = css[j+1:k-1]
        if sel.startswith('@'):
            if 'media' in sel or 'supports' in sel:
                inner = parse_rules(body)
                for s2, b2 in inner:
                    out.append((sel+' :: '+s2, b2))
        elif sel:
            out.append((sel, body))
        i = k
    return out

def scope(sel):
    s = sel
    dark = ('data-theme="dark"' in s or 'data-theme=dark' in s or
            'not([data-theme="light"])' in s or 'not([data-theme=light])' in s or
            ('@media' in s and 'dark' in s))
    light = ('data-theme="light"' in s or 'not([data-theme="dark"])' in s or 'not([data-theme=dark])' in s or
             ('@media' in s and 'light' in s))
    return dark, light

def norm(sel):
    s = re.sub(r':root:not\(\[data-theme="light"\]\)\s*', '', sel)
    s = re.sub(r':root\[data-theme="dark"\]\s*', '', s)
    s = re.sub(r'@media \(prefers-color-scheme: dark\) :: ', '', s)
    s = re.sub(r':root:not\(\[data-theme=light\]\)\s*', '', s)
    return re.sub(r'\s+', ' ', s).strip()

DARK_INK = ('--tnd', '--nmd', '--nud', '--nmSd')
LIGHT_INK = ('--tn', '--nm', '--nu', '--nmS')

rules = []
for bid, css in blocks:
    for sel, body in parse_rules(css):
        rules.append((bid, sel, body))

print('== (1) DARK ink consumed in a NON-dark rule (light mode reads pale) ==')
seen = set()
for bid, sel, body in rules:
    d, l = scope(sel)
    if d: continue
    for v in DARK_INK:
        if f'var({v}' in body:
            key = (norm(sel), v)
            if key in seen: continue
            seen.add(key)
            print(f'  [{bid}] {sel}  →  {v}')

print()
print('== (2) LIGHT ink with NO dark override ==')
# index dark-override core selectors per var
dark_cores = {}
for bid, sel, body in rules:
    d, l = scope(sel)
    if not d: continue
    for v in LIGHT_INK:
        if f'var({v}' in body or f'var({v}d' in body:
            dark_cores.setdefault(v, set()).add(norm(sel))

seen2 = set()
for bid, sel, body in rules:
    d, l = scope(sel)
    if d or ('@media' in sel): continue
    for v in LIGHT_INK:
        if f'var({v}' in body:
            core = norm(sel)
            covered = any(core in dc or dc in core or core.endswith(dc) or dc.endswith(core) for dc in dark_cores.get(v, ()))
            if covered: continue
            key = (core, v)
            if key in seen2: continue
            seen2.add(key)
            print(f'  [{bid}] {sel}  →  {v}')
