#!/zsh
# verify-cakepanz8.sh — Ernie's read-only verification of the cakepanz-8 delivery (2026-11-18).
# Every check below is READ-ONLY against the delivery except where noted; nothing here writes to
# the trees. Run from anywhere:  zsh _agents/ernie/deliveries/cakepanz-8-review-2026-11-18/verify-cakepanz8.sh
# The browser batteries (shell 47/0, slice 29/0/10/3, late 6/6) are NOT in this script — they need
# a preview server and ~4 min; their captured stdout is in browser-batteries.log.
set -u
D="$(cd "$(dirname "$0")/.." && pwd)/67-cakepanz-8-2026-11-18"
S="$D/cakepanz-4"
P="$D/cakepanz-4-prepared"
R="$(cd "$(dirname "$0")" && pwd)"
say() { print -r -- ""; print -r -- "== $*"; }

say "node: $(node --version)  npm: $(npm --version)"

say "1. CHECKSUMS (shipped tree, 314 expected)"
(cd "$S" && shasum -a 256 -c CHECKSUMS.txt 2>&1 | grep -c ': OK$') | sed 's/^/files OK: /'

say "2. engine byte-identity vs the pins (git hash-object of every file vs git ls-tree of colors/src)"
for pair in "5c808472 $S" "65673a00 $P"; do
  set -- ${=pair}; PIN=$1; TREE=$2
  git ls-tree -r "$PIN" | awk -F'\t' '{if (index($2,"colors/src/")==1) {split($1,a," "); print a[3], $2}}' \
    | sed 's|colors/src/||' | sort > /tmp/ernie-pin.txt
  (cd "$TREE/src/engine" && find . -type f | sed 's|^\./||' | while read -r f; do print "$(git hash-object "$f") $f"; done | sort) > /tmp/ernie-loc.txt
  print -r -- "pin $PIN: pin files $(wc -l < /tmp/ernie-pin.txt | tr -d ' ') · tree files $(wc -l < /tmp/ernie-loc.txt | tr -d ' ') · diff lines $(diff /tmp/ernie-pin.txt /tmp/ernie-loc.txt | wc -l | tr -d ' ')"
done

say "3. dist/single.html sha256 (expect 1529a003...e737 in both trees)"
shasum -a 256 "$S/dist/single.html" "$P/dist/single.html"
diff -rq "$S/dist" "$P/dist" > /dev/null && print -r -- "dist cross-tree: identical" || print -r -- "dist cross-tree: DIFFER"

say "4. flex.json identical across the trees"
cmp -s "$S/tools/mathlab/flex.json" "$P/tools/mathlab/flex.json" && print -r -- "flex.json: identical" || print -r -- "flex.json: DIFFER"

say "5. A1 fix present (App.svelte: the go() redirect + the unconditional go('hub'))"
grep -n "if (s === 'board'" "$S/src/App.svelte" "$P/src/App.svelte"
grep -n "a resumed season always lands home" "$S/src/App.svelte" "$P/src/App.svelte"

say "6. manifest gate at the delivered state (regen NOT run first — this is the state the Owner receives)"
(cd "$S" && node scripts/gate-manifest.mjs 2>&1 | tail -1) | sed 's/^/shipped:  /'
(cd "$P" && node scripts/gate-manifest.mjs 2>&1 | tail -1) | sed 's/^/prepared: /'

say "7. A9 — the three START-OF-CHAT-ZAI.md copies"
shasum -a 256 "$R/../67-cakepanz-8-2026-11-18/START-OF-CHAT-ZAI.md" \
              "$S/START-OF-CHAT-ZAI.md" "$P/START-OF-CHAT-ZAI.md"

say "8. doc fixes A4-A7"
grep -n "expect 33/33" "$S/scripts/acceptance-run.sh" | head -1
grep -n "F0–F12" "$S/scripts/acceptance-run.sh" | head -1
grep -c "284" "$S/README.md" | sed 's/^/README.md lines containing 284 (expect 1, the correction): /'
grep -n "node-port-register.mjs batteries/shell.battery.mjs" "$S/README.md" | head -1
grep -n "those two files plus this receipt" "$S/deliveries/gh-pages-fix/FIX-RECEIPT.md" | head -1

say "9. Block B render-layer scope — the c7 -> c8 src diff (expect App.svelte + 3 components, no engine)"
diff -rq "$R/../cakepanz-7-2026-11-18/cakepanz-4/src" "$S/src" 2>&1 | grep -v engine-node

say "10. Block B findings F1/F2/F3 — the anchors"
print -r -- "F1 (dead control): the simple row's main button and its missing panel"
grep -n "cp-mainsimple\|cp-fits" "$S/src/lib/components/BoardRow.svelte"
print -r -- "F2 (basis): the simple row's number vs the sort options"
grep -n "cp-rec\|k: 'wins'\|k: 'priority'\|k: 'ovr'" "$S/src/lib/components/BoardRow.svelte" "$S/src/lib/components/SortControls.svelte"
print -r -- "F3 (tokens): the new hard-coded golds vs the theme's tokens"
grep -n "cp-rec\|cp-pickbtn" "$S/src/lib/components/BoardRow.svelte" | grep -n "#e8c87e\|#8a5f18\|217, 169, 76"
grep -n -- "--gold2:\|--gold3:\|--goldm:" "$S/src/lib/assets/tokens-w89.css" | head -3
print -r -- ""
print -r -- "done."