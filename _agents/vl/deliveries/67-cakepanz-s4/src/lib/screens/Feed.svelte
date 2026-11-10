<!-- Slice 4 — the N3 drive-level feed. THE W88 LOOK IS THE TARGET: the badge format and the colors of the
     current version (Owner, verbatim). Line anatomy copied from the w88 report (zpb-rep-line family):
       [clock stamp] [crest/team chip in the team's ink] [the play: summary + badge chips] [running score]
     with the zrl-me glow on the user's drives, the quarter marks, the FINAL card, and the beat-in animation
     (reduced-motion off-switch). Dynamic where the shell was static: newest-first toggle, ME filter,
     lead-change marks — all Svelte state, none of it touches the anatomy or the palette. -->
<script lang="ts">
  import type { FeedVM, FeedDriveVM } from '../feedVM.ts';

  let { feed, onclose }: { feed: FeedVM; onclose: () => void } = $props();
  let newestFirst = $state(false);
  let mineOnly = $state(false);

  const ordered = $derived<FeedDriveVM[]>(newestFirst ? [...feed.drives].reverse() : feed.drives);
  const shown = $derived<FeedDriveVM[]>(mineOnly ? ordered.filter((d) => d.me) : ordered);
  const clockOf = (c: string): string => c.replace(':', '\u00b7');   // the dot law: the displayed colon is the middle dot
  const toneColor = (t: 'good' | 'bad' | 'gold' | 'sub'): string =>
    t === 'good' ? 'var(--cp-good)' : t === 'bad' ? 'var(--cp-bad)' : t === 'gold' ? 'var(--cp-gold)' : 'var(--cp-sub)';
</script>

<section class="cp-feed" aria-label="Game feed">
  <header class="cp-feed-head">
    <span class="cp-feed-week">WEEK {feed.week} · {feed.year}</span>
    <span class="cp-feed-vs">{feed.awayAbbr} @ {feed.homeAbbr}</span>
    <span class="cp-feed-tools">
      <button class="cp-feedtool" class:cp-feedtool-on={newestFirst} onclick={() => (newestFirst = !newestFirst)} aria-pressed={newestFirst}>NEWEST FIRST</button>
      <button class="cp-feedtool" class:cp-feedtool-on={mineOnly} onclick={() => (mineOnly = !mineOnly)} aria-pressed={mineOnly}>MY DRIVES</button>
      <button class="cp-feedtool" onclick={onclose}>← BOARD</button>
    </span>
  </header>

  <div class="cp-feed-final">
    <b><span style="color:{feed.awayInk.pale}">{feed.awayAbbr}</span> {feed.awayScore}</b>
    <span class="cp-feed-at"> at </span>
    <b><span style="color:{feed.homeInk.pale}">{feed.homeAbbr}</span> {feed.homeScore}</b>
    <span class="cp-feed-finalnote">
      {feed.ot ? (feed.ot.tie ? `TIE — OT ×${feed.ot.periods} (both teams possessed)` : `FINAL — OT ×${feed.ot.periods} (both teams possessed)`) : 'FINAL'}
      {#if feed.regHome !== feed.homeScore || feed.regAway !== feed.awayScore}
        <span class="cp-feed-dim"> · regulation {feed.regAway}–{feed.regHome}</span>
      {/if}
    </span>
    <span class="cp-feed-prov">{feed.gameSeedLabel}</span>
  </div>

  <div class="cp-feed-log" data-testid="cp-feed-log">
    {#each shown as d, i (d.n)}
      {#if !mineOnly && !newestFirst && (i === 0 || shown[i - 1].period !== d.period)}
        <div class="cp-feed-q">{d.period >= 5 ? 'OT' : `Q${d.period}`}</div>
      {/if}
      <article class="cp-feed-line" class:cp-me={d.me} style="--beat:{i}" data-period={d.period}>
        <span class="zrl-t">{d.period >= 5 ? `OT${d.period - 4}` : clockOf(d.clock)}</span>
        <span class="zrl-team" style="color:{d.teamPale}">{d.teamAbbr}</span>
        <span class="zrl-play">
          <span class="cp-feed-summary">{d.summary}</span>
          <span class="cp-feed-badges">
            {#each d.badges as b (b.label)}
              <span class="zrl-badge" style="color:{toneColor(b.tone)}">{b.label}</span>
            {/each}
            {#each d.convBadges as c (c.label)}
              <span class="zrl-badge" style="color:{toneColor(c.tone)}">{c.label}</span>
            {/each}
          </span>
        </span>
        <span class="zrl-sc">
          <b style="color:{feed.awayInk.pale}">{d.scoreAfter.away}</b>
          <span class="cp-feed-dot">·</span>
          <b style="color:{feed.homeInk.pale}">{d.scoreAfter.home}</b>
        </span>
      </article>
    {/each}
    {#if !shown.length}
      <p class="cp-feed-empty">no drives match the filter</p>
    {/if}
  </div>

  <footer class="cp-feed-foot">
    <span>{feed.drives.length} drives · {feed.meDrives} mine · {feed.leadChanges} lead changes</span>
    <span class="cp-feed-dim">drives and scores read off the engine's own game; the feed adds nothing (yards ride a later engine field — none is faked)</span>
  </footer>
</section>

<style>
  .cp-feed { border: 1px solid #3a2c31; border-radius: 14px; background: #221820; padding: 14px; margin: 12px 0; }
  .cp-feed-head { display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 8px; }
  .cp-feed-week { font-size: 0.68rem; letter-spacing: 0.22em; color: var(--cp-sub); font-weight: 800; }
  .cp-feed-vs { font-family: Georgia, serif; font-weight: 800; color: #f5e9dd; font-size: 1.05rem; letter-spacing: 0.06em; }
  .cp-feed-tools { margin-left: auto; display: flex; gap: 6px; flex-wrap: wrap; }
  .cp-feedtool { border: 1px solid #8a5f18; background: transparent; color: #e8c87e; border-radius: 999px;
    padding: 4px 12px; cursor: pointer; font-family: inherit; font-size: 0.68rem; font-weight: 800; letter-spacing: 0.1em; }
  .cp-feedtool:hover { background: rgba(217, 169, 76, 0.12); }
  .cp-feedtool-on { background: linear-gradient(90deg, #c9a24b, #b3766a); color: #2c1e0c; border-color: transparent; }

  .cp-feed-final { text-align: center; padding: 12px 6px 10px; }
  .cp-feed-final b { font-family: Georgia, 'Times New Roman', serif; font-size: 1.45rem; letter-spacing: 0.04em; }
  .cp-feed-at { color: var(--cp-sub); font-size: 0.9rem; }
  .cp-feed-finalnote { display: block; color: var(--cp-sub); font-size: 0.8rem; margin-top: 2px; }
  .cp-feed-prov { display: block; color: var(--cp-sub); font-size: 0.66rem; letter-spacing: 0.08em; margin-top: 4px; opacity: 0.85; }
  .cp-feed-dim { opacity: 0.8; }

  .cp-feed-q { margin: 10px 0 4px; font-size: 0.62rem; letter-spacing: 0.24em; color: var(--cp-text); text-transform: uppercase; text-align: center; }

  .cp-feed-log { padding: 4px 2px; min-height: 220px; max-height: 56vh; overflow-y: auto; }
  .cp-feed-line { display: flex; align-items: baseline; gap: 7px; padding: 6px 9px; border-radius: 10px; font-size: 0.82rem; margin: 3px 0;
    background: var(--cp-glass); border: 1px solid var(--cp-glassbd);
    opacity: 0; transform: translateY(7px); animation: cpbeat 0.55s cubic-bezier(0.2, 0.7, 0.3, 1) forwards;
    animation-delay: calc(var(--beat, 0) * 0.03s); }
  .cp-feed-line.cp-me { border-color: color-mix(in srgb, var(--cp-gold) 55%, var(--cp-glassbd)); box-shadow: 0 0 12px rgba(217, 169, 76, 0.18); }
  @keyframes cpbeat { to { opacity: 1; transform: none; } }
  @media (prefers-reduced-motion: reduce) { .cp-feed-line { animation: none; opacity: 1; transform: none; } }

  .zrl-t { color: var(--cp-text); font-variant-numeric: tabular-nums; font-size: 0.7rem; min-width: 52px; white-space: nowrap; }
  .zrl-team { font-weight: 800; font-size: 0.72rem; letter-spacing: 0.06em; min-width: 34px; }
  .zrl-play { flex: 1; min-width: 0; white-space: normal; overflow-wrap: anywhere; color: var(--cp-text); }
  .cp-feed-summary { display: block; }
  .cp-feed-badges { display: inline-flex; gap: 4px; flex-wrap: wrap; margin-top: 2px; }
  .zrl-badge { border: 1px solid currentColor; border-radius: 6px; padding: 0 5px; font-size: 0.62rem; font-weight: 800; letter-spacing: 0.08em; white-space: nowrap; }
  .zrl-sc { font-variant-numeric: tabular-nums; font-weight: 700; color: var(--cp-sub); white-space: nowrap; }
  .zrl-sc b { font-weight: 900; }
  .cp-feed-dot { color: var(--cp-sub); }
  .cp-feed-empty { color: var(--cp-sub); text-align: center; font-size: 0.85rem; padding: 18px 0; }

  .cp-feed-foot { border-top: 1px solid #3a2c31; padding-top: 8px; display: flex; gap: 12px; flex-wrap: wrap; color: var(--cp-sub); font-size: 0.72rem; justify-content: space-between; }
</style>
