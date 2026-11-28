#!/bin/bash
# preview-serve.sh — the acceptance composite's step 6 as ONE steppable command (the S17 A1 work).
# Starts `vite preview` on the given port detached, waits for HTTP 200, and — the D-2 stale-server
# guard, ported from the batteries — asserts the SERVED index.html names the SAME js asset as the
# on-disk dist/index.html (a zombie preview once served a stale build and poisoned a receipt).
# Leaves the server running for the browser batteries; the PID lands in /tmp/acc-preview-<port>.pid
# and acceptance-run.sh kills it at the end. Exit 1 on any failure (the composite then STOPS, and
# --resume will re-run this step).
set -e
PORT="${1:-4179}"
cd "$(dirname "$0")/.."
lsof -t -i:"$PORT" 2>/dev/null | xargs -r kill -9 2>/dev/null || true
sleep 1
npx vite preview --port "$PORT" --strictPort > /tmp/acc-preview.log 2>&1 &
echo $! > /tmp/acc-preview-"$PORT".pid
for i in $(seq 1 40); do
  sleep 0.5
  code=$(curl -s -o /tmp/acc-index.html -w "%{http_code}" "http://localhost:$PORT/" || true)
  if [ "$code" = "200" ]; then break; fi
done
echo "GET / -> HTTP ${code:-none}"
echo "served js asset: $(grep -o 'assets/index-[^"]*\.js' /tmp/acc-index.html || echo NONE)"
echo "on-disk js asset: $(grep -o 'assets/index-[^"]*\.js' dist/index.html || echo NONE)"
if [ "${code:-}" != "200" ]; then echo "preview did not serve (HTTP ${code:-none})"; exit 1; fi
served=$(grep -o 'assets/index-[^"]*\.js' /tmp/acc-index.html || true)
ondisk=$(grep -o 'assets/index-[^"]*\.js' dist/index.html || true)
if [ -z "$ondisk" ]; then echo "on-disk dist/index.html names NO js asset — the build is broken"; exit 1; fi
if [ "$served" != "$ondisk" ]; then echo "STALE SERVER: served $served ≠ on-disk $ondisk"; exit 1; fi
echo "preview up on :$PORT (pid $(cat /tmp/acc-preview-"$PORT".pid)) — served bytes match the shipped dist"
