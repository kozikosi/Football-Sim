<!-- Drive-level feed (w74 item 5c, Z.ai DRAFT) — renders GameFeed (app/feed.ts, item 4d). Play-by-play is
     DEFERRED by design: when feed.ts's union grows a 'play' member (v: 2), this component gains a collapsible
     per-drive detail block and nothing else here changes. -->
<script lang="ts">
  import type { GameFeed } from '../../sports/nfl/app/feed.ts';

  let { feed, open = -1 }: { feed: GameFeed; open?: number } = $props();

  // G-VM11 (flagged): which drive is expanded is EPHEMERAL component state ($state), not store state — it is
  // lost on reload by design, per appstate.ts's classification of UI state.
  let openDrive = $state(open);
  function toggle(n: number): void { openDrive = openDrive === n ? -1 : n; }
  const winner = $derived(feed.homeScore === feed.awayScore ? null : (feed.homeScore > feed.awayScore ? feed.home : feed.away));
</script>

<section class="feed" aria-label="Game feed — drive level">
  <header>
    <h2>{feed.away} {feed.awayScore} — {feed.homeScore} {feed.home}</h2>
    {#if feed.ot}
      <p class="ot">Overtime: {feed.ot.first} first possession, {feed.ot.periods} period(s){feed.ot.tie ? ' — tie' : ''}</p>
    {/if}
    {#if winner}<p class="win">Winner: {winner}</p>{/if}
  </header>

  <ol class="drives">
    {#each feed.drives as d (d.n)}
      <li data-end={d.end}>
        <button type="button" aria-expanded={openDrive === d.n} onclick={() => toggle(d.n)}>
          <span class="clock">{d.clock}</span>
          <span class="team">{d.team}</span>
          <span class="end">{d.summary}</span>
          <span class="pts" class:zero={d.pts === 0 && d.oppPts === 0}>{d.pts > 0 ? `+${d.pts}` : d.oppPts > 0 ? `−${d.oppPts}` : '0'}</span>
        </button>
        {#if openDrive === d.n}
          <dl class="detail">
            <dt>Plays</dt><dd>{d.plays}</dd>
            <dt>Yards</dt><dd>{d.yards === null ? 'not recorded at drive level (v1)' : d.yards}</dd>
            <dt>Scoring</dt>
            <dd>{#if d.scores.length}{#each d.scores as s (s.at)}{s.team} {s.kind} ({s.pts}){#if s.conv !== 'none' && s.conv !== 'xp'} · {s.conv}{/if}{/each}{:else}none{/if}</dd>
          </dl>
        {/if}
      </li>
    {/each}
  </ol>
</section>

<style>
  .drives { list-style: none; padding: 0; }
  .drives > li { border-bottom: 1px solid #ddd; }
  .drives button { display: flex; gap: 0.6rem; width: 100%; text-align: left; padding: 0.3rem 0.2rem; background: none; border: 0; cursor: pointer; align-items: baseline; }
  .clock { font-variant-numeric: tabular-nums; opacity: 0.7; min-width: 7ch; }
  .team { font-weight: 600; min-width: 9ch; }
  .end { flex: 1; }
  .pts { font-weight: 700; font-variant-numeric: tabular-nums; }
  .pts.zero { opacity: 0.4; font-weight: 400; }
  .detail { display: grid; grid-template-columns: auto 1fr; gap: 0 0.8rem; font-size: 0.85rem; padding: 0.2rem 0 0.5rem 1.6rem; }
  .ot, .win { font-size: 0.9rem; }
</style>
