SPEAKER: inkling | ROLE: council member/verifier | TASK: review Z.ai's 2026-11-14 sitting delivery (as vendored on council/inkling) | DATE: 2026-11-14T17:45Z
REVIEW-OF: `_agents/inkling/deliveries/zai-sitting-2026-11-14/` (commit `947d29e3`, vendored from `~/Desktop/Football Sim/zai-sitting-2026-11-14`; Z.ai's zip-and-handoff because his push is dead — the courier pattern, as with `zai-recovery-2026-11-14` at `e79e7693`)
VERDICT: **improved**

**Publishing note.** The Owner asked that this folder be pushed so anyone can read it through GitHub. I vendored it **byte-exact** to `council/inkling` at `947d29e3` (210 files; the source folder and the vendored copy were both checksum-verified before and after the push — the only edits upstream of the push were none; the bytes you fetch are the bytes Z.ai handed over). Nothing here ratifies anything; the Owner accepts.

## 1 · Receipt verification (my runs, cwd = extracted archive of `947d29e3`)

| Claim | My check | Result |
|---|---|---|
| Folder verifies as shipped | `sha256sum -c CHECKSUMS.txt` (209 files) at source AND at `947d29e3` extraction | **0 non-OK, exit 0, both** |
| Interior app manifest | `sha256sum -c MANIFEST.txt` inside `67-cakepanz-s3-s4-rev2/` | **183/183 OK** (184 files incl. MANIFEST) |
| Engine snapshot ≡ pin | 52 files, `cmp` against `git archive 4ca9a071 -- colors/src` | **52/52 identical** |
| Engine suite on my machine | `node --test --experimental-strip-types test/engine.test.ts` (Node 26.13.0) | **284 pass / 0 fail**, exit 0, 36.6 s |
| SAVE-1 script re-run | paths patched to scratch (`/home/z/...` → vendored); `node --experimental-strip-types scripts/save1-write-median.mjs` | **serialize median 0.568 ms · p95 0.683 · n=201 · envelope 128,937 chars (exact size match)** |
| Pool-study re-run | same patching; `node --experimental-strip-types scripts/pool-study.mjs` | **3 seeds × 1,024/1,024 picks DONE**; K/P/FB scarcity spine reproduces (K 34–35/35 drafted; P 29–30/33; FB flex-covered; QB rigid 32/92) |
| D.8 strength control re-run | `python3 d8-strength-control.py` on the P-344 CSV (pandas 3.1.0) | **RAW reproduced exactly** (REG 1.7772 / POST 5.5656 / Δ3.7884); controlled edge **+1.35 pts** (boot95 [-0.933, +3.682], HC1 t=1.17), drop-W1-2 **+1.22** ([-1.059, +3.478]); LPM win-prob +0.018/+0.014; stratified bins identical to his filing. **VERDICT RULING: recorded-dead stands.** |
| Live flex table in folder | `flex-live/tools/mathlab/flex.json` | sha **`0a26d7c2…`**, **99 leaves**, tiers 23/43/10/23, **QB→FS = 12** — the live table, byte-identical to `architect/engine-and-seats` (VERIFIED) |
| w89/w88 P-321 table | `git show origin/gh-pages:…w89.html` | `ZPB_SLOTS_WINS` present; `1.2497` (OT1) present — spot-checks agree with the P-324 audit filing |
| bench1 primary sources | `git ls-tree origin/council/ernie` | `zai-bench1-run-v1-2026-11-14/receipts/tier1-run{1,2,3}.json` etc. **exist** (v2 §2.1 closure is a pointer fix) |
| Pin drift since arms | `git diff --stat 4ca9a071 03640133 -- colors/src` | **11 files changed (372 insertions)** — consistent with his "+5 files (four kernel + legacyprovider) / 6 modified" |
| Slice-2 block | `git show origin/architect/engine-and-seats:colors/src/sports/nfl/app/store.ts` @ `03640133` | `SaveRecord` has no `slot`; `START{ seed, userTeam }`; restore path rebuilds default order — **block is real**; his refusal to merge against the unlanded contract is correct |

## 2 · Defects found (the same class Z.ai struck himself for, v2 §1.5c)

Cite-and-miss, three files named in the filings but **absent from the folder** (CHECKSUMS proves absence; internal consistency fine, receipt chain broken):

1. `filings/inbox-20261114-zai-d8-strength-control.md` cites **`measurements/d8-strength-control-output.txt`** — missing. (I re-ran the script: every number reproduces, so the claim is true; the artifact is not shipped.)
2. `filings/inbox-20261114-zai-v3-experiments.md` cites **`measurements/distfile-boot.json`** — missing. The 6x-throttle boot numbers (1.33 s→9.9 s, 0 blocked) are unverifiable from this folder.
3. `filings/inbox-20261114-zai-fwtest10-corrections.md` cites **`measurements/C-engine-suite-fresh.txt`** — missing.

Fix, per his own closure-items §1.5c rule ("**a citation to a file nobody can open is worse than no citation**"): ship the three files or strike the three citations in writing. One reply line each; no re-run needed.
Also minor, not defects: `batteries/slice1-battery.json` rewrites on every run (its ledger entry describes the author's run's bytes, labelled in README); `tools/mathlab/results` is a 468-byte placeholder file ("Git tree 4ca9a071") — shipped as the pin has it; and `inbox-20261114-zai-fwtest10-corrections.md` says v3 §8 "named the extra two as roles and flex" while his own 101-walker pins `_source` + `roles` with flex recursed (+2, same arithmetic) — wording worth one line in his next note, not a substance issue.

## 3 · Disposition of his items (for the Owner / queue; seats propose, they do not rule)

| Item | State | Recommendation |
|---|---|---|
| Slice 3 re-delivery (three 10 Nov review fixes applied, battery 61/0/10/3, pin 52/52, wall still slices 1–2 live on gh-pages) | **Landed as rev2; needs owner publish step** | The code did not change since the three improved reviews (10 Nov) — no re-review of code required; one confirmation of the three doc fixes + this sitting's receipts closes P-316. Owner publishes. |
| SAVE-1 write median = 0.922 ms node-side (p95 1.11, n=201, envelope ~129 KB) | **closed by him; re-run by me confirms ~0.6 ms class on this machine** | Close the SAVE-1 held row in the ratification packet; label "node-side, Map storage" on the packet line (his label, keep it). |
| D.8 playoff HFA **recorded-dead** (strength-controlled +1.35 pts, CI incl. 0; his D-row) | **verdict stands; reproduced by me** | Keep the citation ban. L2 (Claude) consumes "no playoff term supported; home-field ≈ +1.8–2.0" — the engine's current 1.7 is consistent. |
| Pool study: draft format **1,024 picks** confirmed from the app; no position runs dry; K/P/FB tightest; QB = 32/92 rigid | **answers the dry-pool question** | File with the ledger Claude writes; "1,024-pick draft with this pool is safe" is now a receipt, not a fear. If the Owner wants a belt-and-braces claim, it needs his confirm of the 1,024 budget (Z.ai already asked in one line). |
| P-324: P-321 Wins already live in w88/w89; 32/32 match; no stray w87 weights; OT1 1.2497 one rounding step below 1.25 | **confirmation delivered** | P-324 can close. OT1 1.2497 watch-list noted for the engine P-321 landing (1.25 boundary). |
| Slice 2 spec: merge BLOCKED on unlanded `SaveRecord.slot` | **correct refusal** | Claude lands the `SaveRecord`/`START` slot change; then Z.ai's half + P-315 deep check. Nothing else from this item this session. |
| fwtest10 three corrections (101-mechanism named; fresh 323-log attached; live table shipped+labelled) | **closed in the folder; MUSE/ERNIE decision on the `council/ernie` retired copy** | Ratification packet picks up the shipped live table vs the retired copy; the §1.5c citation rule is now demonstrated on his own work. |
| Realm of v3 §7 experiments: CRLF digest confirmed by his own run (`7af52799…`); dist-file file:// boot clean, mobile 6× ~10 s to first paint | **receipts excellent except §2's missing `distfile-boot.json`** | The mobile number (seconds-class) is the first honest low-end-phone data; candidate for a future UX budget row. |

## 4 · On the missing receipts and the re-verification this pass

Every number above that I ran came out the same as or equivalent-class to his. The delivery is genuinely the strongest single sitting of this wave: he used the blocked clock productively, refused the one unsafe merge correctly, and killed his own D.8 hypothesis instead of defending it. The three missing measurement files are the only difference between this and `ok` — and they are one reply line each.

— INKLING · 2026-11-14T17:45Z · archive-extract of `947d29e3`; 52 cmp's; one engine suite; two script re-runs (scratch-patched); one pandas re-run; no npm install performed; no other seat's branch edited