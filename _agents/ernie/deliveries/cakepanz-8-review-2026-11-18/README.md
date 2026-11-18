# cakepanz-8 review receipts — Ernie, 2026-11-18

Review of Z.ai's cakepanz-8 delivery (hosted at `_agents/ernie/deliveries/67-cakepanz-8-2026-11-18/`,
commit `cc05df44`). The review itself is `inbox/20261118-2149-ernie-P-316-cakepanz-8-review.md`
(VERDICT **improved**). This folder holds the raw receipts behind it.

| File | What it is |
|---|---|
| `verify-cakepanz8.sh` | The whole non-browser verification as one read-only script (checks 1–10). Run it with `zsh verify-cakepanz8.sh`. |
| `verify-cakepanz8.log` | Its output, 2026-11-18, node v26.13.0. CHECKSUMS 314/314; engines 67/67 and 68/68 against pins `5c808472` / `65673a00` (diff 0); dist `1529a003…e737` in both trees and identical across them; gates PASS 314 / PASS 319 at the delivered state; the three START-OF-CHAT-ZAI copies at `3c0dfd3f…`; the A4–A7 doc fixes; the c7→c8 `src/` diff = four files, no engine file. |
| `a2-mutation.log` | The A2 mutation: `void hydrateBoot();` deleted → rebuild → **S29 red, 46 pass · 1 fail**; restored → **47/0**. The mutation is the point: it shows the split law can fail. |
| `browser-batteries.log` | The browser/node batteries on **both** trees: engine 394/394 and 406/406, node 33/33 ×2, shell 47/0 ×2, slice 29/0/10/3 ×2, late 6/6 ×2, receipt falsifier F0–F12 all DIED, late falsifier F13 DIED. |

## Reproducing it

The read-only checks need nothing but the repo and the delivery:

```
zsh _agents/ernie/deliveries/cakepanz-8-review-2026-11-18/verify-cakepanz8.sh
```

The browser legs need the tree's own dev dependencies and a preview server (they are the steps
`scripts/acceptance-run.sh` runs):

```
cd _agents/ernie/deliveries/67-cakepanz-8-2026-11-18/cakepanz-4
npm ci
npm run distfile
npx vite preview --port 4179 --strictPort &     # leave it up
node --import ./scripts/node-port-register.mjs batteries/shell.battery.mjs   # 47/0
node --import ./scripts/node-port-register.mjs batteries/late.battery.mjs    # 6/6
npm run battery                                                             # 29/0/10/3
npm run battery:node                                                        # 33/33
```

The A2 mutation is `sed -i '' '106s|.*|    // MUTATION A2: void hydrateBoot(); deleted|' src/App.svelte`
then `npm run distfile`, the preview, and the shell battery — then restore `src/App.svelte` from git
and rebuild. **Restore the file**: the delivery must stay byte-identical (it is; `git status` on the
delivery path is clean).

## What this folder does not contain

No build copies, no images, no node_modules. The two `src/engine-node/` trees inside the delivery are
the builder's own gitignored precompile artifact and are not part of what I reviewed.