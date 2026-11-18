<!-- 67 Cakepanz · the shareables (slice 5, for real): one card per stage, each exporting as ONE
     self-contained HTML file — inline styles, no CDN, no network, provenance stamp — that opens from
     vanilla file:// offline. The preview renders the same content the export carries. -->
<script lang="ts">
  import { engineVersion, table as engineTable } from '../port/seam.ts';
  import type { SaveRecord } from '../port/seam.ts';
  import type { SeasonFacadeState } from '../port/seasonFacade.ts';
  import { draftBrag, weekBrag, seasonBrag, bracketBrag, awardsBrag, renderShare } from '../port/shareable.ts';
  import { downloadShare } from '../bindings/shareDownload.ts';
  import type { ShareStage, ShareCard } from '../port/shareable.ts';

  // season rides in as a prop (the facade state mirror): the shareables read the runState/view —
  // the bare `season` reference here crashed the whole screen (found by the acceptance run)
  let { record, stats, season }: { record: SaveRecord | null; stats: { mvp: string; mvpLine: string } | null; season: SeasonFacadeState } = $props();

  const STAGES: { id: ShareStage; label: string }[] = [
    { id: 'draft', label: 'DRAFT' }, { id: 'week', label: 'WEEK' }, { id: 'season', label: 'SEASON' },
    { id: 'bracket', label: 'BRACKET' }, { id: 'awards', label: 'AWARDS' },
  ];
  let stage = $state<ShareStage>('draft');

  let card = $derived.by((): ShareCard | null => {
    const engine = engineVersion();
    const rec = record;
    const teamName = season.userTeamName || '';
    if (stage === 'draft') {
      if (!rec) return null;
      const mine = rec.picks.filter((p) => p.team === rec.userTeam).length;
      return draftBrag({ teamName, seed: rec.seed, picks: rec.picks.length, mine, bestPick: 'your best draft pick', bestWins: '—', engine });
    }
    if (stage === 'week') {
      const g = season.view?.games.find((x) => x.home === season.userTeamName || x.away === season.userTeamName);
      if (!g || g.hs === null) return null;
      return weekBrag({ teamName, week: season.slot, label: season.label, home: g.home, away: g.away, hs: g.hs, as: g.as, meHome: g.home === season.userTeamName, gs: g.gameSeed, engine });
    }
    if (stage === 'season') {
      if (!season.runState) return null;
      const t = engineTable(season.runState)[season.userTeamName];   // the engine's table(s) — RunState has no table field
      const w = t?.w ?? 0, l = t?.l ?? 0, ti = t?.t ?? 0, pf = t?.pf ?? 0;
      return seasonBrag({ teamName, w, l, t: ti, pf, champion: season.champion ?? '', iChampion: season.champion === season.userTeamName && !!season.champion, engine });
    }
    if (stage === 'bracket') {
      if (!season.runState) return null;
      const mine = season.runState.playoffs.filter((p) => p.home === season.userTeamName || p.away === season.userTeamName);
      const last = mine.length ? mine[mine.length - 1].round ?? null : null;
      return bracketBrag({ teamName, madeIt: mine.length > 0, lastRound: last, champion: season.champion ?? '', iChampion: season.champion === season.userTeamName && !!season.champion, engine });
    }
    if (!stats) return null;
    return awardsBrag({ teamName, mvp: stats.mvp, mvpLine: stats.mvpLine, engine });
  });

  let preview = $derived(card ? renderShare(card) : null);
</script>

<section class="cp-share">
  <h2 class="cp-h2">THE SHAREABLES</h2>
  <p class="cp-note">One card per stage. Each export is one self-contained HTML file — inline styles, no network, provenance stamped — that opens offline, even from the desktop.</p>
  <div class="cp-chipline">
    {#each STAGES as s (s.id)}
      <button class="cp-navbtn" aria-pressed={stage === s.id} onclick={() => (stage = s.id)}>{s.label}</button>
    {/each}
  </div>
  {#if preview}
    <div class="cp-sharewrap">
      <iframe class="cp-shareframe" title="the shareable preview" srcdoc={preview}></iframe>
      <div class="cp-sharebtns">
        <button class="cp-stepbtn cp-cta" onclick={() => card && downloadShare(card)}>DOWNLOAD THE {stage.toUpperCase()} BRAG</button>
      </div>
    </div>
  {:else}
    <p class="cp-note">Nothing to brag about yet on this stage — play it first.</p>
  {/if}
</section>

<style>
  .cp-sharewrap { display: flex; gap: 16px; flex-wrap: wrap; align-items: flex-start; }
  .cp-shareframe { width: 420px; max-width: 100%; height: 340px; border: 1px solid var(--hairline); border-radius: var(--r-md); background: var(--panel2); }
  .cp-sharebtns { display: flex; flex-direction: column; gap: 8px; }
</style>
