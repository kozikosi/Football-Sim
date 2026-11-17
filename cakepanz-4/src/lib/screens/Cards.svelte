<!-- 67 Cakepanz · the player cards: one card per player, the Owner's three numbers on the face
     (Wins · Priority · OVR), the valuation label on the footer, the form arrow in the corner
     (STAND-IN: tone-derived until the engine's form model lands — no engine number is faked). -->
<script lang="ts">
  import { toCardGrid } from '../port/cardVM.ts';
  import { MODE_LABEL } from '../valuation.ts';
  import { valuation } from '../valuation.ts';
  import type { BoardVM } from '../port/seam.ts';

  let { vm }: { vm: BoardVM | null } = $props();
  let grid = $derived(vm ? toCardGrid(vm) : null);
</script>

<section class="cp-cards">
  <h2 class="cp-h2">PLAYER CARDS{grid ? ` · ${grid.teamName}` : ''}</h2>
  {#if !grid}
    <p class="cp-note">No board yet — the cards re-render the board's own rows, so a draft has to exist first.</p>
  {:else}
    <p class="cp-sub">{grid.onClock}</p>
    <div class="cp-cardgrid">
      {#each grid.cards as c (c.id)}
        <div class="cp-pcard" data-tone={c.tone}>
          <span class="cp-arrow {c.arrow}" title="form">{c.arrow === 'up' ? '▲' : c.arrow === 'down' ? '▼' : '—'}</span>
          <div class="mono">{c.monogram}</div>
          <div class="pname">{c.name}</div>
          <div class="pmeta">{c.pos} · {c.nflTeam} · fills {c.slotLabel}{c.slotLabel && !c.slotId ? '' : ''}</div>
          <div class="pnum">
            <div><b>{c.wins}</b><span>WINS</span></div>
            <div><b>{c.priority}</b><span>PRIORITY</span></div>
            <div><b>{c.ovr}</b><span>OVR</span></div>
          </div>
          {#if c.alsoFits.length}
            <div class="pmeta cp-fitsline">{c.alsoFits.join(' · ')}</div>
          {/if}
        </div>
      {/each}
    </div>
    <p class="cp-prov">Every number on these cards reads <b>{MODE_LABEL[valuation.get().mode]}</b> — the label travels with the numbers. {grid.count}.</p>
  {/if}
</section>
