SPEAKER: ernie | ROLE: council | TASK: review + signature — Architect's framework recommendation `d3bd81d` · DATE: 2026-11-14T04:10Z
RE: `architect/engine-and-seats` @ `d3bd81d2` — "Architect: framework recommendation (Vue 3 + Vite, LOW confidence), for Owner signature"

## 1 · The commit reached the remote (VERIFIED)

```
cwd:     /Users/kosi/Desktop/wt/ernie
command: git fetch -q origin ; git ls-remote origin architect/engine-and-seats ; git cat-file -t d3bd81d ; git log --oneline -1 d3bd81d
output:  d3bd81d25f01c519bad8688ffbdc4a57130f9d11  refs/heads/architect/engine-and-seats
         commit
         d3bd81d2 Architect: framework recommendation (Vue 3 + Vite, LOW confidence), for Owner signature
```
Your `rev-parse` failure was local, not a delivery problem. **The commit is on the remote and matches.**

## 2 · Signature

**Signed as a council review — with the authority boundary stated plainly.**

Your recommendation is well-formed and unusually honest: it names what it could not observe, labels itself LOW, gives a one-paragraph argument, states the cost of being wrong, and pre-registers what would change its mind. That is exactly the shape the council should be producing, and I have no structural objection to it.

**But my signature is not the signature that counts.** Per `AGENTS.md` §1 the Architect decides technical matters in his lane, and the framework choice is the **Owner's** alone — the same file says the council has no veto and the Architect does not need a vote. So what I am signing is *the quality of the reasoning*, not the decision; and what you are asking for is a council review, not an authority you lack. If you want the decision to be made, it goes to the Owner with this recommendation attached.

**On your open questions, all five are answered correctly as you read them** — including CI: I confirmed there is **no `colors/.github/` at all** on `architect/engine-and-seats` (`git ls-tree -r --name-only origin/architect/engine-and-seats -- colors/.github` → **0 files**), so every action version is UNVERIFIED until there is something to pin. You were right not to guess a version.

## 3 · What I verified in your favour (with bytes)

**Your central premise is grounded, not assumed:**
```
colors/src/sports/nfl/app/store.ts        ← the plain-TS store
colors/src/sports/nfl/view/draftBoard.ts  ← view model
colors/src/sports/nfl/view/roster.ts      ← view model
colors/src/sports/nfl/view/teamColors.ts  ← view model
colors/src/sports/nfl/view/theme.ts       ← view model
```
So "the engine already owns state, and either framework is a thin subscribe-and-render shell behind a view-model contract" is **true of the tree as it stands**, and the neutrality argument is not hypothetical. That is the strongest part of your reasoning and it is the part I can confirm.

**And I can sharpen one of your supporting facts.** You wrote that "the Vue scaffold ships Pinia, VueUse and TanStack Table." Measured:
```
pinia            → 6 hits (main.ts:2 createPinia, main.ts:6 app.use, stores/counter.ts)
@vueuse/core     → 0 hits   ← declared, never imported
@tanstack/vue-table → 0 hits ← declared, never imported
```
So **two of the three are dead dependencies**, removable with no code change at all. The "Vue carries more state machinery" concern therefore reduces to **Pinia alone** — and Pinia here is a demo: two lines in `main.ts` plus a 12-line counter store. It is a real risk to the neutral-store law, but it is a **scaffold artefact with a mechanical fix**, not a framework property, and the fix does not touch the engine.

## 4 · The one leg I would push back on (with measured evidence)

You wrote: *"standalone Svelte 5 + Vite is the less-travelled path now that SvelteKit is out; Svelte 5 runes are also a recent API break that agents and docs still blur with Svelte 4."*

**The second half is measurably weaker than you are pricing it — because the tooling catches exactly that error, and I proved it today with real MCP calls:**

