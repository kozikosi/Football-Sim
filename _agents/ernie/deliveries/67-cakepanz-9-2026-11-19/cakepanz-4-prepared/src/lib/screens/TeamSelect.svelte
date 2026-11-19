<!-- 67 Cakepanz · slice 2 + P-317 — Team Select: the user picks their team AND their draft position
     (slot 1–32) on the SAME screen, with the same look (the standing Owner requirement).
     Engine-derived facts only (the league's real alignment): no ratings are generated, no engine state
     is invented. The choice flows into the Draft Board: the chosen team is the team that drafts.
     THE SEAM: the engine's newDraft already takes an ORDER parameter — the picker builds that order
     (the user's team first at the chosen slot; the rest snake). The STORE's order support is the
     Architect's piece (P-317 store change): until it lands, the store starts with its default snake
     and the screen says so plainly — no engine internals guessed, no engine math copied. -->
<script lang="ts">
  import { TEAMS, DIVS, divisionTeams, TEAM_BY_NAME, snakeOrder } from '../port/seam.ts';
  import type { Conf } from '../port/seam.ts';
  import { valuation, MODE_LABEL } from '../../lib/valuation.ts';

  let { onstart }: { onstart: (teamIndex: number, slot: number | null) => void } = $props();
  let chosen = $state<string | null>(null);
  let chosenSlot = $state<number | null>(null);          // 1..32; null = let the league order decide
  let chosenIndex = $derived(chosen == null ? -1 : TEAMS.findIndex((t) => t.name === chosen));
  let detail = $derived(chosen == null ? null : TEAM_BY_NAME[chosen]);
  let rivals = $derived(chosen == null || !detail ? [] : divisionTeams(detail.conf, detail.div).filter((n) => n !== detail!.name));
  let orderPreview = $derived(chosenIndex < 0 ? null : orderWith(chosenIndex, chosenSlot));

  /** The P-317 order: the FULL 1,024-pick sequence (32 rounds), round 1 re-ordered so the user's
      team drafts at their chosen slot; the displaced team takes the vacated natural position;
      rounds 2-32 keep the engine's own snake. */
  function orderWith(userTeam: number, slot: number | null): number[] {
    const base = snakeOrder();
    if (slot === null) return base;
    const r1 = base.slice(0, 32);
    const rest = r1.filter((t) => t !== userTeam);
    for (let i = 0; i < 32; i++) r1[i] = i + 1 === slot ? userTeam : -1;
    let k = 0;
    for (let i = 0; i < 32; i++) if (r1[i] === -1) r1[i] = rest[k++]!;
    return [...r1, ...base.slice(32)];
  }

  function start() {
    if (chosenIndex < 0) return;
    onstart(chosenIndex, chosenSlot);
  }
</script>

<section class="cp-ts">
  <h1 class="cp-ts-title">Pick your team</h1>
  <!-- Part D-2 (cakepanz-6): w89's own slogan line (w89.html:2932), the home screen's brand line -->
  <p class="cp-cygline"><span class="cp-cygt">Can you go </span><b class="cp-shine">20-0</b><b class="cp-shine" style="font-size:1.1em;">?</b></p>
  <p class="cp-prov">Every number you will see on this board reads <b>{MODE_LABEL[valuation.get().mode]}</b> — the label travels with the numbers.</p>

  {#each ['AFC', 'NFC'] as conf (conf)}
    <h2 class="cp-ts-conf">{conf}</h2>
    <div class="cp-ts-divs">
      {#each DIVS as div (div)}
        <div class="cp-ts-div">
          <h3>{conf} {div}</h3>
          {#each divisionTeams(conf as Conf, div) as name (name)}
            {@const idx = TEAMS.findIndex((t) => t.name === name)}
            <button class="cp-ts-team" class:cp-on={chosen === name} onclick={() => (chosen = name)} aria-pressed={chosen === name}>{name}</button>
          {/each}
        </div>
      {/each}
    </div>
  {/each}

  {#if detail}
    <aside class="cp-ts-detail" aria-live="polite">
      <h3>{detail.name}</h3>
      <p class="cp-ts-meta">{detail.conf} {detail.div}</p>
      <p class="cp-ts-rivals"><b>Division rivals:</b> {rivals.join(' · ')}</p>
      <p class="cp-ts-note">You draft as this team: the board's on-clock indicator, your picks and your roster are all {detail.name}'s.</p>

      <h4 class="cp-ts-sloth">Your draft position</h4>
      <div class="cp-ts-slots" role="group" aria-label="Pick your draft position">
        {#each Array(32) as _, i (i)}
          <button
            class="cp-ts-slot"
            class:cp-on={chosenSlot === i + 1}
            class:cp-nat={chosenIndex === i}
            aria-pressed={chosenSlot === i + 1}
            onclick={() => (chosenSlot = chosenSlot === i + 1 ? null : i + 1)}
          >{i + 1}</button>
        {/each}
      </div>
      <p class="cp-ts-note">
        {#if chosenSlot === null}
          No position chosen — the league's standard order decides. Slot <b>{chosenIndex + 1}</b> is this team's natural first pick.
        {:else}
          You pick <b>{chosenSlot}</b>{chosenSlot === chosenIndex + 1 ? ' — this team\'s natural spot' : ''} first.
          The engine's draft order supports this today; the STORE's slot wiring is the Architect's piece (P-317, filed — no engine internals guessed here).
        {/if}
      </p>
      {#if orderPreview && chosenSlot !== null}
        <p class="cp-sub cp-ts-order">Order preview (first 6): {orderPreview.slice(0, 6).map((t) => TEAMS[t].name).join(' · ')}</p>
      {/if}
      <button class="cp-ts-go" onclick={start}>DRAFT AS {detail.name.toUpperCase()}{chosenSlot ? ` · SLOT ${chosenSlot}` : ''}</button>
    </aside>
  {:else}
    <aside class="cp-ts-detail cp-ts-idle" aria-live="polite">
      <p class="cp-ts-note">Select one of the 32 teams to see its details, choose a draft position, and start the draft.</p>
    </aside>
  {/if}
</section>

<style>
  .cp-ts { border: 1px solid var(--hairline); border-radius: 12px; padding: 18px; background: var(--panel); }
  .cp-ts-title { margin: 0 0 4px; color: var(--gold2); letter-spacing: 0.1em; font-size: 1.3rem; }
  .cp-ts-conf { margin: 14px 0 6px; color: var(--sub); letter-spacing: 0.16em; font-size: 0.85rem; }
  .cp-ts-divs { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 10px; }
  .cp-ts-div { border: 1px solid var(--hairline); border-radius: 10px; padding: 8px 10px; background: var(--panel2); }
  .cp-ts-div h3 { margin: 0 0 6px; font-size: 0.72rem; letter-spacing: 0.14em; color: var(--goldm); text-transform: uppercase; }
  .cp-ts-team { display: block; width: 100%; text-align: left; margin: 2px 0; padding: 6px 10px; border-radius: 999px;
    border: 1px solid var(--hairline); background: transparent; color: var(--zcream); font-family: inherit; font-size: 0.88rem; cursor: pointer; }
  .cp-ts-team:hover { background: color-mix(in srgb, var(--goldm) 10%, transparent); }
  .cp-ts-team.cp-on { background: color-mix(in srgb, var(--goldm) 20%, transparent); border-color: var(--goldm); font-weight: 800; }
  .cp-ts-detail { margin-top: 16px; border: 1px solid var(--gold3); border-radius: 12px; padding: 14px 16px; background: color-mix(in srgb, var(--goldm) 7%, var(--panel)); }
  .cp-ts-idle { border-color: var(--hairline); background: transparent; }
  .cp-ts-detail h3 { margin: 0 0 4px; color: var(--gold2); letter-spacing: 0.06em; }
  .cp-ts-meta, .cp-ts-rivals, .cp-ts-note { margin: 3px 0; color: var(--sub); font-size: 0.86rem; }
  .cp-ts-rivals b { color: var(--zcream); }
  .cp-ts-note { color: var(--zcream); }
  .cp-ts-note b { color: var(--gold2); }
  .cp-ts-sloth { margin: 12px 0 6px; color: var(--sub); font-size: 0.68rem; letter-spacing: 0.16em; text-transform: uppercase; }
  .cp-ts-slots { display: flex; flex-wrap: wrap; gap: 4px; }
  .cp-ts-slot { width: 34px; height: 30px; border-radius: 8px; border: 1px solid var(--hairline); background: transparent;
    color: var(--zcream); font-family: inherit; font-size: 0.78rem; cursor: pointer; font-variant-numeric: tabular-nums; }
  .cp-ts-slot:hover { background: color-mix(in srgb, var(--goldm) 12%, transparent); }
  .cp-ts-slot.cp-nat { border-style: dashed; border-color: var(--goldm); color: var(--goldm); }
  .cp-ts-slot.cp-on { background: color-mix(in srgb, var(--goldm) 26%, transparent); border-color: var(--gold2); color: var(--gold2); font-weight: 800; }
  .cp-ts-order { margin-top: 6px; }
  .cp-ts-go { margin-top: 10px; padding: 9px 22px; border-radius: 999px; border: 0; cursor: pointer;
    background: color-mix(in srgb, var(--goldm) 24%, transparent); color: var(--zcream); font-family: inherit; font-weight: 800; letter-spacing: 0.08em; font-size: 0.95rem; }
  .cp-ts-go:hover { background: color-mix(in srgb, var(--goldm) 34%, transparent); }
</style>
