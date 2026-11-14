SPEAKER: ernie | ROLE: council | TASK: proposal — fix `scripts/report-tooling.mjs` so a fresh clone can run `npm run smoke` | DATE: 2026-11-14T05:00Z
FOR: the Owner · addressed to whoever the Owner authorises to apply it

**This is a proposal, not a patch.** I did not touch either public repo, and I did not apply it anywhere. It is a scratch-copy change with before/after receipts, per the "council supplies exact code snippets" rule.

---

## 1 · The defect (triple-confirmed: Beam, me, and the source)

`scripts/report-tooling.mjs` in **both** public repos hard-reads two files that `.gitignore` excludes:

```js
const primary = readJson('.mcp.json');          // line 47 (svelte) / 47 (vue)
const secondary = readJson('.kilocode/mcp.json'); // line 48
```

`.mcp.json` and `.kilocode/` are gitignored in both repos, so **they do not exist in any clone**. `readJson` has no existence guard. And `package.json` wires:

```json
"smoke": "node scripts/report-tooling.mjs && playwright test tests/smoke.spec.ts"
```

so **`npm run smoke` exits 1 on a fresh clone of either published repo.**

```
cwd:     /var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/kilo/council-0400/svelte
command: node scripts/report-tooling.mjs
ref+sha: fresh clone of github.com/kozikosi/football-sim-svelte @ 86ba632
output:  Node: v26.13.0 / vite 8.3.8 / svelte 5.57.3 / typescript 6.0.3 / vitest 4.1.12 /
         @playwright/test 1.65.1 / playwright 1.65.1 / playwright-core 1.65.1
         Error: ENOENT: no such file or directory, open '.../svelte/.mcp.json'
           at readJson (scripts/report-tooling.mjs:7:24)
           at scripts/report-tooling.mjs:48:17
         exit=1
```

**Consequence:** every "smoke PASS" or "MCP configuration check: PASS" in the record came from a **working copy that has local `.mcp.json` files**, not from the published repository. Any digest row citing it is a dirty-tree receipt.

## 2 · The fix (exact old → new, two hunks)

**Hunk 1 — add an existence-guarded reader (after `readJson`, line 9):**

```diff
 function readJson(file) {
   return JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
 }
 
+// .mcp.json and .kilocode/ are local-only (gitignored): they are ABSENT in any
+// fresh clone. Treat absence as "not configured", not as a fatal error.
+function readJsonIfPresent(file) {
+  const full = path.join(root, file);
+  if (!fs.existsSync(full)) return null;
+  return JSON.parse(fs.readFileSync(full, 'utf8'));
+}
+
 function stable(value) {
```

**Hunk 2 — use it, and skip the parity block honestly (lines 47–51):**

```diff
-const primary = readJson('.mcp.json');
-const secondary = readJson('.kilocode/mcp.json');
-
-const primaryServers = primary.mcpServers || {};
-const secondaryServers = secondary.mcpServers || {};
+const primary = readJsonIfPresent('.mcp.json');
+const secondary = readJsonIfPresent('.kilocode/mcp.json');
+
+const primaryServers = (primary && primary.mcpServers) || {};
+const secondaryServers = (secondary && secondary.mcpServers) || {};
+const anyMcpConfig = Boolean(primary || secondary);
+
+if (!anyMcpConfig) {
+  console.log('\n=== MCP CONFIGURATION PARITY ===');
+  console.log('SKIPPED — .mcp.json and .kilocode/mcp.json are local-only (gitignored) and absent in this clone.');
+  console.log('\n=== PINNED MCP SERVERS ===');
+  console.log('none (no local MCP configuration present)');
+  process.exit(0);
+}
+
 const match =
```

**Why `process.exit(0)` and not a "MATCH":** two absent files would otherwise compare equal and print `MATCH`, which is a *false* claim — there is nothing to match. "SKIPPED" is the honest output. A configured clone is unchanged: it still prints `MCP configuration check: PASS` and the pinned-server list, and still exits 1 on a real mismatch.

## 3 · Before/after receipts (scratch copy, patched by hand, verified both ways)

```
cwd:     /var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/kilo/fix   (copy of arm svelte @ 86ba632)
command: node scripts/report-tooling.mjs                    [BEFORE]
output:  Error: ENOENT … open '.../svelte/.mcp.json' · exit=1

command: node scripts/report-tooling.mjs                    [AFTER, no local config]
output:  Node: v26.13.0 / vite 8.3.8 / svelte 5.57.3 / typescript 6.0.3 / vitest 4.1.12 /
         @playwright/test 1.65.1 / playwright 1.65.1 / playwright-core 1.65.1
         === MCP CONFIGURATION PARITY ===
         SKIPPED — .mcp.json and .kilocode/mcp.json are local-only (gitignored) and absent in this clone.
         === PINNED MCP SERVERS ===
         none (no local MCP configuration present)
         exit=0

command: mkdir -p .kilocode; cp .mcp.json .kilocode/mcp.json ; node scripts/report-tooling.mjs   [AFTER, configured]
output:  … MCP configuration check: PASS
         Note: Playwright MCP has its own bundled browser runtime. …
         exit=0
```

`node --check scripts/report-tooling.mjs` → **syntax ok**. Existing configured-clone behaviour is byte-identical; only the absent-config path changed.

## 4 · Why I am proposing rather than patching

- Both repos are **publishable artifacts**; INKLING and every seat are barred from editing them without the Owner's word, and I agree with that bar.
- The change is **three files if applied by hand in each repo** (one file per repo, identical hunk), so whoever applies it should do it as a deliberate commit per repo, not as a drive-by.
- **It does not change any measurement.** No build, no test count, no bundle size, no engine contact. It only stops a *tooling receipt* from crashing on the machine that will run the benchmark.

## 5 · The one-line note for the digest

**"smoke PASS" is not reproducible from either published repo today; the tooling script requires two gitignored files. A two-hunk fix makes it skip honestly instead of crashing — proposed, not applied.**

Labels: **VERIFIED** — the ENOENT before, both after paths, the syntax check, and the diff above, all run by me in a scratch copy of `football-sim-svelte` @ `86ba632`. **INFERRED** — that the same hunk applies verbatim to `football-sim-vue`'s copy (identical lines 47–48, same script structure; I verified the failure on the Vue clone but applied the patch only to the Svelte copy). **UNKNOWN** — nothing material.

*Filed by ERNIE (advisor) · 2026-11-14T05:00Z · no repo modified; scratch copy at `/var/folders/gb/.../kilo/fix` with `/tmp/rt.orig.mjs` as the pristine backup.*

**PRIORITY+:** report-tooling.mjs fresh-clone fix | P1 | exact two-hunk diff with before/after receipts (exit 1 → exit 0, and configured path unchanged); addressed to the Owner; not applied to any repo | ERNIE this file.