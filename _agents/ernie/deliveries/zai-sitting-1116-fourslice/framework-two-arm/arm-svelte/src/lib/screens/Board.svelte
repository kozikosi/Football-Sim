<!-- Slice 2 — the draft board: the user team's picks, the best-available list, a pick action through
     the REAL reducer (app/store.ts dispatch PICK). Every number is the engine's own boardVM
     (view/draftBoard.ts): wins, priority, gone%, flex chips; PICK/UNDO go through the store. -->
<script lang="ts">
  import { board, ui, draftSnap, pick, undo, setSort } from '../appStore.svelte.ts';
  import type { BoardSort } from '../appStore.svelte.ts';
  import { slotLabel } from '../../engine/sports/nfl/view/draftBoard.ts';
  import { TEAMS } from '../../engine/sports/nfl/engine/league.ts';

  const rows = $derived(board()?.rows ?? []);
  const header = $derived(board()?.header ?? null);
  const mine = $derived((draftSnap().draft?.log ?? []).filter((k) => k.team === draftSnap().record?.userTeam));
  const rec = $derived(draftSnap().record);
  const teamName = $derived(rec ? TEAMS[rec.userTeam].name : '');
  const toneColor = (t: 'good' | 'neutral' | 'bad'): string =>
    t === 'good' ? 'var(--cp-good)' : t === 'bad' ? 'var(--cp-bad)' : 'var(--cp-sub)';
</script>

<section class="cp-screen" aria-label="Draft board">
  {#if header}
    <div class="cp-board-head">
      <span class="cp-board-onclock">{header.onClock}</span>
      <span class="cp-board-count">{teamName} · {header.roundLabel} · pick {header.pickInRound} of 32 · {header.overall} of {header.totalPicks} overall</span>
    </div>
    <div class="cp-toolrow">
      {#each ['wins', 'ovr', 'priority'] as s (s)}
        <button class="cp-feedtool" class:cp-feedtool-on={ui.sort === s} onclick={() => setSort(s as BoardSort)} aria-pressed={ui.sort === s}>{s.toUpperCase()}</button>
      {/each}
      <button class="cp-feedtool" onclick={undo}>UNDO MY LAST</button>
    </div>
    <div class="cp-board-table">
      {#each rows as r, i (r.id)}
        <div class="cp-board-row" style="--beat:{i}">
          <span class="cp-board-name">{r.name}</span>
          <span class="cp-board-pos" style="color:{toneColor(r.tone)}">{r.pos}</span>
          <span class="cp-board-num">ovr {r.ovr}</span>
          <span class="cp-board-slot">{r.slotLabel}</span>
          <span class="cp-board-num">wins {r.wins}</span>
          <span class="cp-board-num">prio {r.priority}</span>
          <span class="cp-board-num cp-board-gone">gone {r.gone}</span>
          {#each r.alsoFits as f (f.slotId)}<span class="cp-board-flex">{f.slotLabel} {f.flex}</span>{/each}
          <button class="cp-pickbtn" onclick={() => pick(r.id, r.slotId)}>PICK</button>
        </div>
      {/each}
    </div>
    {#if draftSnap().error}<p class="cp-msg cp-msg-refused">{draftSnap().error}</p>{/if}
  {:else if draftSnap().status === 'done'}
    <p class="cp-screen-note">the draft is complete — {teamName}'s 32 are in; the feed panel has their week 1</p>
  {:else}
    <p class="cp-screen-note">no draft in progress</p>
  {/if}
  <div class="cp-mine">
    <h4 class="cp-title">YOUR PICKS ({mine.length})</h4>
    {#each mine as k (k.overall)}<div class="cp-mine-line">#{k.overall} · {k.player.name} → {slotLabel(k.slot)}</div>{/each}
    {#if !mine.length}<div class="cp-mine-line">no picks yet — the board above is the engine's best-available</div>{/if}
  </div>
  <footer class="cp-feed-foot">
    <span>rows are the engine's own boardVM (60 best) · gone% is the engine's CPU replay (30 sims)</span>
    <span class="cp-feed-dim">PICK dispatches into the real reducer</span>
  </footer>
</section>
