#!/usr/bin/env bash
# Dry run of the public tree, nothing created or pushed: git-archive HEAD into a scratch dir, delete claude/cutover-hide-list.txt, then
# measure the public gate, tsc ratchet, build, and scan the result for player data. Usage: tools/cutover-dry-run.sh <scratch-dir> [node_modules-dir]
set -euo pipefail
OUT=${1:?scratch dir}; NM=${2:-}
rm -rf "$OUT"; mkdir -p "$OUT"; git archive HEAD | tar -x -C "$OUT"
n=0; while IFS= read -r p; do case "$p" in ''|'#'*) continue;; esac; if [ -e "$OUT/$p" ]; then rm -f "$OUT/$p"; n=$((n+1)); else echo "hide-list: NOT FOUND $p" >&2; exit 1; fi; done < claude/cutover-hide-list.txt
echo "removed $n hidden files"
[ -n "$NM" ] && ln -s "$NM" "$OUT/colors/node_modules"
cd "$OUT/colors"
echo "== public gate"; npm test 2>&1 | grep -E "^# (tests|pass|fail)|PUBLIC GATE|^not ok"
echo "== tsc"; npm run tsc:check 2>&1 | tail -1
echo "== build"; npm run build 2>&1 | grep -E "built in|error|Error" | head -3
echo "== exposure scan (60 sampled names, any file with >=3 hits; run against the ORIGINAL ratings list)"
python3 - "$OLDPWD" "$OUT" <<'PY'
import csv,random,sys,os
repo,out=sys.argv[1],sys.argv[2]
rows=list(csv.DictReader(open(os.path.join(repo,'data/nfl/madden27-ratings.csv'))))
random.seed(7); names=[r['name'] for r in random.sample(rows,60) if len(r['name'])>9]
hits=[]
for d,_,fs in os.walk(out):
    if 'node_modules' in d.split(os.sep): continue
    for f in fs:
        p=os.path.join(d,f)
        if os.path.islink(p) or f.endswith(('.pyc','.png','.jpg')): continue
        try: t=open(p,errors='ignore').read()
        except Exception: continue
        n=sum(1 for nm in names if nm in t)
        if n>=3: hits.append((n,os.path.relpath(p,out)))
for n,p in sorted(hits,reverse=True): print(n,p)
print(len(hits),'files with >=3 sampled names')
PY
