<!-- The §2.5 feed panel in Svelte 5 — the same component the Vue arm renders, line for line:
     clock stamp, team chip (user's team in blue per the §1.3 law), the mapper's own summary, the
     w88 badge chips (every turnover named: INT/FUM, DEF TD, LEAD Δ, conv), running score, quarter
     marks, FINAL card, provenance stamp; NEWEST FIRST + MY DRIVES as the drive filters; keyboard
     reachable (native buttons + focusable lines); beat-in with reduced-motion off (in feed.css). -->
<script lang="ts">
  import type { FeedVM, FeedDriveVM } from '../feedVM.ts';

  let { feed }: { feed: FeedVM } = $props();
  let newestFirst = $state(false);
  let mineOnly = $state(false);

  const ordered = $derived<FeedDriveVM[]>(newestFirst ? [...feed.drives].reverse() : feed.drives);
  const shown = $derived<FeedDriveVM[]>(mineOnly ? ordered.filter((d) => d.me) : ordered);
  const clockOf = (c: string): string => c.replace(':', '\u00b7');   // the dot law: the displayed colon is the middle dot
  const toneColor = (t: 'good' | 'bad' | 'gold' | 'sub'): string =>
    t === 'good' ? 'var(--cp-good)' : t === 'bad' ? 'var(--cp-bad)' : t === 'gold' ? 'var(--cp-gold)' : 'var(--cp-sub)';
  const teamChipColor = (d: FeedDriveVM): string => (d.me ? 'var(--cp-blue)' : d.teamPale);   // user's team in blue
</script>

<section class="cp-feed" aria-label="Game feed">
  <header class="cp-feed-head">
    <span class="cp-feed-week">WEEK {feed.week} · {feed.year}</span>
    <span class="cp-feed-vs">{feed.awayAbbr} @ {feed.homeAbbr}</span>
    <span class="cp-feed-tools">
      <button class="cp-feedtool" class:cp-feedtool-on={newestFirst} onclick={() => (newestFirst = !newestFirst)} aria-pressed={newestFirst}>NEWEST FIRST</button>
      <button class="cp-feedtool" class:cp-feedtool-on={mineOnly} onclick={() => (mineOnly = !mineOnly)} aria-pressed={mineOnly}>MY DRIVES</button>
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
        <span class="zrl-team" style="color:{teamChipColor(d)}">{d.teamAbbr}</span>
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
