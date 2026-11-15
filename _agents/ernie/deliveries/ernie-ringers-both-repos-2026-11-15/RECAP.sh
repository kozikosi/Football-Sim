#!/bin/zsh
# Re-runs every measurement and records the raw output. Run from anywhere.
# Usage: zsh RECAP.sh
set -u
VUE=/tmp/fs-vue
SV=/tmp/fs-svelte

echo "### ERNIE — Cardboard Ringers, both repos, 2026-11-15"
echo "### host: $(uname -srm)  node: $(node -v)  npm: $(npm -v)"
date -u +"### run at %Y-%m-%dT%H:%M:%SZ"

echo
echo "=== 0. shared files byte-identical across arms ==="
for pair in "$VUE/src/engine/ringers.ts $SV/src/lib/engine/ringers.ts" \
            "$VUE/scripts/ringers-probe.mjs $SV/scripts/ringers-probe.mjs" \
            "$VUE/scripts/timing.mjs $SV/scripts/timing.mjs" \
            "$VUE/scripts/dt.mjs $SV/scripts/dt.mjs"; do
  set -- ${=pair}
  a=$(shasum -a 256 "$1" | cut -d' ' -f1)
  b=$(shasum -a 256 "$2" | cut -d' ' -f1)
  if [ "$a" = "$b" ]; then echo "IDENTICAL $a  $1"; else echo "DIFFER    $a vs $b"; fi
done

echo
echo "=== 1. framework-owned lines (excludes shared core + probe + harness) ==="
echo "-- vue"
wc -l $VUE/src/stores/ringers.ts $VUE/src/components/CardboardRingers.vue $VUE/src/App.vue
echo "-- svelte"
wc -l $SV/src/lib/state/ringers.svelte.ts $SV/src/lib/components/CardboardRingers.svelte $SV/src/App.svelte
echo "-- store only"
wc -l $VUE/src/stores/ringers.ts $SV/src/lib/state/ringers.svelte.ts

echo
echo "=== 2. typecheck ==="
cd $VUE && npm run type-check > /tmp/r-vue-tc.txt 2>&1; echo "vue type-check exit=$?"; tail -3 /tmp/r-vue-tc.txt
cd $SV  && npm run check        > /tmp/r-sv-tc.txt  2>&1; echo "svelte check   exit=$?"; tail -2 /tmp/r-sv-tc.txt

echo
echo "=== 3. build + bytes ==="
cd $VUE && npm run build > /tmp/r-vue-build.txt 2>&1; echo "vue build exit=$?"
grep -E "dist/" /tmp/r-vue-build.txt
cd $SV  && npm run build > /tmp/r-sv-build.txt  2>&1; echo "svelte build exit=$?"
grep -E "dist/" /tmp/r-sv-build.txt
echo "-- gz-9 of concatenated dist js"
for a in vue svelte; do
  raw=$(cat /tmp/fs-$a/dist/assets/*.js | wc -c | tr -d ' ')
  gz=$(cat /tmp/fs-$a/dist/assets/*.js | gzip -9 | wc -c | tr -d ' ')
  echo "$a js_raw=$raw js_gz9=$gz"
done

echo
echo "=== 4. probe (6 laws, numeric cross-arm fidelity) ==="
cd $VUE && node scripts/ringers-probe.mjs dist src/engine/ringers.ts; echo "vue probe exit=$?"
cd $SV  && node scripts/ringers-probe.mjs dist src/lib/engine/ringers.ts; echo "svelte probe exit=$?"

echo
echo "=== 5. dev server -> first 200, and HMR (one run each; 3-run spread recorded separately) ==="
cd $VUE && node scripts/timing.mjs $VUE vue 5401 src/components/CardboardRingers.vue
cd $SV  && node scripts/timing.mjs $SV svelte 5402 src/lib/components/CardboardRingers.svelte

echo
echo "=== 6. devtools / QA hooks (dev mode) ==="
cd $VUE && node scripts/dt.mjs $VUE 5403 vue
cd $SV  && node scripts/dt.mjs $SV 5404 svelte

echo
echo "=== 7. vanilla file:// boot (offline law) ==="
cd $VUE && node scripts/filecheck.mjs $VUE
cd $SV  && node scripts/filecheck.mjs $SV