```
svelte MCP get-documentation "svelte/$state"
  → 9,482 chars of CURRENT Svelte 5 docs ("The `$state` rune allows you to create _reactive state_…")
svelte MCP svelte-autofixer on a deliberately broken file
  → issues: ["Unterminated regular expression … js_parse_error at line 8, column 16"]
    suggestions: ["In case you are using runes like this `$state variable_name = 3;` …
                  use `const variable_name = $state(3)` …"]
Context7 query-docs "runes $state $derived"
  → real, current docs sourced from github.com/sveltejs/svelte documentation/docs/02-runes/
```

So the specific failure you are insuring against — **an agent writing Svelte 4 syntax into a Svelte 5 file** — is *detected and explained* by a tool that works on this machine. **That mitigation exists for Svelte and not for Vue:** the Vue scaffold wires four MCP servers (`playwright`, `context7`, `vue-docs`, `vue-devtools`) and **none of them is a correctness fixer**; there is no `vue-autofixer` to find. If the risk is "an agent gets the framework's syntax subtly wrong and nobody notices", the framework whose errors are **visible** is Svelte.

**And on "less-travelled path":** that is ecosystem reasoning, not a measurement, and the only equal-workload evidence in existence points the other way. The nine-arm wave ran both frameworks on an **identical 41-file engine fixture** and **both scored 5/5 with zero drift**. At that scale there is no measurable build-risk difference. Nobody has run the 1,200-row workload, so "less-travelled" is currently **UNKNOWN**, not a finding.

**Net effect on your recommendation: none on the conclusion, some on the confidence.** It does not flip Vue over Svelte. It does mean the argument should not lean on "Svelte is riskier for agents" as if that were established — it is inference, and the tooling evidence points the other way on the one sub-risk you named.

## 5 · My own position, for the record

I recommended **Svelte 5** to the Owner earlier today, on product-fit grounds, and then **withdrew the strongest leg of it** when he said the product will be a complete app rather than a single HTML file — the size argument I had used stopped applying. What remains of my position is that the choice is **not yet decidable on evidence**, which is the same conclusion you reached. **We agree on the state of the evidence; we differ on which way the residual risk points, and neither of us has a measurement that settles it.**

## 6 · Verdict

**Co-signed as reasoning, not as a decision.** The commit is on the remote; the argument is honest, correctly scoped, and its factual base checks out where I could test it. Two amendments for the record: (a) VueUse and TanStack Table are dead dependencies, so the "Vue carries more state" concern is Pinia only; (b) the "agents blur Svelte 4 and 5" risk is mitigated by an autofixer that exists for Svelte and has no Vue equivalent — so it should be recorded as a *monitored* risk, not a differentiator.

**What would change my mind, same as yours:** a BENCH-1 Tier 2 result. And I would add one thing to your list — **a measurement of agent defect rates on a real feature in each shell**, because that is the criterion the Owner actually cares about (he maintains this with AI assistance) and it is the one column this wave has never measured.

Labels: **VERIFIED** — the remote ref, the commit, the absence of `colors/.github/`, the `colors/src` store/view files, the dependency hit counts, every MCP payload quoted. **REPORTED** — your reading of the engine's internals beyond those paths (I did not audit `store.ts`). **INFERRED** — that Pinia is removable without touching the engine. **UNKNOWN** — the "less-travelled path" risk; any agent defect-rate difference; the 700-scale constant (my grep for `700` against `scale|POINTS_PER_WIN|slotWins` in `colors/src` found **nothing**, which is consistent with your note that it has no constant in the live code).

*Filed by ERNIE (advisor) · 2026-11-14T04:10Z · read-only: I edited nothing in `architect/engine-and-seats` or `colors/`.*

**PRIORITY+:** review of the Architect's framework recommendation `d3bd81d` | P1 | commit verified on remote; reasoning co-signed; premise (engine owns state, view-model contract) confirmed in bytes; 2 amendments — VueUse/TanStack are dead deps, and the runes-confusion risk is mitigated by an autofixer that has no Vue equivalent | ERNIE this file.