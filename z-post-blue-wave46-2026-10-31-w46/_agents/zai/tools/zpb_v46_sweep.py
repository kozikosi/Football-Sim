#!/usr/bin/env python3
# zpb_v46_sweep.py — the no-dash sweep: a small state machine that walks the single-file
# HTML (text, tags, <style>, <script> incl. strings/templates/comments/regexes) and
# replaces every USER-VISIBLE dash with the dot separator. Comments and code are skipped.
import re

DOT = '\u00b7'  # ·

class Sweeper:
    def __init__(self, src):
        self.src = src
        self.out = []
        self.log = []   # (line, kind, before_ctx, after_ctx)
        self.line = 1

    def emit(self, ch):
        self.out.append(ch)
        if ch == '\n':
            self.line += 1

    def ctx(self, i):
        a = self.src[max(0, i-46):i]
        b = self.src[i+1:i+47]
        return (a + '[' + self.src[i] + ']' + b).replace('\n', ' ')

    def replace_at(self, i, repl, kind):
        self.log.append((self.line, kind, self.ctx(i)))
        for ch in repl:
            self.emit(ch)

    def run(self):
        s = self.src
        n = len(s)
        i = 0
        # top-level states: html-text, html-tag, html-comment, style, script
        while i < n:
            c = s[i]
            if c == '<':
                low = s[i:i+7].lower()
                if low.startswith('<style'):
                    j = s.find('>', i)
                    self._emit_span(s, i, (j+1 if j >= 0 else i+6))
                    i = (j+1 if j >= 0 else i+6)
                    i = self._do_style(i)
                    continue
                if low.startswith('<script'):
                    j = s.find('>', i)
                    self._emit_span(s, i, (j+1 if j >= 0 else i+7))
                    i = (j+1 if j >= 0 else i+7)
                    i = self._do_script(i)
                    continue
                if s[i:i+4] == '<!--':
                    j = s.find('-->', i)
                    self._emit_span(s, i, (j+3 if j >= 0 else n))
                    i = (j+3 if j >= 0 else n)
                    continue
                # a tag: emit '<', process inside-tag
                self.emit(c); i += 1
                i = self._do_tag(i)
                continue
            # html text: replace dashes
            if c == '\u2014':
                # ' — ' spaced → ' · '; bare — → '·'
                if s[i-1:i] == ' ' and s[i+1:i+2] == ' ':
                    self.replace_at(i, ' ' + DOT + ' ', 'em-html')
                    i += 1
                else:
                    self.replace_at(i, DOT, 'em-html-bare')
                    i += 1
                continue
            if c == '\u2013':
                self.replace_at(i, ' ' + DOT + ' ' if (s[i-1:i].isalnum()) and s[i+1:i+2].isalnum() else DOT, 'en-html')
                i += 1
                continue
            if c == ' ' and s[i:i+3] == ' - ':
                self.replace_at(i, ' ' + DOT + ' ', 'hyph-html')
                i += 3
                continue
            self.emit(c); i += 1
        return ''.join(self.out), self.log

    def _emit_span(self, s, a, b):
        for k in range(a, min(b, len(s))):
            self.emit(s[k])

    # ---- inside an HTML tag: replace dashes only inside quoted attribute values ----
    def _do_tag(self, i):
        s = self.src; n = len(s)
        while i < n:
            c = s[i]
            if c == '>':
                self.emit(c); return i+1
            if c in '"\'':
                q = c
                self.emit(c); i += 1
                while i < n:
                    ch = s[i]
                    if ch == '\\' and q == '"':
                        self.emit(ch); self.emit(s[i+1] if i+1 < n else ''); i += 2; continue
                    if ch == q:
                        self.emit(ch); i += 1; break
                    if ch == '\u2014':
                        self.replace_at(i, DOT, 'em-attr'); i += 1; continue
                    if ch == '\u2013':
                        self.replace_at(i, ' ' + DOT + ' ' if s[i-1:i].isalnum() and s[i+1:i+2].isalnum() else DOT, 'en-attr'); i += 1; continue
                    if ch == ' ' and s[i:i+3] == ' - ':
                        self.replace_at(i, ' ' + DOT + ' ', 'hyph-attr'); i += 3; continue
                    self.emit(ch); i += 1
                continue
            self.emit(c); i += 1
        return i

    # ---- <style>: skip comments, replace inside strings only (content values) ----
    def _do_style(self, i):
        s = self.src; n = len(s)
        while i < n:
            if s[i:i+8].lower() == '</style>':
                self._emit_span(s, i, i+8); return i+8
            c = s[i]
            if s[i:i+2] == '/*':
                j = s.find('*/', i+2)
                end = (j+2) if j >= 0 else n
                self._emit_span(s, i, end); i = end; continue
            if c in '"\'':
                q = c; self.emit(c); i += 1
                while i < n and s[i] != q:
                    if s[i] == '\\':
                        self.emit(s[i]); self.emit(s[i+1] if i+1 < n else ''); i += 2; continue
                    self.emit(s[i]); i += 1
                self.emit(q) if i < n else None; i += 1
                continue
            self.emit(c); i += 1
        return i

    # ---- <script>: full JS state machine ----
    def _do_script(self, i):
        s = self.src; n = len(s)
        END = '</script'
        stack = []  # template-literal brace stack: count of open ${ per tpl level
        state = 'code'
        strq = None
        while i < n:
            if s[i:i+8].lower() == END:
                self._emit_span(s, i, i+8); return i+8
            c = s[i]
            if state == 'code':
                if s[i:i+2] == '//':
                    j = s.find('\n', i)
                    end = (j+1) if j >= 0 else n
                    self._emit_span(s, i, end); i = end; continue
                if s[i:i+2] == '/*':
                    j = s.find('*/', i+2)
                    end = (j+2) if j >= 0 else n
                    self._emit_span(s, i, end); i = end; continue
                if c in '"\'':
                    state = 'str'; strq = c; self.emit(c); i += 1; continue
                if c == '`':
                    state = 'tpl'; stack.append(0); self.emit(c); i += 1; continue
                if c == '/':
                    # regex literal? previous significant char heuristic
                    k = len(self.out)-1
                    prev = ''
                    while k >= 0:
                        ch = self.out[k]
                        if ch not in ' \t\n':
                            prev = ch; break
                        k -= 1
                    if prev == '' or prev in '(,=:[!&|?{};+-%*~^<>':
                        i = self._skip_regex(i)
                        continue
                    self.emit(c); i += 1; continue
                self.emit(c); i += 1; continue
            if state == 'str':
                if c == '\\' and s[i+1:i+2] == 'u' and s[i+2:i+6] in ('2014', '2013'):
                    self.replace_at(i, '\\u00b7', 'str-esc'); i += 6; continue
                if c == '\\':
                    self.emit(c); self.emit(s[i+1] if i+1 < n else ''); i += 2; continue
                if c == strq:
                    state = 'code'; strq = None; self.emit(c); i += 1; continue
                i = self._dash(i, 'str')
                continue
            if state == 'tpl':
                if c == '\\' and s[i+1:i+2] == 'u' and s[i+2:i+6] in ('2014', '2013'):
                    self.replace_at(i, '\\u00b7', 'tpl-esc'); i += 6; continue
                if c == '\\':
                    self.emit(c); self.emit(s[i+1] if i+1 < n else ''); i += 2; continue
                if c == '$' and s[i+1:i+2] == '{':
                    state = 'tplcode'; self.emit('$'); self.emit('{'); i += 2; continue
                if c == '`':
                    state = 'code'; stack.pop(); self.emit(c); i += 1; continue
                i = self._dash(i, 'tpl')
                continue
            if state == 'tplcode':
                if c in '"\'':
                    state = 'str'; strq = c; self.emit(c); i += 1; continue
                if c == '`':
                    state = 'tpl'; stack.append(0); self.emit(c); i += 1; continue
                if s[i:i+2] == '//':
                    j = s.find('\n', i); end = (j+1) if j >= 0 else n
                    self._emit_span(s, i, end); i = end; continue
                if s[i:i+2] == '/*':
                    j = s.find('*/', i+2); end = (j+2) if j >= 0 else n
                    self._emit_span(s, i, end); i = end; continue
                if c == '{':
                    stack[-1] += 1; self.emit(c); i += 1; continue
                if c == '}':
                    if stack[-1] == 0:
                        state = 'tpl'  # back into the enclosing template; its frame stays
                    else:
                        stack[-1] -= 1
                    self.emit(c); i += 1; continue
                if c == '/':
                    k = len(self.out)-1; prev = ''
                    while k >= 0:
                        ch = self.out[k]
                        if ch not in ' \t\n':
                            prev = ch; break
                        k -= 1
                    if prev == '' or prev in '(,=:[!&|?{};+-%*~^<>':
                        i = self._skip_regex(i); continue
                    self.emit(c); i += 1; continue
                self.emit(c); i += 1; continue
        return i

    def _skip_regex(self, i):
        s = self.src; n = len(s)
        self.emit('/')
        i += 1
        incls = False
        while i < n:
            c = s[i]
            if c == '\\':
                self.emit(c); self.emit(s[i+1] if i+1 < n else ''); i += 2; continue
            if c == '[':
                incls = True; self.emit(c); i += 1; continue
            if c == ']':
                incls = False; self.emit(c); i += 1; continue
            if c == '/' and not incls:
                self.emit(c); i += 1
                while i < n and s[i].isalpha():
                    self.emit(s[i]); i += 1
                return i
            if c == '\n':
                # not a regex after all (unterminated) — bail out as code
                self.emit(c); return i+1
            self.emit(c); i += 1
        return i

    def _dash(self, i, kind):
        """inside a string/template: replace visible dashes"""
        s = self.src
        c = s[i]
        if c == '\u2014':
            if s[i-1:i] == ' ' and s[i+1:i+2] == ' ':
                self.replace_at(i, ' ' + DOT + ' ', kind + '-em')
            else:
                self.replace_at(i, DOT, kind + '-em-bare')
            return i+1
        if c == '\u2013':
            if s[i-1:i] != ' ':
                self.replace_at(i, ' ' + DOT + ' ', kind + '-en')
            else:
                self.replace_at(i, DOT + ' ', kind + '-en')
            return i+1
        if c == ' ' and s[i:i+3] == ' - ':
            self.replace_at(i, ' ' + DOT + ' ', kind + '-hyph')
            return i+3
        if c == '\\' and s[i:i+7] in ('\\u2014\\',):  # not used; escapes handled below
            pass
        if c == '\\' and s[i+1:i+2] == 'u' and s[i+2:i+6] in ('2014', '2013'):
            self.replace_at(i, '\\u00b7', kind + '-esc')
            return i+6
        self.emit(c)
        return i+1

def sweep(src):
    sw = Sweeper(src)
    out, log = sw.run()
    return out, log

if __name__ == '__main__':
    import sys
    src = open(sys.argv[1], encoding='utf-8').read()
    out, log = sweep(src)
    open(sys.argv[2], 'w', encoding='utf-8').write(out)
    from collections import Counter
    cnt = Counter(k for _, k, _ in log)
    print(dict(cnt))
    for ln, k, ctx in log[:14]:
        print(ln, k, '|', ctx[:110])
