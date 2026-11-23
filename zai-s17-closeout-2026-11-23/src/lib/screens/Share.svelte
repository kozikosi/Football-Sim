<!-- 67 Cakepanz · the shareables (slice 5, for real): one card per stage, each exporting as ONE
     self-contained HTML file — inline styles, no CDN, no network, provenance stamp — that opens from
     vanilla file:// offline. The preview renders the same content the export carries. -->
<script lang="ts">
  import { engineVersion, table as engineTable } from '../port/seam.ts';
  import type { SaveRecord } from '../port/seam.ts';
  import type { SeasonFacadeState } from '../port/seasonFacade.ts';
  import { draftBrag, weekBrag, seasonBrag, bracketBrag, awardsBrag, renderShare } from '../port/shareable.ts';
  import { seasonBragText, cardBragText, hasBragLink } from '../port/bragText.ts';   // S15 §4.8: the P-209 copy-paste brag (the download binding is deleted)
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

  // S15 §4.8 (P-209): the brag TEXT — what the user pastes. The season stage uses the Owner's
  // template ("I went X-Y and [result] with [team]. Can you go undefeated? [link]"); the other
  // stages paste their card's prose (tags stripped, the seed-bearing stamp dropped).
  const seasonRec = $derived.by(() => {
    if (!season.runState || !season.userTeamName) return { w: 0, l: 0, t: 0 };
    const t = engineTable(season.runState)[season.userTeamName];   // the engine's table(s) — RunState has no table field
    return { w: t?.w ?? 0, l: t?.l ?? 0, t: t?.t ?? 0 };
  });
  let bragText = $derived.by(() => {
    if (!card) return '';
    if (stage === 'season' && season.runState) {
      const champion = season.champion === season.userTeamName && !!season.champion;
      const mine = season.runState.playoffs.filter((p) => p.home === season.userTeamName || p.away === season.userTeamName);
      const result = champion ? 'won the Super Bowl' : mine.length ? `reached the ${mine[mine.length - 1].round ?? 'Wild Card'}` : 'missed the playoffs';
      return seasonBragText({ w: seasonRec.w, l: seasonRec.l, t: seasonRec.t, teamName: season.userTeamName || '', result });
    }
    return cardBragText(card);
  });

  // one tap → clipboard → confirmation toast; when the clipboard refuses, the toast points at the
  // selectable text block below (P-209: the fallback is the text itself, never a download).
  let copied = $state('');
  let copyTimer: ReturnType<typeof setTimeout> | null = null;
  async function copyBrag() {
    if (!bragText) return;
    try {
      await navigator.clipboard.writeText(bragText);
      copied = 'Copied — paste it anywhere.';
    } catch {
      copied = 'Copy failed — select the text below and copy it by hand.';
    }
    if (copyTimer) clearTimeout(copyTimer);
    copyTimer = setTimeout(() => { copied = ''; }, 2600);
  }
</script>

<section class="cp-share">
  <h2 class="cp-h2">THE SHAREABLES</h2>
  <p class="cp-note">One card per stage. The share is a copy-paste brag — text only, no downloads, no files, no save data, no seed (P-209). The season brag carries the link to the live game once it ships.</p>
  <div class="cp-chipline">
    {#each STAGES as s (s.id)}
      <button class="cp-navbtn" aria-pressed={stage === s.id} onclick={() => (stage = s.id)}>{s.label}</button>
    {/each}
  </div>
  {#if preview}
    <div class="cp-sharewrap">
      <iframe class="cp-shareframe" title="the shareable preview" srcdoc={preview}></iframe>
      <div class="cp-sharebtns">
        {#if stage !== 'season' || hasBragLink()}
          <!-- S15 §4.8 (P-209): the season brag carries the build-time link — the button HIDES while
               the constant is unset, so a pre-make-live build never ships a broken link. -->
          <button class="cp-stepbtn cp-cta" onclick={copyBrag}>COPY THE {stage.toUpperCase()} BRAG</button>
        {/if}
        <p class="cp-bragtext">{bragText}</p>
        {#if copied}<p class="cp-copytoast" role="status" aria-live="polite">{copied}</p>{/if}
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
  .cp-bragtext { margin: 0; padding: 10px 12px; border: 1px dashed var(--hairline); border-radius: 10px; color: var(--zcream); font-size: 0.9rem; overflow-wrap: anywhere; user-select: text; }
  .cp-copytoast { margin: 0; color: var(--good); font-size: 0.82rem; }
</style>
