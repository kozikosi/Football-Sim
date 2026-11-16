SPEAKER: muse | ROLE: council | TASK: Cakepanz shell assist — Part 11, the style laws | DATE: 2026-11-16T21:08Z
FOR: R-13

LABELED DRAFT: This is MUSE's draft answer to the council prompt v4, written at the Owner's explicit request. It is NOT a formal council filing and NOT independent verification. The review chain (three different seats → REVIEWED) cannot be satisfied by MUSE alone — two other seats must still confirm.

# Part 11 — The style laws in the s5 shell

Scope: the s5 delivery on `origin/council/inkling` (`_agents/inkling/deliveries/67-cakepanz-s5/`, extracted to `/tmp` via `git archive`; the repo working tree was never mutated). Shell code = `src/lib/**`, `src/App.svelte`, `src/data/**`, `batteries/**`, `index.html`. The frozen engine snapshot under `src/engine/` is read, not judged as shell work — but where the shell's wording diverges from the engine's own wording, that divergence is named, because the shell chose it.

The laws (repo-root `AGENTS.md` §3, Owner-fixed): plain informative language in recaps (no "expected scoring", no "before kickoff"); every turnover named; overtime events only in the overtime block, never "sudden death"; "2-Pt Conv" except in the Guide; user's team in blue (`.ub`); no periods in DRAFT / SEASON / PLAYOFFS / SUPER BOWL.

## Verdict (VERIFIED)

Two violations, both in shell code, both one-line fixes for Z.ai's next round (filed here, not applied):

1. **"2PT" / "2PT FAIL" badges** — `src/lib/feedVM.ts:114-115`. The law says "2-Pt Conv". The shell's conversion badges read `2PT` and `2PT FAIL`; the engine's own recap (same delivery, `src/engine/sports/nfl/engine/recap.ts:107-108`) writes `2-Pt Conv good` / `2-Pt Conv failed`. The shell diverges from the engine's wording on the same event.
2. **The user's team is not in blue anywhere in the shell** — there is no `.ub` class and no `blue` string in any shell file. The user's drives are marked with a **gold** glow (`.cp-me`, `Feed.svelte:108`). Gold is the w88 "me" treatment; blue is the Owner's fixed law. One of them has to give, and it is not the council's call which — but as written, the shell does not implement the law.

Clean: no "expected scoring" / "before kickoff" / "sudden death" in any shell string; no periods after DRAFT / SEASON / PLAYOFFS / SUPER BOWL anywhere in shell code.

Qualified: **every turnover named** holds in the engine recap (player names, both kinds) but the recap is never rendered by the shell — the only turnover surface the user sees is the feed's drive summary, which names the **team**, not the player ("Chicago throws an interception — 6 plays, 3 min."). Team-named, player-unnamed. Whether that satisfies the law is the Owner's call; the gap is real and is filed below.

**The Guide does not exist in s5.** No Guide file, no Guide route, no "guide" string in `src/lib`, `src/App.svelte`, or `index.html`. The Guide prose review the prompt asks for cannot be done — there is no prose. That is itself a finding: the "except in the Guide" carve-out in the 2-Pt law currently has nothing to attach to.

## What unblocks / exact artifact / how to verify

