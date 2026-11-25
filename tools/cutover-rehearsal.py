#!/usr/bin/env python3
"""Rehearsal of the clean 76pancakes repo, built in a scratch folder. It adds no remote and pushes nothing.

  python3 tools/cutover-rehearsal.py --out <empty folder outside this repo> --nm-colors <node_modules> --nm-server <node_modules>
                                     [--queue-ref origin/council/muse] [--receipts <file>] [--extra-hide <file of paths>]

Commit 0: the crossing set (claude/cutover-cross-list.txt + evidence inbox files) with unchanged paths, hidden files removed, ARCHIVE.md and
PINS.md added, the queue optionally filtered to open rows. Commit 1: new-repo documents and URLs. Commit 2: package names.
Each commit is exported to its own folder and gated there. Exit 1: a check failed. Exit 2: checks passed but some file holds 3 or more
player names (a publishing decision, not something this script settles).
"""
import argparse, csv, io, os, random, re, shutil, subprocess, sys

REPO = os.path.realpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
PINNED = ['colors/src/core', 'colors/src/sports', 'colors/src/platform']
NEW_URL = 'https://github.com/kozikosi/76pancakes'
problems = []

def run(cmd, cwd, check=True, env=None):
    r = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, env=env)
    if check and r.returncode != 0:
        sys.exit(f'failed: {" ".join(cmd)} in {cwd}\n{r.stdout[-3000:]}\n{r.stderr[-3000:]}')
    return r

def git(cwd, *a):
    return run(['git', *a], cwd).stdout

def check(ok, what):
    if not ok:
        problems.append(what)
        print('PROBLEM: ' + what)
    return ok

def lines(path):
    with open(os.path.join(REPO, path)) as f:
        return [l.rstrip('\n') for l in f if l.strip() and not l.startswith('#')]

def tree(cwd, rev):
    out = {}
    for rec in git(cwd, 'ls-tree', '-r', '-z', rev).split('\0'):
        if rec:
            meta, path = rec.split('\t', 1)
            out[path] = meta.split()[2]
    return out

def num(pattern, text):
    m = re.findall(pattern, text, re.M)
    return int(m[-1]) if m else None

def gates(root, nm_colors, nm_server):
    for sub, nm in (('colors', nm_colors), ('server', nm_server)):
        os.symlink(os.path.realpath(nm), os.path.join(root, sub, 'node_modules'))
    c = os.path.join(root, 'colors')
    t = run(['npm', 'test'], c, check=False)
    out = t.stdout + t.stderr
    ts = run(['npm', 'run', 'tsc:check'], c, check=False)
    b = run(['npm', 'run', 'build'], c, check=False)
    s = run(['npm', 'test'], os.path.join(root, 'server'), check=False)
    sout = s.stdout + s.stderr
    m = re.search(r'(\d+) errors \(pinned (\d+)\)', ts.stdout + ts.stderr)
    return {
        'exit': t.returncode, 'pass': num(r'^# pass (\d+)', out), 'fail': num(r'^# fail (\d+)', out),
        'gated': num(r'DATA-GATED, NOT RUN: \d+ files, (\d+) tests', out) or 0,
        'tsc_ok': ts.returncode == 0, 'tsc': m.group(1) if m else '?', 'build_ok': b.returncode == 0,
        'server_exit': s.returncode, 'server_pass': num(r'^# pass (\d+)', sout), 'server_fail': num(r'^# fail (\d+)', sout),
    }

