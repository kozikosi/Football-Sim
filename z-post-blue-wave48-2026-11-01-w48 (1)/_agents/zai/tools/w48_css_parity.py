#!/usr/bin/env python3
"""w48 proof: the <style> blocks' shimmer-relevant CSS of w48 == w46, byte-for-byte
(after whitespace normalization). JS fragments excluded entirely."""
import re, difflib

def style_css(path):
    h = open(path, encoding='utf-8').read()
    blocks = re.findall(r'<style[^>]*>(.*?)</style>', h, flags=re.S)
    css = '\n'.join(blocks)
    lines = []
    for ln in css.split('\n'):
        low = ln.lower()
        if ('shm' in low or 'zshim' in low) and len(ln.strip()) > 0:
            t = ln.strip()
            if ('{' in t or '@keyframes' in t or '@media' in t or '@supports' in t) and not t.startswith('/*'):
                lines.append(re.sub(r'\s+', ' ', t))
    seen, out = set(), []
    for l in lines:
        if l not in seen:
            seen.add(l); out.append(l)
    return out

a = style_css('/home/z/my-project/download/Football-Sim-Z-post-blue-w46.html')
b = style_css('/home/z/my-project/download/Football-Sim-Z-post-blue-w48.html')
print(f'w46 CSS lines: {len(a)} · w48 CSS lines: {len(b)}')
diff = list(difflib.unified_diff(a, b, 'w46-css', 'w48-css', lineterm='', n=0))
if not diff:
    print('SHIMMER CSS IDENTICAL: w48 == w46 (the w45/46 sweep cascade rules again)')
else:
    print('DIFFERENCES:')
    for d in diff:
        print(d[:900])
