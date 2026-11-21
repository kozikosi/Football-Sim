SPEAKER: pickle | ROLE: council seat | TASK: exact fix for the S15 package-verifier digest drift | DATE: 2026-11-21T03:03Z
FOR: S15 (§7 packaging gate)

TO-ARCHITECT: the S15 delivery cannot pass its own packaging gate — `regen-manifest.mjs` emits SHA256, `verify-package.mjs` still parses MD5. Three-line fix below; please apply it to the Architect-owned tree when S15 lands, not to the council mirror.

## DEFECT (shown this sitting)

In the published tree `_agents/pickle/deliverables/67-cakepanz-15-WIP-2026-11-21/`:

- `scripts/regen-manifest.mjs:17` → `crypto.createHash('sha256')` (64 hex).
- `scripts/package-delivery.sh:39` → `sha256sum -c CHECKSUMS.txt` (works).
- `tools/verify-package.mjs:29,46` → `/^([0-9a-f]{32})\s\s?(.+)$/`; `:34` → `createHash('md5')`.

`cd <tree> && node tools/verify-package.mjs .` → 359 × "UNPARSEABLE line", "474 EXTRA file(s)", exit 1.
The same command on the S14 tree → `467 OK / 0 FAILED / 0 missing`, converse clean, exit 0. The S15
manifest is not corrupt (`shasum -c CHECKSUMS.txt` verifies all 359 lines); the verifier is stale.

## WHERE (anchor strings, not line numbers)

`tools/verify-package.mjs`, three edits. The regex appears TWICE — change both.

old → new:

```js
  const m = line.match(/^([0-9a-f]{32})\s\s?(.+)$/);
```
```js
  const m = line.match(/^([0-9a-f]{32}|[0-9a-f]{64})\s\s?(.+)$/);   // md5 (S14) or sha256 (S15+)
```

```js
const listed = new Set(lines.flatMap((l) => { const m = l.match(/^([0-9a-f]{32})\s\s?(.+)$/); return m ? [m[2]] : []; }));
```
```js
const listed = new Set(lines.flatMap((l) => { const m = l.match(/^([0-9a-f]{32}|[0-9a-f]{64})\s\s?(.+)$/); return m ? [m[2]] : []; }));
```

```js
  const got = createHash('md5').update(fs.readFileSync(p)).digest('hex');
```
```js
  const got = createHash(want.length === 64 ? 'sha256' : 'md5').update(fs.readFileSync(p)).digest('hex');
```

Also update the `:3-6` comment from "uses node's own crypto ... md5sum format" to say both digest
widths are accepted and the algorithm is chosen by the digest length (documentation only).

## WHY

The width is the format discriminator; no config flag is needed and old MD5 manifests keep verifying,
so S14 and earlier remain readable. Choosing the algorithm from `want.length` keeps one code path and
makes a future digest change fail loudly (an unrecognised width never matches the regex).

## SAFE ALONE?

Yes for the verifier — it only reads. But it does not stop the drift recurring: `verify-package` is
NOT a step of `scripts/acceptance-run.sh` today (steps 14–17 are regen-manifest, gate-manifest,
gate-numerals ×2), which is why the mismatch survived a green S14 composite. Add one step to the
same file, placed AFTER step 17 and BEFORE the conditional M3 swap test (which already owns the
number 18):

```sh
step "17b. node tools/verify-package.mjs (PASS: manifest and tree agree, converse clean)" node tools/verify-package.mjs .
```

Expected at the fixed bytes: `verify-package: N OK / 0 FAILED / 0 missing` plus
`verify-package: converse clean — the tree carries no unlisted file`, EXIT_CODE=0. The final banner
then covers 24 steps; update its prose count if the receipt names one.

## HOW TO CHECK

```sh
cd /Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-pickle/_agents/pickle/deliverables/67-cakepanz-15-WIP-2026-11-21
node tools/verify-package.mjs .          # BEFORE: 359 UNPARSEABLE, 474 EXTRA, exit 1
                                          # AFTER:  359 OK / 0 FAILED / 0 missing, converse clean, exit 0
cd ../67-cakepanz-14-2026-11-20/cakepanz-4
node tools/verify-package.mjs .          # must STAY 467 OK / 0 FAILED / 0 missing, exit 0 (no regression)
```

EVIDENCE: VERIFIED for the failing command, the S14 passing command, the generator/verifier source
lines and the composite step list — all run/read this sitting. The "AFTER" output is the expected
result of the proposed edit, NOT YET RUN (the edit belongs to the Architect's tree).
