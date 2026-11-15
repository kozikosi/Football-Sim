<script lang="ts">
  // LiveFeed.svelte — slice (d): the live-updating feed — the engine's REAL week-1 game revealed
  // drive by drive (a ticker in the bridge), scoreboard riding the running score, w89 styling.
  import { app } from '../state/appStore.svelte.ts';

</script>

<section>
  <div class="feed-score">
    <span class="fs-team" style={'color: ' + app.feed.homeInk.ink}>{app.feed.homeAbbr}</span>
    <span class="fs-num" data-testid="feed-score">{app.feedScore}</span>
    <span class="fs-team" style={'color: ' + app.feed.awayInk.ink}>{app.feed.awayAbbr}</span>
    <span class="fs-week">{app.feed.week} · {app.feed.year} · {app.feed.gameSeedLabel}</span>
  </div>
  <div class="feed-ctl">
    <span class="feed-live-dot" class:on={app.feedLive}></span>
    <button class="ctl-btn" class:paused={!app.feedLive} data-testid="feed-live" onclick={() => app.feedLive ? app.feedStop() : app.feedStart()}>
      {app.feedLive ? 'PAUSE' : 'LIVE'}
    </button>
    <button class="ctl-btn paused" data-testid="feed-ff" onclick={() => app.feedFastForward()}>FINAL</button>
    <span class="cards-count">{app.feedShown.length} / {app.feed.drives.length} DRIVES</span>
  </div>
  <div class="feed" data-testid="feed">
    {#each app.feedShown as d, i (i)}
      <div class="feed-line" class:me={d.me} data-testid={'feed-line-' + i} style={'--tc: ' + d.teamInk}>
        {#if d.me}<span class="fl-team">[ME] </span>{/if}<span class="fl-team">{d.teamAbbr}</span>
        {' ' + d.summary}
        {#each d.badges as b, bi (bi)}
          <span class="fl-badge">{b.label}</span>
        {/each}
        <span class="fl-score" class:lead={d.leadChange}>{d.scoreAfter.home}-{d.scoreAfter.away}</span>
      </div>
    {/each}
  </div>
</section>