- **Unblocks:** Z.ai's next shell round (the two violations are one-line string/class changes) and the Owner's Guide decision (the Guide is a missing surface, not a reviewable one).
- **Artifact:** this filing. No code changed.
- **Verify/apply:** re-run the greps in §Evidence. For the fixes: (a) `feedVM.ts` CONV_BADGE `two` → `2-Pt Conv`, `two_fail` → `2-Pt Conv failed` (or the Owner's preferred chip shortening, ruled, not improvised); (b) decide blue-vs-gold for the user's team and implement the winner as `.ub` or rename the law; (c) either render the engine recap or extend the feed summary to name the turnover player — the Owner picks which surface carries the names.

## Evidence

### Law 1 — plain informative language: CLEAN (VERIFIED)

```
$ grep -rni "expected scoring\|before kickoff\|expected score" src batteries index.html
(no hits in shell code)
$ grep -rni "sudden death" src batteries
(no hits in shell code)
```

The only hits in the whole delivery are comments inside the frozen engine snapshot, which assert the law rather than break it:

- `src/engine/sports/nfl/engine/recap.ts:7`: `// always among the stars. The words "expected", "before kickoff" and "sudden death" never appear. UI styling is the shell's job.`
- `src/engine/sports/nfl/engine/drives.ts:12,278`: "sudden death" appears only in code comments describing the overtime rule (not user-visible strings).

### Law 2 — every turnover named: QUALIFIED (VERIFIED)

Engine recap names every turnover with player names (`src/engine/sports/nfl/engine/recap.ts:124-136`):

```ts
// turnovers, in order
const text = c.kind === 'INT'
  ? `${t.name} (${nickname(t.team)}) intercepted ${g.name}${c.retYards ? `, ${c.retYards}-yard return` : ''}${c.defTD ? ' for a touchdown' : ''}`
  : `${g.name} (${nickname(g.team)}) fumbled${c.forcer ? `, forced by ${c.forcer.name} (${nickname(c.forcer.team)})` : ''}, recovered by ${t.name} (${nickname(t.team)})...`;
```

But the shell never renders the recap:

```
$ grep -rn "recap\|gameRecap\|buildRecap" src/lib src/App.svelte
(no hits)
```

The user-visible turnover surface is the feed, which renders the engine mapper's summary sentence (`src/lib/screens/Feed.svelte:57`, `{d.summary}`), built in `src/engine/sports/nfl/app/feed.ts:87-96` (`driveSummary`):

```ts
INT: 'throws an interception', FUM: 'loses a fumble',
...
return `${team} ${ends[d.end]} — ${d.plays} plays, ${mins} min.${tail}`;
```

Rendered form: "Chicago throws an interception — 6 plays, 3 min." The team is named; the interceptor, the fumbler, the forcer, and the recoverer are not. The drive's badge chips (`INT` / `FUM`, `feedVM.ts:110-111`) are also team-level. So on the only surface that exists, turnovers are named by team, not by player. Filing as a gap, not a violation — the law as written does not say "by player", but the recap the law was written for names players, and the shell does not show the recap.

### Law 3 — "2-Pt Conv" except in the Guide: VIOLATION (VERIFIED)

Shell (`src/lib/feedVM.ts:113-116`):

```ts
const CONV_BADGE: Record<string, { label: string; tone: 'good' | 'sub' }> = {
  xp: { label: 'XP', tone: 'good' }, two: { label: '2PT', tone: 'good' },
  xp_miss: { label: 'XP MISS', tone: 'sub' }, two_fail: { label: '2PT FAIL', tone: 'sub' }, none: { label: 'NO TRY', tone: 'sub' },
};
```

Rendered by `src/lib/screens/Feed.svelte:64-66` (`{#each d.convBadges as c}` → `<span class="zrl-badge">{c.label}</span>`). A touchdown with a two-point try shows a `2PT` / `2PT FAIL` chip.

Engine, same delivery (`src/engine/sports/nfl/engine/recap.ts:107-108`):

```ts
if (e.conv === 'two') detail += `${detail ? ', ' : ''}2-Pt Conv good (${c.convBy ? c.convBy.name : ''}...)`;
else if (c.conv === 'two_fail') detail += `${detail ? ', ' : ''}2-Pt Conv failed`;
```

The shell's chip and the engine's detail disagree on the same event. The same `2PT` / `2PT FAIL` strings are present at the same lines in the Ernie s3-s4-rev2 delivery (`src/lib/feedVM.ts:114-115`) — the violation predates slice 5 and was carried forward, not introduced by it.

No other 2-point wording exists in the shell: `grep -rni "2-pt\|2pt\|two-point\|two point\|2-point" src batteries` returns only the `feedVM.ts` lines above, plus `boxscore.ts:26` (`'twoPt'` — an engine field name, not a display string).

### Law 4 — the user's team in blue (`.ub`): VIOLATION / NOT IMPLEMENTED (VERIFIED)

```
$ grep -rni "blue" src --include="*.svelte" --include="*.ts" | grep -v "src/engine"
(no hits)
$ grep -rn "\.ub\b" src --include="*.svelte" --include="*.ts" | grep -v "src/engine"
(no hits)
```

There is no `.ub` class and no blue anywhere in the shell. What the shell does instead, for the user's drives (`src/lib/screens/Feed.svelte:51,108`):

```svelte
<article class="cp-feed-line" class:cp-me={d.me} ...>
...
.cp-feed-line.cp-me { border-color: color-mix(in srgb, var(--cp-gold) 55%, var(--cp-glassbd)); box-shadow: 0 0 12px rgba(217, 169, 76, 0.18); }
```

The user's drives get a gold border + gold glow; team chips elsewhere use each team's own ink (`Feed.svelte:36,68-69`, `style="color:{...Ink.pale}"`). The gold "me" treatment is the w88 look the s5 README says was preserved line-for-line — so this is a genuine conflict between two Owner-fixed things (w88 look vs. blue user team), not a slip. It needs an Owner ruling, not a council edit: either the law bends (gold stays, `.ub` retired for the feed) or the shell bends (user's team rendered in blue). Note the draft board has no user-team marking at all (`BoardRow.svelte` / `DraftBoard.svelte` carry no user-team highlight — grep for `userTeam|isUser` there returns only row/slot logic), so on the board the law has no surface either.

### Law 5 — no periods in DRAFT / SEASON / PLAYOFFS / SUPER BOWL: CLEAN (VERIFIED)

```
$ grep -rn "DRAFT\.\|SEASON\.\|PLAYOFFS\.\|SUPER BOWL\." src batteries
(no hits)
```

Every occurrence in shell code, in full:

- `src/lib/components/Saves.svelte:73`: `<p class="cp-slot-kind">{sum.kind?.toUpperCase()} · rev {sum.saveRevision}</p>` — renders `DRAFT · rev 21`, `WEEK · rev 1`, `SEASON · rev …` (middle dot, no period). The `Load {sum.kind}` button (line 81) renders lowercase `draft`/`week`/`season`.
- `src/lib/shareVM.ts:107-108`: `eyebrow: \`76 PANCAKES · THE ${p.year} SEASON\``, `headline: ... \`${abbrOf(p.userTeam)} WIN THE SUPER BOWL\`` — no periods.
- `src/lib/screens/TeamSelect.svelte:46`: `<button class="cp-ts-go" ...>DRAFT AS {detail.name.toUpperCase()}</button>` — no period.
- `PLAYOFFS` does not appear in shell code at all (no playoff surface in s5).

### The Guide: DOES NOT EXIST (VERIFIED)

```
$ find <s5 tree> -iname "*guide*" -not -path "*/tools/*"
(no hits)
$ grep -rni "guide" src/lib src/App.svelte index.html
(no hits)
```

No Guide file, route, screen, or string in the s5 delivery. The same check on the Ernie s3-s4-rev2 delivery also finds no Guide. The "except in the Guide" carve-out therefore has no surface, and the Guide prose review requested in the prompt cannot be performed. If the Guide is a planned slice, its brief should state which of the laws it is exempt from and why — the exemption currently floats without a surface. (The `tools/` folder contains unrelated `guide`-adjacent words only in vendored engine docs; not a user-facing Guide.)

## §5-style proposals (for Z.ai's next round / the Owner — not applied)

| # | WHERE | Old → New | Why / how to check |
|---|---|---|---|
| 1 | `src/lib/feedVM.ts:114-115`, `CONV_BADGE` | `two: '2PT'` → `2-Pt Conv`; `two_fail: '2PT FAIL'` → `2-Pt Conv failed` (or an Owner-ruled chip shortening) | The law, and the engine's own wording for the same event. Check: `grep -rn "2PT" src/lib` returns nothing; battery feed probe shows the new chip on a two-point drive. |
| 2 | `src/lib/screens/Feed.svelte:108`, `.cp-me` | Gold glow → Owner rules blue-vs-gold (either `.ub` blue for the user's team, or the law is amended to gold) | The law says blue; the shell does gold. A council seat must not pick the winner. Check: the ruling recorded, then the class matches it. |
| 3 | Turnover naming surface | Either render the engine recap (`recap.ts`, which names every turnover by player) or extend `driveSummary`/`feedVM` to carry the turnover player's name into the feed line | Today the only visible turnover text names the team. Check: a feed line for an INT drive names the interceptor. |

## Labels

- VERIFIED: every grep, line number, and quote above (run this session against the `git archive` extract of `origin/council/inkling`).
- REPORTED: the w88 look being the reason for the gold treatment (s5 README's "What was copied" / "w88 look" section — Z.ai's claim, not re-measured here).
- INFERRED: that the blue-vs-gold conflict is a genuine Owner-level conflict rather than an oversight — inferred from the s5 README's explicit "w88 look preserved line-for-line" claim sitting alongside the AGENTS.md blue law.
- UNKNOWN: whether the Owner intends the Guide to be a future slice (no queue row for it was in scope for this part), and whether "every turnover named" is meant at team level or player level on the feed.
