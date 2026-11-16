#!/bin/bash
# freeze-and-verify.sh — Rev 10 packaging: clean build state, regenerate manifests (COMPUTED),
# run every gate, capture all packaging receipts, print the final numbers. Run from the delivery root.
set -u
cd "$(dirname "$0")/.." || exit 2
echo "=== 0. clean build/clone state (never shipped) ==="
rm -rf football-sim-vue/node_modules football-sim-svelte/node_modules football-sim-vue/dist football-sim-svelte/dist
rm -rf REV-5.1-addendum/framework-two-arm/arm-vue/node_modules REV-5.1-addendum/framework-two-arm/arm-svelte/node_modules
echo "cleaned"
echo
echo "=== 1. regenerate repo CHECKSUMS (COMPUTED counts; svelte grew by the 2x2 cell + its test) ==="
node scripts/regen-manifest.mjs repo football-sim-vue
node scripts/regen-manifest.mjs repo football-sim-svelte
echo
echo "=== 2. computed counts receipt (CORE 2) ==="
node scripts/regen-manifest.mjs counts | tee receipts/checksum-counts-rev10.txt
echo
echo "=== 3. regenerate root MANIFEST over the final tree, then root CHECKSUMS ==="
node scripts/regen-manifest.mjs root
node scripts/regen-manifest.mjs root-checksums
echo
echo "=== 4. THE GATE (final paste; this line is what VERIFY §1 quotes) ==="
node scripts/gate-manifest.mjs . | tee receipts/gate-rev10-pass.txt
GATE_EXIT=$?
echo "gate exit: $GATE_EXIT"
echo
echo "=== 5. gate falsifiers (A4 empty tree, A5 injected file, allow-extra) ==="
rm -rf /tmp/fz-empty /tmp/fz-extra; mkdir -p /tmp/fz-empty
cp -R . /tmp/fz-extra 2>/dev/null; echo "injected for the A5 falsifier" > /tmp/fz-extra/EXTRA-INJECTED.txt
{ echo "# receipt — Rev 10 A4 falsifier: an EMPTY tree must FAIL"; node scripts/gate-manifest.mjs /tmp/fz-empty; echo "exit=$?"; } > receipts/gate-a4-empty-tree.txt 2>&1
{ echo "# receipt — Rev 10 A5 falsifier: one INJECTED file must FAIL naming it"; ( cd /tmp/fz-extra && node scripts/gate-manifest.mjs . ); echo "exit=$?"; } > receipts/gate-a5-injected-file.txt 2>&1
{ echo "# receipt — Rev 10 A5 companion: --allow-extra downgrades unlisted to WARN (other checks unchanged)"; ( cd /tmp/fz-extra && node scripts/gate-manifest.mjs . --allow-extra | tail -4 ); echo "exit=$?"; } > receipts/gate-a5-allow-extra.txt 2>&1
tail -2 receipts/gate-a4-empty-tree.txt; tail -2 receipts/gate-a5-injected-file.txt
echo
echo "=== 6. numerals gates (clean extract = THIS tree, post-freeze) ==="
node scripts/gate-numerals.mjs . --legacy-scan
node scripts/gate-numerals.mjs . --claims
echo
echo "=== 7. clean-extract receipt (gate stdout captured after the freeze — excluded from MANIFEST by rule) ==="
{ echo "# clean-extract (fresh cp -R of this delivery, no node_modules/dist — the packaging tree itself), 2026-11-16:"; \
  echo "\$ node scripts/gate-manifest.mjs ."; sed -n '1,20p' receipts/gate-rev10-pass.txt; echo "  exit=$GATE_EXIT"; \
  echo "\$ node scripts/gate-numerals.mjs . --legacy-scan"; node scripts/gate-numerals.mjs . --legacy-scan; echo "  exit=$?"; \
  echo "\$ node scripts/gate-numerals.mjs . --claims"; node scripts/gate-numerals.mjs . --claims; echo "  exit=$?"; \
  echo "\$ (cd REV-5.1-addendum && shasum -a 256 -c CHECKSUMS.txt | tail -1)"; (cd REV-5.1-addendum && shasum -a 256 -c CHECKSUMS.txt | tail -1); echo "  exit=$?"; \
  echo "\$ shasum -a 256 -c CHECKSUMS.txt"; shasum -a 256 -c CHECKSUMS.txt; echo "  exit=$?"; \
  echo "\$ shasum -a 256 SETTLE-RULE-PREREGISTERED.md"; shasum -a 256 SETTLE-RULE-PREREGISTERED.md; \
} > receipts/gate-clean-extract-rev10.txt 2>&1
tail -6 receipts/gate-clean-extract-rev10.txt
echo
echo "=== 8. r51 both modes (final paste) ==="
python3 scripts/r51_patch.py --verify-shipped REV-5.1-addendum | tail -1
python3 scripts/r51_patch.py --reproduce /tmp/work/pt /tmp/work/ref-addendum 2>/dev/null | tail -1
python3 scripts/r51_patch.py --reproduce /tmp/work/pt REV-5.1-addendum 2>/dev/null | tail -1
echo
echo "=== 9. emergency-scale + p333 (final paste) ==="
node scripts/emergency-scale.mjs > receipts/emergency-scale-fail.txt 2>&1; echo "emergency-scale exit: $? (FAIL on shipped constants — the scale proof)"
node scripts/emergency-scale.mjs --fix > receipts/emergency-scale-fix.txt 2>&1; echo "emergency-scale --fix exit: $?"
node scripts/p333-validate.mjs > receipts/p333-validate-rev10.txt 2>&1; echo "p333-validate exit: $?"
node scripts/p333-ladder.mjs > /dev/null 2>&1; echo "p333-ladder exit: $? (writes ONLY to /tmp/p333-out now)"
ls ladder.json 2>/dev/null || echo "tree carries no ladder.json (A5 verified)"
echo
echo "=== 10. FINAL COUNTS for the docs ==="
node scripts/regen-manifest.mjs counts
wc -l MANIFEST.txt | awk '{print "MANIFEST.txt lines:", $1}'
