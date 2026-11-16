<script lang="ts">
  // PlayerCards.svelte — slice (a): a card per player (name, team, position, OVR, Wins, Priority),
  // w89 gold/team-color styling, data-testid="row-*" hooks. The bridge derives; this renders.
  import { app } from '../state/appStore.svelte.ts';
  import { inkOf } from '../shared/ink.ts';
  import type { BoardSort } from '../engine/sports/nfl/view/draftBoard.ts';
</script>

<section>
  <div class="cards-head">
    <h2 style="margin: 0">THE BOARD'S CARDS</h2>
    <select class="week-jump" data-testid="cards-sort" value={app.sort} onchange={(e) => app.setSort((e.currentTarget as HTMLSelectElement).value as BoardSort)}>
      <option value="wins">WINS</option>
      <option value="ovr">OVR</option>
      <option value="priority">PRIORITY</option>
    </select>
    <span class="cards-count" data-testid="cards-count">{app.cards.count}</span>
  </div>
  <div class="cards-grid">
    {#each app.cards.cards as c (c.id)}
      <article class="card" data-testid={'row-' + c.id} style={'--tc: ' + inkOf(c.nflTeam).ink}>
        <div class="medal">{c.monogram}</div>
        <div class="tc-name">{c.name}</div>
        <div><span class="tc-pos">{c.pos}</span> <span class="tc-nfl">{c.nflTeam}</span></div>
        <div class="tc-ovr">{c.ovr}</div>
        <div class="card-nums">
          <div><small>WINS</small><span class="tc-wins">{c.wins}</span></div>
          <div><small>PRIORITY</small><span class="tc-pri">{c.priority}</span></div>
        </div>
      </article>
    {/each}
  </div>
</section>
