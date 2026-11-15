#!/usr/bin/env bash
# §2.2 rebuild measurement: a one-line copy change -> rebuild, timed, per arm. The change is then
# reverted and the file's sha256 is verified identical to before, so the tree is unchanged.
set -u
BASE=/home/z/my-project/sitting/_agents/glyph/deliveries/zai-sitting-2026-11-15/framework-two-arm
for pair in "arm-svelte:src/App.svelte" "arm-vue:src/App.vue"; do
  arm="${pair%%:*}"; f="${pair##*:}"
  file="$BASE/$arm/$f"
  sha0=$(sha256sum "$file" | cut -d' ' -f1)
  cp "$file" /tmp/rebuild-backup-$arm
  # the one-line copy change: the note's first words
  sed -i 's/The four-slice build — team select, draft board, saves, feed — engine-true in both arms./The four-slice build (REBUILD-TIMED COPY) — team select, draft board, saves, feed — engine-true in both arms./' "$file"
  t0=$(date +%s%N)
  (cd "$BASE/$arm" && npm run build > "/tmp/rebuild-$arm.log" 2>&1)
  rc=$?
  t1=$(date +%s%N)
  ms=$(( (t1 - t0) / 1000000 ))
  cp /tmp/rebuild-backup-$arm "$file"
  sha1=$(sha256sum "$file" | cut -d' ' -f1)
  built=$(grep -o 'built in [0-9.]*[ms]*' "/tmp/rebuild-$arm.log" | tail -1)
  echo "$arm: wallclock ${ms} ms · vite reported: ${built} · build rc=$rc · reverted: $([ "$sha0" = "$sha1" ] && echo BYTE-IDENTICAL || echo MISMATCH)"
done
