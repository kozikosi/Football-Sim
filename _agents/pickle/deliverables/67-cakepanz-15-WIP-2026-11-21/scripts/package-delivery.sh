#!/bin/bash
# package-delivery.sh — the END-OF-CHAT packaging: local lane commit, ONE zip, verified.
# Zip contents: the full tree (dist/ included — the manifest hashes it), EXCLUDING node_modules
# and .git (the same packaging the previous deliveries used). Verified: unzip -t clean AND a
# sha256 roundtrip in a temp extract.
set -e
TREE=/home/z/my-project/cakepanz
OUT=/home/z/my-project/download
ZIP=67-cakepanz-fix-2026-11-17.zip

cd "$TREE"

# the lane commit (local hygiene only — never pushed; §5 rule 8 of the START doc)
if [ ! -d .git ]; then git init -q .; fi
git add -A 2>/dev/null || true
git -c user.name="Z.ai" -c user.email="zai@seat.local" commit -q -m "Z.ai session end: the 2026-11-17 fix round — D1-D5 fixed + the season flow real (shell battery 46/0), the season-table defects, P-365/368/369, the falsifier suite, the swap test, the gates over dist/" 2>/dev/null || echo "(nothing new to commit)"
git log --oneline -1 || true

# regenerate the checksums/manifest LAST (the zip's own bytes are excluded from hashing by the gate skip)
node scripts/regen-manifest.mjs
node scripts/gate-manifest.mjs
node scripts/gate-numerals.mjs
node scripts/gate-numerals.mjs

# the zip
mkdir -p "$OUT"
rm -f "$OUT/$ZIP"
cd /home/z/my-project
zip -qr "$OUT/$ZIP" cakepanz -x "cakepanz/node_modules/*" -x "cakepanz/.git/*" -x "cakepanz/.svelte-kit/*"
echo "zip written: $OUT/$ZIP ($(du -h "$OUT/$ZIP" | cut -f1))"

# verification 1: the archive is intact
unzip -t "$OUT/$ZIP" > /tmp/zip-test.log 2>&1 && echo "unzip -t: OK ($(grep -c OK /tmp/zip-test.log) entries tested)" || { echo "unzip -t FAILED"; tail -5 /tmp/zip-test.log; exit 1; }

# verification 2: the checksum roundtrip in a temp extract
rm -rf /tmp/zip-verify && mkdir -p /tmp/zip-verify
unzip -q "$OUT/$ZIP" -d /tmp/zip-verify
cd /tmp/zip-verify/cakepanz
sha256sum -c CHECKSUMS.txt > /tmp/zip-sha.log 2>&1 && echo "sha256 roundtrip: OK ($(grep -c ': OK' /tmp/zip-sha.log) files verified)" || { echo "sha256 roundtrip FAILED"; grep -v ': OK' /tmp/zip-sha.log | head -5; exit 1; }

# verification 3: the gate re-runs clean inside the extract
node scripts/gate-manifest.mjs && node scripts/gate-numerals.mjs
echo "PACKAGE VERIFIED: $OUT/$ZIP"
