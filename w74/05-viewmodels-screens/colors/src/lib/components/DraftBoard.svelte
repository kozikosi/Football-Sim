<!-- Draft Board (w74 item 5b, Z.ai DRAFT): engine -> store -> boardVM -> this component -> dispatch.
     Pure renderer: every string comes from the VM (view/draftBoard.ts via selectors.ts). -->
<script lang="ts">
  import { selectBoard, selectRoster } from '../../sports/nfl/app/selectors.ts';
  import type { BoardSort } from '../../sports/nfl/app/appstate.ts';
  import { dispatch, appState } from '../app-store.svelte.ts';

  const st = $derived(appState());

  // G-VM5 (flagged for the pattern freeze): ephemeral board sort lives in COMPONENT state, not the store,
  // until the whole-app reducer exists (appstate.ts puts ui.boardSort in AppState; that reducer is pending).
  // The F10 union is imported from appstate.ts so the component cannot invent a sort key.
  let sort = $state<BoardSort>('wins');
  let limit = $state(60);                      // the pager: the board renders `limit` rows; Show more widens it
  let pickFeedback = $state<string | null>(null);

  const board = $derived(selectBoard(st, { sort, limit }));
  const roster = $derived(selectRoster(st));
  const done = $derived(st.status === 'done');

  function pick(playerId: string, slot: string): void {
    pickFeedback = null;
    dispatch({ type: 'PICK', playerId, slot: slot as never });
  }
  function undo(): void { pickFeedback = null; dispatch({ type: 'UNDO' }); }
</script>

{#if board && roster}
  <header>
    <h1>{board.header.teamName} — {board.header.roundLabel}</h1>
    <p class="onclock" role="status">{board.header.onClock}</p>
    <p class="progress">{board.footer.text}</p>
  </header>

  {#if st.error}
    <p class="error" role="alert">{st.error}</p>
  {/if}
  {#if pickFeedback}
    <p class="error" role="alert">{pickFeedback}</p>
  {/if}

  <nav class="sorts" aria-label="Sort the board">
    {#each (['wins', 'priority', 'ovr'] as BoardSort) as s}
      <button type="button" aria-pressed={sort === s} onclick={() => (sort = s)}>{s}</button>
    {/each}
    <button type="button" onclick={undo} disabled={done}>Undo last pick</button>
  </nav>

  {#if board && board.rows.length >= limit}
    <button type="button" class="pager" onclick={() => (limit = limit + 60)}>
      Show more (showing {limit} of {board.footer.total} pick slots)
    </button>
  {/if}

  <div class="tablewrap">
  <table class="board">
    <thead>
      <tr><th>Player</th><th>Pos</th><th>NFL</th><th>OVR</th><th>Slot</th><th>Wins</th><th>Priority</th><th>Gone</th><th></th></tr>
    </thead>
    <tbody>
      {#each board.rows as r (r.id)}
        <tr data-tone={r.tone}>
          <td class="name">{r.name}</td>
          <td>{r.pos}</td>
          <td>{r.nflTeam}</td>
          <td>{r.ovr}</td>
          <td>{r.slotLabel}{r.natural ? '' : ' (flex)'}</td>
          <td>{r.wins}</td>
          <td>{r.priority}</td>
          <td>{r.gone}</td>
          <td><button type="button" onclick={() => pick(r.id, r.slotId)} disabled={done}>Pick</button></td>
        </tr>
      {/each}
    </tbody>
  </table>
  </div>

  <section aria-label="Your roster">
    <h2>Your roster — {roster.text}</h2>
    {#each roster.groups as g (g.unit)}
      <div class="unit">
        <h3>{g.title} ({g.filled}/{g.total})</h3>
        <ul>
          {#each g.rows as row (row.slotId)}
            <li class:filled={row.filled}>
              <span class="slot">{row.slotLabel}</span>
              {#if row.player}
                <span class="pname">{row.player.name}</span>
                <span class="pmeta">{row.player.pos} · {row.player.ovr}{row.player.flex ? ` · ${row.player.flex}` : ''}</span>
              {:else}
                <span class="empty">—</span>
              {/if}
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </section>
{:else}
  <p>The draft is not in progress.</p>
{/if}

<style>
  .onclock { font-weight: 700; }
  .sorts { display: flex; gap: 0.4rem; margin: 0.5rem 0; }
  .sorts button[aria-pressed='true'] { font-weight: 700; text-decoration: underline; }
  .tablewrap { overflow-x: auto; }   /* the table scrolls INSIDE its wrapper; the page never scrolls sideways (acceptance 1) */
  table.board { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
  .board th, .board td { border-bottom: 1px solid #ddd; padding: 0.25rem 0.4rem; text-align: left; }
  .board td.name { font-weight: 600; }
  .board tr[data-tone='good'] td:nth-child(6) { color: #0a6b0a; }
  .board tr[data-tone='bad'] td:nth-child(6) { color: #b00020; }
  .error { color: #b00020; }
  .unit ul { list-style: none; padding: 0; columns: 2; }
  .unit li { padding: 0.1rem 0; }
  .unit li:not(.filled) { opacity: 0.45; }
  .unit .slot { display: inline-block; min-width: 4.5rem; font-weight: 600; }
  .unit .pmeta { font-size: 0.8rem; opacity: 0.75; margin-left: 0.4rem; }
</style>
