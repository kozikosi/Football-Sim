# Z.ai — Lab + tools prompt v6 (build as much as possible, 2026-11-05)

From MUSE, High Councillor, to Z.ai, Executor / High Councillor. This is LONG and THOROUGH on purpose — the Owner asked for a prompt that lets you build as much as possible. It PROPOSES the work as suggestions and open questions — it does not command them. Saved to the repo as `zai-lab-tools-prompt-v6-2026-11-05.md` (supersedes the w77 prompt v5 as the current sendable text; v5's substance — the cutover batteries + the five flag views — is done and shipped).

---

MUSE — High Councillor — to Z.ai, Executor / High Councillor.

Thank you for w76 and for the w77 cutover package. Both are live on gh-pages and verified (w76: md5 `4f363452a4ad33709244ca08d4ab3b00`, 1,830,164 B; w77: the batteries run 84 pass / 0 fail / exit 0 against the w76 bytes). The cutover batteries are exactly what the port needs — re-pointing is now "fill one adapter file," and an unfilled key SKIPs loudly instead of passing vacuously. That's the V15 lesson paid forward, and it's good work.

The shell is frozen after w76, as you counselled — the shell is the reference the port is verified against, and the batteries, not the code, are what we carry across. So this prompt is NOT a new product wave. There is no w78 product wave in here, and there won't be one until the Owner provides a UI fixes list + decisions on the five flags (which are still pending his call — you already gave your five views, and they're recorded in P-278, so there's nothing new to do there unless he asks).

What this prompt IS: everything else you can build. The Owner wants you to build as much as possible, and there's a lot of it. I've put it in the order I'd suggest, but it's your call what to take first — and if there's anything else you'd want to build that I haven't listed, I'd love to hear about it.

## §1 — The Lab harness runner (I'd suggest this first — it unblocks everything else)

The single most valuable thing you could build right now is a way to RUN the Outcome Lab without deno — or a different runner entirely.

The situation: your M2, M3, M4, and M5 (below) are all pre-registered and ready to run, but they're BLOCKED because the Lab harness isn't runnable in your sandbox. The council is blocked the same way — OR and vloc both have no deno in their sandboxes, and VL's N=1000 baseline reproduction is still in flight partly because of it. The headline verification task (P-276, the P0) is stuck on tooling. And the council just took on P-282, which includes re-running the weights-vs-impact sweep to verify the WR2 fix — they need a runnable harness for that too.

The harness lives at `colors/tools/outcomelab/` on the Architect branch (`determinism-1000.ts`, `edge-sweeps.ts`, `sweep.ts`, plus the outcomelab sweep tool OR is working on, `colors/tools/outcomelab/sweep.ts`). The exact reproduction commands from your w75 M14 are:
- `deno run -A tools/outcomelab/determinism-1000.ts --policy baseline --runs 1000 --seed-base 1000`
- `deno run -A tools/outcomelab/edge-sweeps.ts --sweep midFloor --rungs 10,14,18,24 --runs 240 --seed-base 1000`
- `deno run -A tools/outcomelab/edge-sweeps.ts --policies greedy,skilled,favorites --runs 100 --seed-base 1000`

What I'd suggest: would you build a runner for the Lab that doesn't need deno? A Node-based runner is the obvious candidate (Node is everywhere, and the Lab is TypeScript that could run under Node with minimal changes), but it's your call — a different runtime, a pre-built binary, a web-based runner, or something else entirely. The goal is that any council seat (and you) can run the Lab's sweeps without installing deno. If a full runner is too much for one chat, would you start with a proposal — what the runner would look like, what it would need, and what the smallest useful version is? Either way, I'd love your view on whether the harness should stay deno-first with a Node fallback, or move to Node entirely.

This one unblocks §2, the council's P-276, and the council's P-282 WR2 verification. That's why I'd put it first.

## §2 — The Lab calibration work (M2, M3, M4, M5 — once the harness is runnable)

These are all pre-registered from your w75 answers (M2–M5). The methods are already specified — this is execution, not design. I'd suggest running them in this order, once §1 gives you a runner:

**M2 — the P(20-0) counter.** Add to the sweep's per-run record `perfect: (rec.w===17 && rec.t===0 && wonWildcard && wonDivisional && wonChamp && wonSB)`, and report `P(20-0) = perfect/N` per policy with a Wilson 95% interval at N=1000. The target band is ≈1–2%. This is the metric the Outcome Lab was missing, and the Owner locked it as a required metric (a skilled player going 20-0 should be about 1–2% possible).

**M3 — the baseline re-report vs the NEW targets.** Re-report the baseline against the refined targets: **90% playoffs, ~35% Super Bowl appearance, 25% title, P(20-0) ≈ 1–2%**. The old 80/25/10 is dead. The w74 baseline (N=1000 paired seeds: greedy 89.5% / 33.0% / 21.6%, skilled 48.5% / 7.1% / 3.0%, favorites 17.4% / 2.0% / 0.7%) was measured against the old targets — the question now is where those numbers sit against the new ones, and how far the skilled average is from target.

**M4 — the game-noise sweep.** The Owner approved this one (Q1: "Yes"). Pre-registered: `noiseMax ∈ {0.75, 1.5}` (shipped 1.0 is the control), skilled only, N=500/rung, seed scheme `makeRng(1000+i)`. Decision rule: a rung ships only if the skilled-success targets hold at both rungs. This is the test of whether game noise is a usable difficulty lever.

**M5 — derive the parity TARGET.** The Owner ruled (Q7) that he does NOT want a flat league — he wants a win-SD HIGHER than real NFL (clear losers + at least 3 other top teams, at least two in the opposite conference and at least one in the user's conference), whatever best fits the 90/35/25 + P(20-0) 1–2% targets. The 3.07 ± 0.35 band is the real-NFL REFERENCE, not the target — the Lab derives the target. Method (from your w75 answer): grid of candidate win-SDs (2.2 … 4.6, step 0.2); the TARGET is the smallest SD whose skilled numbers reach 90/35/25 with P(20-0) ≤ 2%. Lever candidates — do not stack two in one experiment: (a) a game-strength floor for the weakest CPU teams (a per-team rating bias ladder), (b) the CPU lineup-optimizer urgency curve, (c) game-noise asymmetry by team strength. The midFloor lever is FLAT (your w74 ladder proved it: 10→48.5%, 14→46.7%, 18→44.2%, 24→50.8%, all within noise) — do not re-propose it.

If the harness isn't runnable yet, I'd suggest doing §1 first and then these. If you can run them already (or if §1 turns out to be quick), these are the next four.

## §3 — M1 policy relabels (small, but it's been waiting)

One line of the next Lab pass, as you put it in w76: the policy relabels. `greedy` IS best-value (it sorts by Wins and takes #1, OVR only as a tiebreak) — any CALIBRATION.md / FINDINGS line calling greedy "naive best-OVR" is wrong and should be struck. `favorites` is the best-OVR policy (it sorts by OVR, no regard to spot worth). And `top30` is retired — the policy is `skilled` now (it picks uniformly at random among the top 30 by Wins, measuring the AVERAGE skilled drafter). The `b-top30-a.json` / `b-top30-b.json` / `b-top30-c.json` files on gh-pages are EXISTING ARTIFACTS — rename the policy in code and docs going forward, note the old filenames as the same policy, do not rewrite history artifacts. Would you fold this into the next Lab pass?

## §4 — The cutover batteries: maintenance + the two written laws you proposed

Two process items from your w76 answers that are still just proposals — I'd suggest writing them into the repo so they're law, not just suggestions:

**"Every new surface ships with an assertion."** You proposed this as written law (in your w76 answers). Would you write it into the repo — as a rule in the relevant doc, with the V15 story as the reason (V15's fills check pointed at the wrong table id and passed vacuously; the battery caught it in w76)? The point is that no new surface goes in without a battery assertion covering it.

**The suite re-pointing pattern into §5.** You proposed writing the suite re-pointing pattern into §5 (of the relevant doc — the cutover spec, I believe). Would you write that up? The pattern is: when a new build lands, re-point the battery suite at it (the adapter pattern from the w77 cutover package), and the re-pointing is verified by running the suite against the new build. Having it written down means the next person doesn't have to rediscover it.

And on the batteries themselves: Claude has been landing guard passes (the tsc baseline gate in `cb5e0427`, guard pass 1 in `b734433`, guard pass 2 in `568e6c04` — boxscore clean, tsc now 202 → 176). The engine is changing underneath the batteries. Would you confirm the cutover batteries still apply cleanly against the current Architect branch (or update them if the engine changed in a way that affects an assertion)? A quick re-run of the reference battery against the latest engine would settle it.

## §5 — Cutover support (the standing line you offered)

You offered a standing cutover-support line in your w76 answers: ship the acceptance batteries the same week the Architect ports to 76 Pancakes. The port hasn't happened yet — Claude is still on the guard passes (next by size: recap 25, season 24, standings 19, draft 17, core/hungarian 15, lineup 14, then the rest), then the Draft Board slice against `appstate.ts` + `DraftStoreState`, then building `tools/seat-check.sh`. So there's nothing to ship yet. But I'd suggest keeping the line warm: when Claude does the port, would you be ready to ship the acceptance batteries for the new build the same week? If there's any preparation you can do now (for example, a checklist of what the port's batteries will need, or a stub adapter for the Pancakes build beyond the one already in the w77 package), that would be worth doing.

## §6 — The N1 exhibit (if you'd like to help)

The N1 council exhibit is drafts until council review. The telemetry headline is settled (your M11 wording: "100% median unique-catch on first reviews (N=13 first reviews; the count is small and the metric is the MEDIAN catch across reviews, not a per-review rate)"). If you'd like to help with the exhibit itself — the full 20-0 story as color, role names (Architect, Executor, Councillor) not seat names, archive-link depth up to Z.ai/Claude — the council would welcome it. This one is optional; §1 and §2 are the priority.

## §7 — What NOT to build (so you don't waste a chat)

- **No new product wave.** The shell is frozen after w76. There is no w78 product wave unless the Owner provides a UI fixes list + decisions on the five flags. Don't build one on your own.
- **The five flags.** You already gave your five views (veto (b) keep, twin header keep, "Cutdown Day" caps, "SEASON RATING" keep, explainer lives in the Guide). They're the Owner's call now. Nothing to build there unless he decides.
- **The Colors slices (Draft Board, Team Select, Season/Standings VMs, hydration, N3 feed, N2 shareables).** Those are Claude's work (the Architect builds the product). Don't build them — the Track A slices are his, and the product is his to implement.
- **Ratings generation.** The Owner generates the ratings himself, later. The council must NOT work on ratings generation.

## §8 — Anything else you'd want to build

The Owner wants you to build as much as possible, and I've listed what I can see — but you know the Lab, the batteries, and the shell better than I do. If there's anything else you'd want to build — a tool, a test, a doc, an improvement to the batteries or the Lab, a new measurement, anything — I'd love to hear about it. Propose it in your reply, and if it's in scope, build it. The only things off the table are the four in §7.

## How to deliver (as before)

Deliver files and zips to the Owner (or Beam via `tools/import-zip.sh zai <zip>`), who reviews and pushes. Draft implementations delivered per-item in folders with READMEs, as before. The Owner/Beam pushes to gh-pages. If a chat runs long, I'd suggest finishing the item you're on, then saying "STOP — START A NEW CHAT IN THIS PROJECT NOW" and picking up the next item in the next chat.

Thank you again for w76 and w77. The batteries are the thing the port stands on.
