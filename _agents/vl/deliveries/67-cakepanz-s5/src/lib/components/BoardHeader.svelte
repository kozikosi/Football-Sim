<!-- The header: the draft state — round, pick, team on the clock. -->
<script lang="ts">
  import type { BoardHeaderVM } from '../../engine/sports/nfl/view/draftBoard.ts';
  let { header }: { header: BoardHeaderVM } = $props();
</script>

<div class="cp-hd">
  <span class="cp-team">{header.teamName}</span>
  <span class="cp-round">{header.roundLabel} · Pick {header.pickInRound}</span>
  <span class="cp-overall">overall {header.overall} of {header.totalPicks}</span>
</div>
<p class="cp-onclock">{header.onClock}</p>

<style>
  .cp-hd { display: flex; gap: 16px; align-items: baseline; flex-wrap: wrap; }
  .cp-team { font-size: 1.15rem; font-weight: 800; letter-spacing: 0.06em; color: #e8c87e; }
  .cp-round { color: #f5e9dd; font-weight: 700; }
  .cp-overall { color: #c8a48f; font-size: 0.85rem; }
  .cp-onclock { margin: 6px 0 2px; font-size: 0.82rem; letter-spacing: 0.05em; color: #d9a94c; }
</style>