def exposure(root, names, sample, rating):
    """Per file: distinct full names, names from the 60-name sample, and lines carrying a name together with that player's own overall."""
    hits = []
    pat = re.compile('|'.join(re.escape(n) for n in sorted(names, key=len, reverse=True)))
    for d, dirs, files in os.walk(root):
        dirs[:] = [x for x in dirs if x not in ('node_modules', '.git', 'dist')]
        for f in files:
            p = os.path.join(d, f)
            if os.path.islink(p):
                continue
            with open(p, errors='ignore') as fh:
                text = fh.read()
            found = set(pat.findall(text))
            if not found:
                continue
            rated = 0
            for line in text.split('\n'):
                if any(re.search(r'(?<![\d.+$−-])' + v + r'(?![\d.%M])', line.replace(n, '')) for n in set(pat.findall(line)) for v in rating[n]):
                    rated += 1
            hits.append((len(found), os.path.relpath(p, root), sum(1 for n in sample if n in text), rated))
    return sorted(hits, reverse=True)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--out', required=True)
    ap.add_argument('--nm-colors', required=True)
    ap.add_argument('--nm-server', required=True)
    ap.add_argument('--queue-ref')
    ap.add_argument('--receipts')
    ap.add_argument('--extra-hide')
    a = ap.parse_args()
    out = os.path.realpath(a.out)
    if out == REPO or out.startswith(REPO + os.sep):
        sys.exit('--out must be outside the repo')
    if os.path.exists(out) and os.listdir(out):
        sys.exit('--out must be empty or absent')
    new = os.path.join(out, 'repo')
    os.makedirs(new)

    source = git(REPO, 'rev-parse', 'HEAD').strip()
    dirty = git(REPO, 'status', '--porcelain', '--untracked-files=no').strip()
    src = tree(REPO, source)
    hidden = lines('claude/cutover-hide-list.txt')
    if a.extra_hide:
        with open(a.extra_hide) as f:
            hidden = hidden + [l.strip() for l in f if l.strip() and not l.startswith('#')]
    for p in hidden:
        check(p in src, 'hide list names a file that is not tracked: ' + p)
    rules = lines('claude/cutover-cross-list.txt')
    matched = {r: [p for p in src if (p.startswith(r) if r.endswith('/') else p == r)] for r in rules}
    absent_rules = [r for r, m in matched.items() if not m]
    cross = {p for m in matched.values() for p in m} - set(hidden)

    queue_note, queue_text = 'not filtered: the source queue file is a stub until M-0 lands', None
    if a.queue_ref:
        full = git(REPO, 'show', a.queue_ref + ':_agents/QUEUE.md')
        head, sep, _ = full.partition('\n## RETIRED')
        check(bool(sep), 'queue file has no RETIRED section')
        queue_text = head + '\n'
        rows = lambda t: len(re.findall(r'^\| *P-\d', t, re.M))
        check(re.search(r'^\| *P-296 ', queue_text, re.M) is not None, 'P-296 missing from the open rows')
        queue_note = (f'PREVIEW from {a.queue_ref} {git(REPO, "rev-parse", "--short", a.queue_ref).strip()}: '
                      f'{rows(full)} rows, {rows(queue_text)} open rows kept, {rows(full) - rows(queue_text)} retired rows left behind; P-296 kept')

    # evidence rule: an inbox file crosses when an open queue row or a crossing claude/ document names it
    citing = [queue_text or '']
    for p in cross:
        if p.startswith('claude/'):
            citing.append(git(REPO, 'show', f'{source}:{p}'))
    citing = '\n'.join(citing)
    evidence = sorted(p for p in src if p.startswith('inbox/') and p not in hidden and os.path.basename(p) in citing and os.path.basename(p) != 'README.md')
    if 'inbox/README.md' in src:
        evidence.append('inbox/README.md')
    cross |= set(evidence)

    # commit 0
    git(new, 'init', '-q', '-b', 'main')
    git(new, 'config', 'user.name', 'Architect')
    git(new, 'config', 'user.email', 'noreply@anthropic.com')
    arc = subprocess.run(['git', 'archive', source, '--', *sorted(cross)], cwd=REPO, capture_output=True, check=True).stdout
    subprocess.run(['tar', '-x', '-C', new], input=arc, check=True)
    if queue_text is not None:
        with open(os.path.join(new, '_agents/QUEUE.md'), 'w') as f:
            f.write(queue_text)
        cross.add('_agents/QUEUE.md')
    hashes = {p: git(REPO, 'rev-parse', f'{source}:{p}').strip() for p in PINNED}
    table = '\n'.join(f'| `{p}` | `{src[p]}` | {"filtered to open rows from the council queue" if p == "_agents/QUEUE.md" and queue_text else ""} |'
                      for p in sorted(cross) if p in src)
    drafts = os.path.join(REPO, 'claude/cutover-drafts')
    for name, values in (('ARCHIVE.md', {'SOURCE': source, 'TABLE': table}),
                         ('PINS.md', {k.split('/')[-1].upper(): v for k, v in hashes.items()})):
        text = open(os.path.join(drafts, name)).read()
        for k, v in values.items():
            text = text.replace('{{' + k + '}}', v)
        check('{{' not in text, name + ' has an unfilled placeholder')
        open(os.path.join(new, name), 'w').write(text)

    commits = []
    def commit(msg):
        git(new, 'add', '-A', '-f')
        git(new, 'commit', '-q', '-m', msg)
        commits.append((git(new, 'rev-parse', 'HEAD').strip(), msg.split('\n')[0]))

    commit(f'Start of the 76pancakes repository\n\nCopied without history from kozikosi/Football-Sim at {source}.\nSee ARCHIVE.md and PINS.md.')
    c0 = tree(new, commits[0][0])
    added = sorted(set(c0) - set(src))
    changed = sorted(p for p in set(c0) & set(src) if c0[p] != src[p])
    check(set(cross) - set(c0) == set(), 'crossing files missing from commit 0: ' + str(sorted(set(cross) - set(c0))[:10]))
    check(added == ['ARCHIVE.md', 'PINS.md'], 'unexpected added files in commit 0: ' + str(added))
    check(changed == (['_agents/QUEUE.md'] if queue_text else []), 'unexpected changed files in commit 0: ' + str(changed))
    check(not set(hidden) & set(c0), 'hidden files present in commit 0')

    # commit 1: documents and addresses
    for name in ('README.md', 'LICENSE', 'NOTICE', 'docs/EXHIBIT.md'):
        os.makedirs(os.path.dirname(os.path.join(new, name)), exist_ok=True)
        shutil.copyfile(os.path.join(drafts, name), os.path.join(new, name))
    shutil.rmtree(os.path.join(new, 'claude/cutover-drafts'), ignore_errors=True)  # drafts live in the old repo only
    def edit(path, old, repl, count):
        p = os.path.join(new, path)
        text = open(p).read()
        check(text.count(old) == count, f'{path}: expected {count} of {old!r}, found {text.count(old)}')
        open(p, 'w').write(text.replace(old, repl))
    edit('claude/bootstrap.sh', 'https://github.com/kozikosi/Football-Sim', NEW_URL, 1)
    for old in ('https://raw.githubusercontent.com/kozikosi/football-sim/', 'https://github.com/kozikosi/football-sim/raw/'):
        edit('tools/build-seat-packets.mjs', old, old.replace('kozikosi/football-sim', 'kozikosi/76pancakes'), 1)
    commit('Add README, licence, notice and the history pointer; point scripts at kozikosi/76pancakes')

    # commit 2: package names (folders keep their names, so no import changes)
    for sub, name in (('colors', '76pancakes'), ('server', '76pancakes-server')):
        edit(f'{sub}/package.json', f'"name": "{sub}"', f'"name": "{name}"', 1)
        edit(f'{sub}/package-lock.json', f'"name": "{sub}"', f'"name": "{name}"', 2)
    commit('Name the packages 76pancakes and 76pancakes-server')
    git(new, 'branch', 'architect/engine-and-seats')

    # gates
    full = os.path.join(out, 'source')
    os.makedirs(full)
    arc = subprocess.run(['git', 'archive', source], cwd=REPO, capture_output=True, check=True).stdout
    subprocess.run(['tar', '-x', '-C', full], input=arc, check=True)
    base = gates(full, a.nm_colors, a.nm_server)
    check(base['exit'] == 0 and base['fail'] == 0 and base['gated'] == 0, 'the source full gate is not green')
    with open(os.path.join(full, 'data/nfl/madden27-ratings.csv')) as f:
        rows = list(csv.DictReader(f))
    names = {r['name'] for r in rows if len(r['name']) >= 8 and ' ' in r['name']}
    rating = {n: set() for n in names}
    for row in rows:
        if row['name'] in names:
            rating[row['name']].add(row['ovr'])
    sample = [x['name'] for x in random.Random(7).sample(rows, 60) if len(x['name']) > 9]  # the earlier dry run's measure
    results = []
    for i, (sha, msg) in enumerate(commits):
        d = os.path.join(out, f'gate{i}')
        os.makedirs(d)
        arc = subprocess.run(['git', 'archive', sha], cwd=new, capture_output=True, check=True).stdout
        subprocess.run(['tar', '-x', '-C', d], input=arc, check=True)
        hits = exposure(d, names, sample, rating)
        g = gates(d, a.nm_colors, a.nm_server)
        g['subtrees'] = all(git(new, 'rev-parse', f'{sha}:{p}').strip() == h for p, h in hashes.items())
        g['hits'] = hits
        results.append(g)
        check(g['exit'] == 0 and g['fail'] == 0, f'commit {i}: public gate not green')
        check(g['pass'] is not None and g['pass'] + g['gated'] == base['pass'], f'commit {i}: pass + gated != source full count')
        check(g['tsc_ok'], f'commit {i}: tsc ratchet')
        check(g['build_ok'], f'commit {i}: build')
        check(g['server_exit'] == 0 and g['server_pass'] == base['server_pass'], f'commit {i}: server tests')
        check(g['subtrees'], f'commit {i}: pinned folder hashes moved')
        check(not [h for h in hits if h[2] >= 3], f'commit {i}: a file holds 3 or more of the 60 sampled names')

    # boot receipt: the new bootstrap, pointed at the scratch repo, from an empty folder
    script = open(os.path.join(new, 'claude/bootstrap.sh')).read().replace(NEW_URL, 'file://' + new)
    boot_sh = os.path.join(out, 'bootstrap-rehearsal.sh')
    open(boot_sh, 'w').write(script)
    boot = run(['sh', boot_sh], out, check=False, env={**os.environ, 'FOOTBALL_SIM_DIR': os.path.join(out, 'boot')})
    head = [l for l in boot.stdout.splitlines() if l.startswith(('branch=', 'NOW-CHECK'))]
    check(boot.returncode == 0 and any(l.startswith('NOW-CHECK') for l in head), 'boot from the new repo failed')

    r = io.StringIO()
    w = lambda s='': print(s, file=r)
    w('# Cutover rehearsal receipts (written by `tools/cutover-rehearsal.py`; scratch only, nothing pushed or created)')
    named = [h for h in results[-1]['hits'] if h[0] >= 3]
    w(f'Source commit `{source}`{" (tracked files had uncommitted changes)" if dirty else ""}.')
    w(f'**Build and test checks: {"PASS" if not problems else "FAIL"}.** **Player names: {f"NOT CLEAN, {len(named)} files hold 3 or more (needs a decision before any push)" if named else "no file holds 3 or more"}.**')
    if a.extra_hide:
        w(f'Variant run: {len(hidden) - len(lines("claude/cutover-hide-list.txt"))} extra files left out (`--extra-hide`); this is a what-if, not an approved list.')
    for p in problems:
        w('- PROBLEM: ' + p)
    w()
    w(f'Source full gate: colors {base["pass"]} pass / {base["fail"]} fail; server {base["server_pass"]} pass.')
    w(f'Crossing: {len(cross)} files of {len(src)} tracked; {len(src) - len(set(src) & set(c0))} stay in the old repo; {len(hidden)} hidden; {len(evidence)} inbox files cross as evidence.')
    w(f'Commit 0 against the source (git blob ids): {len(set(c0) & set(src)) - len(changed)} identical, changed {changed or "none"}, added {added}.')
    w('Queue: ' + queue_note + '.')
    if absent_rules:
        w('Cross-list entries with no tracked file: ' + ', '.join(f'`{x}`' for x in absent_rules) + '.')
    w()
    w('| Commit | What | public pass + gated | fail | tsc | build | server pass | pinned folders | files with 3+ of 60 sampled names | files with 3+ of all names |')
    w('|---|---|---|---|---|---|---|---|---|---|')
    for i, ((sha, msg), g) in enumerate(zip(commits, results)):
        w(f'| {i} | {msg} | {g["pass"]} + {g["gated"]} = {(g["pass"] or 0) + g["gated"]} | {g["fail"]} | {g["tsc"]} | {"OK" if g["build_ok"] else "FAIL"} | {g["server_pass"]} | {"same" if g["subtrees"] else "MOVED"} | {len([h for h in g["hits"] if h[2] >= 3])} | {len([h for h in g["hits"] if h[0] >= 3])} |')
    w()
    w(f'Exposure scan of the last commit with all {len(names)} full names of 8+ characters (names are not printed here). "Rated lines" is a rough count of lines that carry a name next to that player\'s own overall rating.')
    w()
    w('| File | distinct names | of the 60 sampled | rated lines |')
    w('|---|---|---|---|')
    for n, p, k, rated in results[-1]['hits']:
        w(f'| `{p}` | {n} | {k} | {rated} |')
    w()
    w('Boot from the final commit: ' + ' / '.join(f'`{l}`' for l in head))
    w()
    w('## Not covered by this rehearsal')
    w('Council seat branches; the CI workflow (it still fetches an old-history commit and would fail in the new repo); the muse copy of `tools/council.mjs`; a rewritten `claude/NOW.md`; `docs/STACK.md` and root-file cleanup; folder renames (only the package names change, so the `server/` imports of `colors/src` stay as they are); the Project boot stub that names the old URL; anything online.')
    text = r.getvalue()
    print(text)
    if a.receipts:
        open(a.receipts, 'w').write(text)
    sys.exit(1 if problems else 2 if named else 0)

if __name__ == '__main__':
    main()
