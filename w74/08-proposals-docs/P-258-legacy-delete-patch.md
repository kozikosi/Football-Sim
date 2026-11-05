# P-258 — legacy.ts delete patch (w74 item 8e): the exact diff, for the Architect to apply

**What it deletes:** `src/sports/nfl/app/legacy.ts` (68 lines — the one-time `zpb:*` → `sim:` move), the 4
legacy tests inside `test/core/namespacing.test.ts` (lines 76–112, the tests named "legacy move:"), the
legacy import line (line 11), and the keys.ts comment line that advertises the migration.

**The boot-time `zpb:*` cleanup piece:** the ask describes the OLD shell's boot loop (`for k of
Object.keys(localStorage), if k startsWith 'zpb:' remove, behind a version flag`). On this branch that loop
does not exist — grep over `src/` shows `zpb:` only in legacy.ts, provenance comments (view/theme.ts,
app/profile.ts — those name the SOURCE of ported constants, they are history, not migration, and stay), and the
keys comment this patch removes. So the correct patch action is: **nothing to delete on the branch; never port
the loop** — with legacy.ts gone, `zpb:*` keys are simply never read; they sit inert in old browsers' storage
until the user clears it, which is exactly the "delete rather than wrap" ruling applied to storage.

**Dependents checked before writing the diff (VERIFIED):** `grep -rln "legacy\|migrateLegacy" src/ test/` →
legacy.ts itself, the 4 tests, `src/platform/localstorage.ts` + `src/core/app.ts` + `src/core/keys.ts` (comment
mentions only — the first two say "P-258 kills legacy.ts", self-updating when the deletion lands; keys.ts's line
is fixed by this patch). After the patch: `npm test` → 288 minus the 4 deleted legacy tests = **284 pass, 0
fail** (the namespacing tests that remain are the ids/keys/profile/envelope/layout tests, untouched).

```diff
*** a/src/sports/nfl/app/legacy.ts
*** DELETE THE FILE (68 lines: the zpb:* → sim: one-time move; everything it moved is moved or moot at cutover)
```

```diff
--- a/test/core/namespacing.test.ts
+++ b/test/core/namespacing.test.ts
@@
-import { migrateLegacy, PLAYER_NAMES_KEY } from '../../src/sports/nfl/app/legacy.ts';
-import type { MigratableKv } from '../../src/sports/nfl/app/legacy.ts';
@@
-test('legacy move: every old key lands under sim:, old keys are gone, unrelated keys are untouched', () => {
-  const kv = mem(OLD()), rep = migrateLegacy(kv, lookup);
-  … (the whole test body, lines 77–87)
-});
-test('legacy move: player names are keyed by player id; a name shared by two players or matching nobody is NOT guessed', () => {
-  … (lines 88–93)
-});
-test('legacy move: running twice moves nothing the second time; an existing different new key is never overwritten', () => {
-  … (lines 94–101)
-});
-test('legacy move: a full or blocked store loses nothing (the old keys stay and are reported); a corrupt profile is kept, not replaced', () => {
-  … (lines 102–112)
-});
```
(The four bodies are elided here only for length in this README — the applying Architect deletes lines 76–112 of
the current file verbatim; `git diff` after deletion should show exactly two hunks: the import line and the four
tests.)

```diff
--- a/src/core/keys.ts
+++ b/src/core/keys.ts
@@
-// Nothing else is written to browser storage. (The shell's older `zpb:*` keys are moved once by sports/nfl/app/legacy.ts.)
+// Nothing else is written to browser storage. (The shell's older `zpb:*` keys are NOT migrated: legacy.ts was
+// deleted at cutover per P-258 — old keys are never read, never written, and never cleaned; they sit inert.)
```

**Sequencing:** apply at cutover together with Claude's old-shell deletion (his timing call). Before that commit,
nothing in the app reads a `zpb:*` key (VERIFIED), so the patch is safe the moment he calls it.
