# BUILD REPORT — Z.ai — 2026-11-13 (second chat) — the framework test + systems + Part A

**Deliverables in this zip (all verified from a fresh extraction; sha256 in CHECKSUMS.txt):**

1. **The framework test, complete** (`fwtest/`) — engine contract + five arms + acceptance spec + round-2 evidence + results filing. All five arms BUILD GREEN. Leakage scan clean. Round 2: 0 arm-owned edits across five arms, mtime-proven.
2. **The systems artifacts** (`systems/`) — runtime purity harness (3/3 PASS at the pin), `.github/workflows/ci.yml`, plus the systems report.
3. **Comprehensive prompt Part A** (`parta/`) — the patched v3 delivery (3 writers fixed, 7 scripts de-sandboxed, re-run BLOCKED with the exact unblock procedure), the corrected C2 field + between-team receipt JSON, the Plays Ledger corrections + check script (11/11 rows reproduce), the corrected E3 sentence in the λ filing copy.
4. **Re-delivery of the morning's documents** (the Owner could not download them) — the platform-vision filing + multisport plan and the updated START, as individual files in `download/` AND in this zip.
5. **Intake ledger + this build report + the updated START-OF-CHAT-ZAI.md** (§2 rewritten; MUSE re-files it).

## Command-by-command evidence (the checks that matter)

| Check | Command | Result |
|---|---|---|
| Engine suite at the pin | `npm test` in a full-repo extraction of `4ca9a071` (colors+data+tools) | **284/284 PASS, exit 0** |
| Colors-only extraction control | same, minus `data/`+`tools/` | 11 files fail with ENOENT — the full-repo finding |
| Runtime purity at the pin | `node --test test/nfl/runtime-purity.test.ts` (sentinels armed before import) | **3/3 PASS** |
| Contract type safety | `npx tsc --noEmit` + `node tools/tsc-baseline.mjs` | 0 errors in contract files; 69 pre-existing vendored errors pinned; ratchet OK |
| Golden determinism | `npm run golden` twice (before/after a refactor) | JSON IDENTICAL |
| Five arm builds (round 1) | `npm run build` per arm | 5/5 exit 0 |
| Round 2 (fifth focus) | contract edit → resync → rebuild ×5 | 5/5 exit 0; 0 arm-owned files newer than the resync (mtime evidence) |
| Leakage scan | grep for deep imports + forbidden globals, all arms | 0 findings |
| A.1 patch syntax gate | `py_compile` on 7 patched scripts | all compile; 0 `/home/z` refs remain |
| A.2 receipt | corrected field run on the P-344 file | 11.9044 / 1.1934 / 2.8988 / 2.7057 — matches DS to 3 decimals |
| A.3 check | `python3 a3_plays_ledger_check.py` | 11/11 rows OK, exit 0 |
| Zip integrity | `unzip` to clean dir + `sha256sum -c CHECKSUMS.txt` | all OK |

## Known limitations (plainly)

- **Parts B/C/D of the comprehensive prompt are NOT in this batch** — thinking-batch work, scheduled next chat (intake ledger item 3).
- **A.1's re-run is blocked on data that ships nowhere in the repo** (raw parquet + staged.json — MUSE's local workspace). The unblock procedure is in A1-PATCHES-NOTE. The 72/72 settle criterion is NOT claimed.
- **D.1–D.9 (dynamic-engine filings) remain owed** — next chats.
- The Playwright acceptance spec is shipped, not executed (browser download cost); D2 in the results filing.
- The framework test's round-2 discriminating power is limited by single-authorship (D1 in the filing — stated, not hidden).
- Vue was tested via Vite, not Nuxt (D3 — my judgment call under "however you want", flagged for the Owner).

## Zip layout

```
CHECKSUMS.txt
INTAKE-LEDGER-2026-11-13b.md          BUILD-REPORT-2026-11-13b.md (this file)
START-OF-CHAT-ZAI.md                  (updated §2 — MUSE re-files on council/muse)
2026-11-13-platform-vision-multisport-plan.md   (RE-DELIVERY of the morning filing)
START-OF-CHAT-ZAI-updated-2026-11-13-morning.md (RE-DELIVERY)
fwtest/                               the framework test (contract + 5 arms + spec + results)
systems/                              runtime purity + ci.yml + systems report
parta/                                patched v3 delivery + A1 note + A2 receipt + A3 corrections/check + corrected λ filing
```
