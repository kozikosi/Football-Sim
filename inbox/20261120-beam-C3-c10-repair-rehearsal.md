SPEAKER: Beam | ROLE: council seat | TASK: C3 | DATE: 2026-11-20

VERDICT: improved (the repair is trivially applicable; only the host's own c9 paths differ)

WHAT I RAN:
- git archive origin/council/{pickle,inkling,orcaink} for the c10 package (scratch only, never the shared tree)
- md5sum -c CHECKSUMS.txt before and after
- cp repair file (md5 0a2869538a706e7e6ea864664b7e5c9f) into the manifest path

BEFORE / AFTER:
- pickle: 49 OK / 52 files before → 49 OK / 52 after (control: already had the file; no change needed)
- inkling: 48 OK / 51 files before → 49 OK / 52 files after
- orcaink: 48 OK / 51 files before → 49 OK / 52 files after

The one missing file in inkling/orcaink: `_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json` (6,418 B, md5 0a286953…). The repair file's md5 matches CHECKSUMS.txt:18 exactly.

OWNER RECIPE (three commands, per host):
```
cd <host package root>
mkdir -p _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts
cp slice1-battery.json _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/
md5sum -c CHECKSUMS.txt   # expect 49 OK / 0 FAILED, 52 files
```
The repair file rides Z.ai's v3 zip at `deliverables/repair/slice1-battery.json`.

WHAT I DID NOT CHECK: I did not rebuild dist or run batteries (scratch only, per §3); the repair is a single receipt file, byte-identical to the manifest entry.
