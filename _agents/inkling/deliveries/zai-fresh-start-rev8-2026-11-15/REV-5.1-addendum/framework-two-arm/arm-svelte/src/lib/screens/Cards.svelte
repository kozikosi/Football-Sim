<!-- Slice 5 — player cards (Svelte 5 runes). The board row's face: each engine boardVM row becomes a
     card (name / pos / NFL team on the face, OVR · Wins · Priority as the numbers). Written from
     blank for the authoring bench. Alive: hover lift, open-the-featured-card animation, SHARE PNG
     (the cardDraw canvas export, zero dependencies). Keyboard: cards are buttons (Enter opens), Esc
     closes via svelte:window. Every number is the engine's own; the card re-renders, never re-derives. -->
<script lang="ts">
  import { cards, pick, setStudied } from '../appStore.svelte.ts';
  import LineupPanel from './LineupPanel.svelte';
  import { drawCard } from '../cardDraw.ts';
  import type { CardVM } from '../cardVM.ts';
  import '../../cards.css';

  const grid = $derived(cards());
  let featuredId: string | null = $state(null);
  const featured = $derived(grid ? grid.cards.find((c) => c.id === featuredId) ?? null : null);
  let shareMsg = $state('');

  function open(id: string): void { featuredId = id; shareMsg = ''; setStudied(featuredIdToPos(id)); }
  function close(): void { featuredId = null; shareMsg = ''; setStudied(null); }
  function share(): void {
    if (!featured || !grid) return;
    const url = drawCard(featured, { teamName: grid.teamName, overall: grid.overall, totalPicks: grid.totalPicks });
    if (!url) { shareMsg = 'canvas unavailable'; return; }
    const a = document.createElement('a');
    a.href = url; a.download = 'player-card-' + featured.id + '.png';
    document.body.appendChild(a); a.click(); a.remove();
    shareMsg = 'PNG saved';
  }
  function onKey(e: KeyboardEvent): void { if (e.key === 'Escape') close(); }
  const featuredIdToPos = (id: string): string | null => grid?.cards.find((c) => c.id === id)?.pos ?? null;
</script>

<svelte:window onkeydown={onKey} />

<section class="cp-screen" aria-label="Player cards">
  {#if grid}
    <div class="cp-cards-head">
      <span class="cp-cards-onclock">{grid.onClock}</span>
      <span class="cp-cards-count">{grid.teamName} · {grid.overall} of {grid.totalPicks} overall · {grid.count}</span>
    </div>
    <div class="cp-cards-grid">
      {#each grid.cards as c (c.id)}
        <button class="cp-card" class:cp-tone-good={c.tone === 'good'} class:cp-tone-bad={c.tone === 'bad'} data-pid={c.id} data-pos={c.pos} onclick={() => open(c.id)}>
          <span class="cp-card-mono">{c.monogram}</span>
          <span class="cp-card-name">{c.name}</span>
          <span class="cp-card-sub">{c.pos} · {c.nflTeam}</span>
          <span class="cp-card-slot">{c.slotLabel}</span>
          <span class="cp-card-nums">
            <span class="cp-card-ovr">{c.ovr}</span>
            <span class="cp-card-num">W {c.wins}</span>
            <span class="cp-card-num">P {c.priority}</span>
          </span>
        </button>
      {/each}
    </div>
    {#if featured}
      <div class="cp-cards-feat" role="button" tabindex="-1" aria-label="Close featured card" onclick={(e) => { if (e.target === e.currentTarget) close(); }} onkeydown={(e) => { if (e.key === 'Escape') close(); }}>
        <article class="cp-cards-featcard" class:cp-tone-good={featured.tone === 'good'} class:cp-tone-bad={featured.tone === 'bad'} data-pid={featured.id} aria-label="Featured card">
          <div class="cp-cards-featclock">OVERALL {grid.overall} OF {grid.totalPicks} · {grid.onClock}</div>
          <div style="display: flex; gap: 14px; align-items: center">
            <span class="cp-card-mono" style="width: 52px; height: 52px; font-size: 1.1rem">{featured.monogram}</span>
            <div>
              <div class="cp-card-name" style="font-size: 1.3rem">{featured.name}</div>
              <div class="cp-card-sub">{featured.pos} · {featured.nflTeam}</div>
            </div>
          </div>
          <div class="cp-cards-featnums">
            <span class="cp-cards-featovr">{featured.ovr}</span>
            <span class="cp-card-num">W {featured.wins}</span>
            <span class="cp-card-num">P {featured.priority}</span>
          </div>
          <div class="cp-card-slot">SLOTS {featured.slotLabel}</div>
          {#if featured.alsoFits.length}<div class="cp-cards-featflex">{#each featured.alsoFits as f}<span>{f}</span>{/each}</div>{/if}
          <div class="cp-cards-featactions">
            <button class="cp-sharebtn" onclick={share}>SHARE PNG</button>
            <button class="cp-feedtool" onclick={close}>CLOSE</button>
            <button class="cp-pickbtn" onclick={() => { pick(featured.id, featured.slotId); close(); }}>PICK HIM</button>
            {#if shareMsg}<span class="cp-sharemsg">{shareMsg}</span>{/if}
          </div>
        </article>
      </div>
    {/if}
  {/if}
  <LineupPanel />
</section>
