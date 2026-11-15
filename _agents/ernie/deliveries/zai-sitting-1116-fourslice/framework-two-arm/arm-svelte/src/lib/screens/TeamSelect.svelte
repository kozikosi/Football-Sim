<!-- Slice 3 — team select: the 32 teams in the engine's real alignment; the choice persists
     (localStorage under the sport's own key, loaded at boot); picking one STARTs a fresh real
     draft for that team and re-derives the feed (the pool re-renders for the choice). -->
<script lang="ts">
  import { chooseTeam, draftSnap, teams } from '../appStore.svelte.ts';
  import type { TeamRow } from '../bootData.ts';

  const groups = $derived.by(() => {
    const g: { conf: string; div: string; teams: TeamRow[] }[] = [];
    for (const t of teams) {
      const last = g[g.length - 1];
      if (!last || last.conf !== t.conf || last.div !== t.div) g.push({ conf: t.conf, div: t.div, teams: [t] });
      else last.teams.push(t);
    }
    return g;
  });
  const current = $derived(draftSnap().record?.userTeam ?? null);
</script>

<section class="cp-screen" aria-label="Team select">
  <h3 class="cp-title">PICK YOUR TEAM</h3>
  <p class="cp-screen-note">The league's 32 teams, the engine's real alignment. The choice persists; the draft board and the feed re-render for it.</p>
  <div class="cp-team-groups">
    {#each groups as g (g.conf + g.div)}
      <div class="cp-team-div">
        <div class="cp-team-divname">{g.conf} {g.div}</div>
        <div class="cp-team-grid">
          {#each g.teams as t (t.i)}
            <button class="cp-teambtn" class:cp-on={t.i === current} aria-pressed={t.i === current} onclick={() => chooseTeam(t.i)}>{t.name}</button>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</section>
