# GLM — lane file (rewritten 2026-11-14, end of Z.ai byte-review round)

## BOOT — read this first, every session (do not re-derive anything)

1. `git fetch -q origin` then the step-0 checkout in `START-HERE` §1 (four governance docs from
   `origin/council/muse`; my branch tip is below — if this file is stale, pull it from my branch).
2. Read this file to the end — measured facts, open items, what not to redo.
3. Read my own open documents: `ls inbox/ | tail -20` and the sessions list below.
4. Then take the next item from `_agents/QUEUE.md` (live on `origin/council/muse`), or a WR with
   receipts, or a review I can finish. File `inbox/<UTC>-glm-<slug>.md`, push `council/glm`.

Identity: council seat `glm` — analytics / scribe lane. Labels on every claim: VERIFIED · REPORTED ·
INFERRED · UNKNOWN. Owner standing rule (2026-11-13): **byte-check everything** — VERIFIED claims
cite ref@sha + path + command + output; archive beats tree; no verdicts/rankings on framework arms.

Worktree: `/Users/kosi/Desktop/wt/glm` · branch `council/glm` · tip pushed `9ccb3056` (ls-remote
VERIFIED 14 Nov). Deliberately untracked: `_agents/glm/anchors/raw/` (19 MB nflverse CSVs, hashes
pinned in `_agents/glm/anchors/raw-hashes.txt`). Scratch:
`/private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/glm-stackaudit/` (zai/ has the
recovery extraction + my manifest/vendorsha check scripts).

## Sessions

**Session D (14 Nov) — doc sync + Z.ai recovery byte-review (pushes a6c90fb8, 9ccb3056).**
Governance docs synced to live muse (`AGENTS.md` new build truth: 76 Pancakes, Svelte not a lock,
flex 99 rules @ `97d7e9d` — my final-105 superseded). Read ERNIE's returning-v2
(`218bbafa`); took §8: byte-reviewed **Z.ai's `zai-recovery-2026-11-14`** (fourth independent seat).
File `inbox/20261114-1632-glm-zai-recovery-byte-review.md`, VERDICT improved:
- MANIFEST 20/20 byte-exact BOTH ways (extracted tree + git blobs @ `d190e192`).
- Digest family reproduces from git objects @ `d3bd81d2`: whole colors/ 112 files `432a1701…`,
  src/ subtree 57 `4c3c8f17…`, src-from-root 57 `753997ba…` — three bases, all real.
- Vendored engine `arms/arm-svelte/src-bench/engine` cmp vs `d3bd81d2:colors/src`: **57/57 clean**.
- a3.json honest-null shape holds (bundleBytes 82060; firefox/webkit null, not fake-passed).
- NEW: note's own arithmetic says "19 hashed entries" twice, true count is **20** (one line, Z.ai's);
  v3 `dist/dist/` duplication: 11 files byte-identical copies (packaging exclusion owed).

**Session C (13 Nov) — λ follow-up (`d87ee935`).** `inbox/20261113-0155-glm-P-345-lambda-followup.md`:
λ is a measured quantity, not a set dial (fixed = null, λ(context) = alternative, three axes first,
per-slice Lab + bootstrap + pooling, decision on held-out wrong-strict-pairs; consistency via a
context snapshot per save/week). Display pitch: **Gap** (next-best-at-slot in Wins). Static
inventory w/ receipts (go-for-it/2-pt, OT, HFA, margin noise, softCap, slot value).

**Session B (13 Nov) — platform-round reviews (`2812fced`).** Four filings reviewed, drift
re-measured at tip `bebe8e0b`/gh-pages `3e69567c`: fork↔Colors 48 identical / 4 differ / 5
kernel-missing; SPEC doc is the stale third table; running engine RNG = mulberry32 (keyedrng Philox
has no importer); saves ARE versioned (`SCHEMA_VERSION=1` in core/envelope.ts — corrects my own
P-345 row 11); Colors index → /src/main.ts missing (not runnable as app). Reviews: OR improved,
Pickle improved, DS ok (7/7 spot-checks), VL improved. Note: these were written against the
pre-restructure tree; Colors has since restructured (w-series/Cakepanz lineage split per live
AGENTS §2) — re-check before citing layout counts now.

**Session A (13 Nov) — P-346 recovery + stack-audit filing (`da3bf666`, `77ecf9aa`, `976581d4`).**
P-346 v3 review (69/72 on pushed bytes; CRLF mechanism chain; manifest not `sha256sum -c`-compatible;
C3 CSV→JSON closure 10/10). P-345 stack-audit filing: 12/12 MUSE audit claims verified + multisport
plan ("share the verbs, keep the nouns").

**11 Nov and earlier:** P-342 third-seat design review `6dc63e87`; P-341 Appendix A re-run
(10/11 ability-alone); P-294 `tools/mathlab/flexrebuild.mjs` VERIFIED `67651912`; P-013 nflverse
anchor pack `019594fa`; owner-weights reveal 32/32 within ±50 `099561e1`.

## What the next session needs

- **Reviews owed on my files:** P-346 v3 review + P-345 stack-audit filing each need more seat
  reviews; the four platform-round reviews (2812fced) and the λ follow-up (d87ee935) each need theirs;
  the Z.ai recovery byte-review (9ccb3056) needs 1 more seat.
- **ERNIE §3 open items I could take:** the three-list static-axis comparison (Claude 8 / GLM 6 /
  Z.ai D.1–D.9 — compare, dedupe, mark unmeasurable); the pool-gap reconciliation (1,941 csv +
  12 free agents = 1,953 poolCount vs 1,921 rendered — a 32-row gap, definite answer, unblocks
  Claude's pool ledger); P-356/357/358/359 (design jobs, no machine).
- **Process landed reviews of my files:** pickle 0145 (platform filings), or 0200 ×2
  (my stack-audit + track-brief-v2), vl 0200/0205 — read, verify, act.
- **P-346 closure:** one re-review after Z.ai's REV 4 checksum pass lands.
- **Flex work carried:** P-323 verification when SAM dest lands (flexcheck + flexeval vs
  `_agents/glm/deliveries/flexrebuild/final-105/flex.json` — NOTE: 105-rule basis superseded, the
  live table is 99 rules @ `97d7e9d`; re-derive the comparison basis before running).
- Carried: post-bump D run after WILL/C spec re-fit; E-207 review; N=400 probe; M5-by-OVR /
  defense-EPA / M3 data-only fit.

## Do-not-redo (settled, receipts exist)

Goldens `0ccb6319…f3f5`; the four vendor digests; offline = build step; 69/72-vs-72/72 settled
against git blobs; "40 samples"; save-log/no-RNG-cursor design (`core/rng.ts:38`, `store.ts:84`);
goneOdds cost mechanism; `cd298e99` dead; P-207 save versioning; P-344 nflverse (30 files);
P-345 λ binary (Owner ruled false); sixth-focus change-amplification (tie at zero); five-arm
spec/build runs; arm-solidstart blank page; v2 CHECKSUMS gap.

## Standing rules I work under

Four lines per claim (cwd · command · ref@sha · output); archive beats tree; no verdicts on
framework arms; no assignments; no product/governance edits; never force-push/stash; add by path;
60s stall limit on network git, max twice; push after every finished file. Lanes hold no build
copies or images. Engine scratch outside the repo. Node v26.13.0.
