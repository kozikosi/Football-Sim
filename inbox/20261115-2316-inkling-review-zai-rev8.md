SPEAKER: inkling | ROLE: council | TASK: review Z.ai's fresh-start Rev 8 delivery (Rev 6 work-order execution) | DATE: 2026-11-15T23:16:00Z
FOR: framework comparison (Owner ruling R-13 — no queue row; P-345 is the play-level innovation round, not this work)
REVIEW-OF: `_agents/inkling/deliveries/zai-fresh-start-rev8-2026-11-15/` on `council/inkling` @ `11425623` (pushed this session; embedded `.git` excluded per delivery convention; the four pass-through branches live in the source folder as `rev8-pass-a…d`)

**VERDICT: improved** — the Rev 6 work order executed at a materially higher standard than its delivery; three verified defects remain, and the strongest single sentence in the delivery is the one that withdraws its own number.

## What I ran (this session, on this tree)

| Claim | Command | Result |
|---|---|---|
| Root integrity | `sha256sum -c CHECKSUMS.txt` | **4/4 OK, exit 0** (MANIFEST, RECEIPT, DELIVERY-NOTE, verified-as-of.json) |
| Nested manifest (the Rev 6 defect) | `sha256sum -c REV-5.1-addendum/CHECKSUMS.txt` | **360/360 OK, exit 0** — Rev 6's was 346 OK / 12 MISMATCH, all of them the Rev 5.1 patch targets; Z.ai regenerated and deleted the `tsbuildinfo` build cache that should never have shipped · VERIFIED CLOSED |
| Manifest gate | `node scripts/gate-manifest.mjs .` | **PASS — 4 manifests, 1,023 entries verified, exit 0** (their tool prints 659 for the root MANIFEST vs VERIFY.txt's 658 — off-by-one in their own doc) |
| Numeral gates | `node scripts/gate-numerals.mjs . --legacy-scan` · `--claims` | **CLEAN, exit 0 both** (the Rev 6 originals were FAIL/hits on 867/4-vs-6) |
| Battery (both arms) | read committed JSONs directly | **pass=true, 24 checks, all ok; per-screen DOM ALL EQUAL 871/457/470/125/221/39 both** · VERIFIED from bytes |
| a11y class (`Cards.svelte:57`) | read source | backdrop now `role="button" tabindex="-1" aria-label="Close featured card"` + Escape keydown · **code fix, not a waiver** · VERIFIED at source |
| a11y class (`FeedPanel.svelte`) | `grep -c tabindex` | **0** (row removed; a noninteractive element is not a tab stop) · VERIFIED |
| Sealed-bench status | `flip-bench/sealed-run-receipt.json` keys; `VERDICT-REV-8.md` | OWED by design; recipe `SEALED-RECIPE.md` sha `7fcc3fc0…` · VERIFIED present and honestly labelled |
| Line-count method | `wc -l MANIFEST.txt` vs VERIFY.txt's claim | MANIFEST = **659** lines; VERIFY.txt says **658** — one off in their own stranger-facing doc (not load-bearing, exactly the class they police) |
| verified-as-of.json | full read of keys/manifest/e3 entries | rev51 path fixed ✓; manifest entry claims "358/358 OK" but the shipped addendum CHECKSUMS is **360** entries (their own erratum 0.1 says 360 — verified-as-of is stale by one sitting on this one field) |
| Part A table arithmetic | recount class@11 vs facade@11 cell | 50 / 45 / 49 — method confirmed `wc -l` of store files only, tests excluded (their labelled method) |

## Findings

1. **Two off-by-one defects on their own machine-readable surfaces (both one-line fixes):** `verified-as-of.json`'s `manifest` entry quotes "358/358 OK" against the shipped 360; `VERIFY.txt` says "root MANIFEST.txt 658 entries" against the 659 the gate and the file agree on. Neither breaks anything; both are precisely the class the delivery exists to eliminate, on its own self-description line — do not ship them to the Owner unfixed.
2. **The (a11y × warnings) closure is real work, not theatre.** The delivery turns "both checkers clean" into 0 errors AND 0 warnings by fixing the two defects in source — and the Rev 8 clean-extract receipts (`receipts/clean-extract-*.txt`) plus the in-tree path hygiene (REV-6's `/home/z/...` absolute paths are gone) mean the addendum's own gate 5 is now honest as quoted.
3. **The restatement is the right shape and it is stronger for having died by a thousand measurement wounds.** ~55% withdrawn; no number survives; the lean rests only on first-try greens (2 vs 0) + feel; two of three counted proxies died under stated methods (workarounds 4 vs 3 actually favouring Vue; lines 878 vs 883 = a 5-line tie); Part A closes the class-vs-facade question as a no-separation result (class@11 50 vs facade@11 45 vs Pinia@11 49, all 0 diagnostics/build-green, ratio 1.020 vs Ernie's 0.871 — seat-dependent sign, attributed honestly). **Row 9 is dead as a decision row.** The framework question is team familiarity; no migration is argued anywhere in the record.
4. **First-try greens as "the only durable signal" is fragile and the filing should say so.** It was swept as 4/4 (order-confounded, author-fluency), it excluded the store-heavy sitting where vue Pinia@11 went first-try-green 0-repairs, and it is n=4 pairs. It is REPORTED-feel, not measurement. The framing in VERDICT-REV-8 ("rests on first-try greens and feel alone") is honest — it just should not be quoted as if it were a signal stronger than it is.
5. **C2/C3 gates fail on the Rev 6 tree exactly as designed** (their gate-c2/c3-rev6 receipts: FAIL/hits) and pass on Rev 8; the numeral gate's `--claims` mode passes vacuously against a bold-lines-only pattern — it can prove absence of contradiction, never truth; keep it as a tripwire, never as evidence; the two `gate-*` scripts are one review away from being a serviceable delivery verifier for the whole programme.
6. **Parts A/D/E came through execution clean:** falsification probes written and immediately reverted; the Rev 6 "sandbox hung" root-caused to a process-group kill bug and fixed so the E3 devtools session actually ran (state inspected, value changed, UI updated, 0 page errors, both arms, receipts in-tree).

## Does it clear the Owner's ask?

**Yes, with the seal owed stated.** Independent replication of the integrity step passes; the restatement can be quoted; the two one-line fixes are cheap and required; the sealed-recipe bench is closed-by-design OWED and unrun — the flip/confirm falsifier is named plainly in VERDICT-REV-8 with the flip threshold (Svelte repairs ≥ 2.0× Vue's AND 0 first-try vs Vue ≥ 1). **This delivery cannot be signed past this point either — and Rev 8 is the first delivery in the chain that would make signing safe if the gaps close:** (i) the two one-liners, (ii) the sealed-recipe bench run by whoever takes it from the queue, (iii) the Owner's beauty-mode ruling for the token default (dark/--tc vs w89 pale-rose) — which blocks nothing but the palette naming.

## Labels

- **VERIFIED:** everything in the table above (root 4/4, nested 360/360 clean exit 0, gate-manifest PASS 1,023 entries, numeral gates clean, battery JSONs from bytes, Cards/FeedPanel fixes at source, VERIFY.txt's 658 vs 659 recount, verified-as-of rev51 path fixed and its manifest quote stale, Part A line counts, sealed-recipe OWED status).
- **REPORTED:** clean-extract receipts (I did not npm-install and re-run the arms — they are the author's receipts, not my run); e3 devtools session output; the sealed-recipe sha; gate scripts' internal correctness beyond their two test modes.
- **INFERRED:** the C2/C3-on-Rev-6 FAIL restoration (consistent with its design and receipts, not re-executed here); the token-dark default remaining legal pending the Owner's beauty ruling.
- **UNKNOWN:** the sealed bench (owed, unrun — by design); whether the Owner rules the palette; whether any of this moves the framework ruling (nothing in this filing argues it or should).

— inkling (advisor seat) · 2026-11-15T23:16:00Z · nothing pushed except this file
