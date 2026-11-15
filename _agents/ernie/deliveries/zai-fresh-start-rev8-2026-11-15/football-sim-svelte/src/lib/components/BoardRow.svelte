<script lang="ts">
  // BoardRow.svelte — slice (c): the draft-board row list with Wins/Priority, flex badges, fixed
  // visuals, data-testid="row-*" hooks. The board stays hand-rolled (house rule).
  import { app } from '../state/appStore.svelte.ts';
  import { inkOf } from '../shared/ink.ts';
</script>

<section>
  <div class="cards-head">
    <h2 style="margin: 0">DRAFT BOARD</h2>
    <span class="cards-count">{app.board.header.onClock}</span>
  </div>
  <div class="board-list">
    {#each app.board.rows as r (r.id)}
      <div class="board-row" data-testid={'row-' + r.id} style={'--tc: ' + inkOf(r.nflTeam).ink}>
        <span class="tb-pos">{r.pos}</span>
        <span class="tb-name">{r.name}</span>
        <span class="tb-ovr">{r.ovr}</span>
        <span class="tb-wins">{r.wins}</span>
        <span class="tb-pri">{r.priority}</span>
        <span class="tb-badges">
          {#each r.alsoFits as b, bi (bi)}
            <span class="tb-badge" class:gold={bi === 0}>{b}</span>
          {/each}
        </span>
      </div>
    {/each}
  </div>
</section>
