<script lang="ts">
	import { light, dark } from '$lib/design/tokens.ts';
	import { packFor } from '$lib/design/team-pack.ts';
	import { rowVars } from '$lib/design/row-vars.ts';
	import { crestFor } from '$lib/design/crests.ts';
	import { Season, WEEKS, type GameResult } from '$lib/season/engine.ts';
	import { loadDraft } from '$lib/save.ts';
	import { Draft } from '$lib/draft/engine.ts';
	import SiteFooter from '$lib/SiteFooter.svelte';
	import { theme } from '$lib/theme.svelte.ts';
	import { fly, fade } from 'svelte/transition';

	let team = $state('Kansas City Chiefs');
	let season = $state<Season | null>(null);
	let week = $state(0);                    // weeks revealed so far
	let weekResults = $state<GameResult[][]>([]);
	let playoffs = $state(false);
	let playoffGames = $state<GameResult[]>([]);

	$effect(() => {
		const saved = loadDraft();
		let rosters: Map<string, any>;
		if (saved) {
			team = saved.team;
			rosters = saved.rosters;
		} else {
			// demo fallback: quick auto-draft so the season is viewable standalone
			const d = new Draft(team, 42);
			while (!d.done) { d.autoAdvance(); if (d.isUserTurn) d.userPick(d.available()[0]); }
			rosters = d.allRosters();
		}
		season = new Season(rosters, 7);
	});

	function styleFor(name: string): string {
		const v = { ...(theme.current === 'light' ? light : dark), ...packFor(name)?.vars, ...rowVars(name) };
		return Object.entries(v).map(([k, v]) => `${k}:${v}`).join(';');
	}
	let pageStyle = $derived(styleFor(team));
	let crest = $derived(crestFor(team));

	function advance() {
		if (!season || week >= WEEKS) return;
		const w = week + 1;
		weekResults = [...weekResults, season.simWeek(w)];
		week = w;
		if (w === WEEKS) {
			setTimeout(() => {
				if (!season) return;
				playoffGames = season.simPlayoffs();
				playoffs = true;
			}, 800);
		}
	}

	let record = $derived(season ? season.recordOf(team) : { w: 0, l: 0 });
	let chase = $derived(record.l === 0 && week > 0 ? `${record.w}-0` : null);
	let standings = $derived(season && week > 0 ? season.standings().slice(0, 10) : []);
	let myGame = (w: number) =>
		weekResults[w - 1]?.find((g) => g.home === team || g.away === team);
	let won = (g: GameResult) =>
		(g.home === team && g.homeScore > g.awayScore) || (g.away === team && g.awayScore > g.homeScore);
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="season" style={pageStyle}>
	<div class="bloom" aria-hidden="true"></div>

	<header class="mast">
		<a class="back" href="/" aria-label="Back to home">←</a>
		{#if crest}<img class="crest" src={crest} alt="" />{/if}
		<div>
			<h1>The Season</h1>
			<p class="record">
				<b>{record.w}–{record.l}</b>
				{#if chase}
					<span class="chase">can you go 20-0?</span>
				{/if}
			</p>
		</div>
	</header>

	<main>
		{#if week === 0}
			<div class="kickoff" in:fade>
				<p class="kline">seventeen weeks. eight playoff teams.<br />one perfect season on the table.</p>
				<button class="pill cta big" onclick={advance}>kick off week 1 →</button>
			</div>
		{/if}

		{#each weekResults as games, wi}
			{@const w = wi + 1}
			{@const mg = myGame(w)}
			<section class="week" in:fade>
				<h2 class="weekhead">Week {w}</h2>
				{#if mg}
					<div class="showcase" class:won={won(mg)} class:lost={!won(mg)}>
						<div class="sides">
							<span class="sname" style={styleFor(mg.away)}>{mg.away}</span>
							<span class="score">{mg.awayScore} · {mg.homeScore}</span>
							<span class="sname" style={styleFor(mg.home)}>{mg.home}</span>
						</div>
						<p class="verdict">{won(mg) ? 'win' : 'loss'} — {team} {won(mg) ? 'stay' : 'fall'} {record.w}–{record.l}</p>
					</div>
				{/if}
				<div class="others">
					{#each games.filter((g) => g.home !== team && g.away !== team).slice(0, 6) as g}
						<div class="orow">
							<span>{g.away} {g.awayScore}</span>
							<span class="at">@</span>
							<span>{g.homeScore} {g.home}</span>
						</div>
					{/each}
				</div>
			</section>
		{/each}

		{#if week > 0 && week < WEEKS && !playoffs}
			<div class="continue" in:fade>
				<button class="pill cta big" onclick={advance}>continue to week {week + 1} →</button>
			</div>
		{/if}

		{#if week === WEEKS && standings.length && !playoffs}
			<section class="board" in:fade>
				<h2 class="weekhead">Standings</h2>
				{#each standings as s, i}
					<div class="srow" class:me={s.team === team}>
						<span class="rank">{i + 1}</span>
						<span class="tname">{s.team}</span>
						<span class="wl">{s.w}–{s.l}</span>
					</div>
				{/each}
				<p class="pnote">the bracket is set…</p>
			</section>
		{/if}

		{#if playoffs}
			<section class="board" in:fade>
				<h2 class="weekhead">Playoffs</h2>
				{#each playoffGames as g}
					<div class="prow" class:me={g.home === team || g.away === team}>
						{#if g.label}<span class="plabel">{g.label}</span>{/if}
						<span>{g.away} {g.awayScore} @ {g.homeScore} {g.home}</span>
					</div>
				{/each}
				{#if season?.champion}
					<div class="champ" in:fade>
						{#if crestFor(season.champion)}<img src={crestFor(season.champion)} alt="" />{/if}
						<h2 class="shimmer">{season.champion}</h2>
						<p>champions{#if season.champion === team} — 20-0. perfect.{/if}</p>
					</div>
				{/if}
			</section>
		{/if}
	</main>

	<SiteFooter />
</div>

<style>
	.season {
		position: relative;
		min-height: 100vh;
		background: var(--bg);
		color: var(--text);
		font-family: system-ui, sans-serif;
	}
	.bloom {
		position: fixed;
		inset: -20%;
		background:
			radial-gradient(ellipse 60% 45% at 50% 18%, var(--tGl), transparent 72%),
			radial-gradient(ellipse 40% 32% at 90% 82%, var(--tGb), transparent 72%);
		pointer-events: none;
	}
	.mast {
		position: relative;
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1.4rem 1.6rem 0.4rem;
	}
	.crest { width: 52px; height: 52px; object-fit: contain; filter: drop-shadow(0 6px 18px var(--glow)); }
	.mast h1 { font-family: 'Cinzel Decorative', serif; font-size: 1.7rem; margin: 0; }
	.back {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.2rem;
		height: 2.2rem;
		border-radius: 999px;
		border: 1px solid var(--rosehair);
		color: var(--text);
		text-decoration: none;
		font-size: 1.1rem;
		flex-shrink: 0;
	}
	.back:hover { border-color: var(--b2); color: var(--b1); }
	.record { margin: 0.2rem 0 0; display: flex; gap: 0.8rem; align-items: baseline; }
	.record b { font-size: 1.5rem; font-variant-numeric: tabular-nums; }
	.chase { color: var(--b1); font-weight: 700; font-size: 0.95rem; }
	.mast .pill { margin-left: auto; }
	.pill {
		border-radius: 999px;
		padding: 0.55rem 1.1rem;
		border: 1px solid var(--rosehair);
		background: color-mix(in srgb, var(--panel) 55%, transparent);
		backdrop-filter: blur(8px);
		color: var(--text);
		font-size: 0.85rem;
		cursor: pointer;
	}
	.ghost { background: transparent; }
	.cta {
		background: linear-gradient(135deg, var(--b2), var(--b4));
		color: #3a2b12;
		border: none;
		font-weight: 600;
	}
	.cta.big { font-size: 1.05rem; padding: 0.85rem 2rem; }

	main { position: relative; max-width: 880px; margin: 0 auto; padding: 0.6rem 1.6rem 6rem; }
	.kickoff { text-align: center; padding: 4rem 1rem; }
	.kline { font-size: 1.25rem; line-height: 1.7; opacity: 0.85; margin-bottom: 2rem; }

	.weekhead {
		font-family: 'Cinzel Decorative', serif;
		font-size: 1.2rem;
		color: var(--sub);
		margin: 2rem 0 0.8rem;
	}
	/* the showcase: your game floats on the bloom, no panel */
	.showcase { text-align: center; padding: 1.6rem 0; }
	.sides { display: flex; align-items: baseline; justify-content: center; gap: 1.4rem; flex-wrap: wrap; }
	.sname { font-family: 'Cinzel Decorative', serif; font-size: 1.05rem; }
	.score { font-size: 2.6rem; font-weight: 800; font-variant-numeric: tabular-nums; }
	.showcase.won .score { color: var(--b1); }
	.showcase.lost .score { opacity: 0.55; }
	.verdict { opacity: 0.7; font-size: 0.95rem; margin-top: 0.4rem; }
	.verdict::first-letter { text-transform: uppercase; }

	.others { margin-top: 0.6rem; }
	.orow {
		display: flex;
		gap: 0.8rem;
		justify-content: center;
		padding: 0.4rem 0;
		font-size: 0.85rem;
		opacity: 0.62;
		font-variant-numeric: tabular-nums;
	}
	.orow .at { opacity: 0.5; }

	.continue { text-align: center; padding: 2.4rem 0; }

	.board { padding-bottom: 2rem; }
	.srow {
		display: flex;
		gap: 1rem;
		align-items: baseline;
		padding: 0.5rem 0.2rem;
		border-bottom: 1px solid color-mix(in srgb, var(--rosehair) 45%, transparent);
	}
	.srow.me { background: linear-gradient(90deg, color-mix(in srgb, var(--b2) 22%, transparent), transparent 70%); }
	.rank { color: var(--b1); font-variant-numeric: tabular-nums; min-width: 1.6rem; font-weight: 700; }
	.tname { flex: 1; }
	.wl { font-variant-numeric: tabular-nums; font-weight: 600; }
	.pnote { text-align: center; opacity: 0.6; font-style: italic; margin-top: 1.4rem; }

	.prow {
		padding: 0.55rem 0.2rem;
		border-bottom: 1px solid color-mix(in srgb, var(--rosehair) 45%, transparent);
		font-variant-numeric: tabular-nums;
		font-size: 0.92rem;
	}
	.prow.me { color: var(--b1); font-weight: 600; }
	.plabel {
		display: inline-block;
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		opacity: 0.6;
		margin-right: 0.8rem;
	}

	.champ { text-align: center; padding: 3.5rem 0 2rem; }
	.champ img { width: 96px; height: 96px; object-fit: contain; filter: drop-shadow(0 10px 30px var(--glow)); }
	.champ h2 {
		font-family: 'Cinzel Decorative', serif;
		font-size: 2.2rem;
		margin: 1rem 0 0.4rem;
	}
	.shimmer {
		background: linear-gradient(110deg, var(--text) 30%, var(--b2) 42%, #fff8e6 50%, var(--b2) 58%, var(--text) 70%);
		background-size: 220% 100%;
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		animation: sweep 5s ease-in-out infinite;
	}
	@keyframes sweep { 0%, 100% { background-position: 120% 0; } 50% { background-position: -20% 0; } }
	.champ p { opacity: 0.75; }

	@media (prefers-reduced-motion: reduce) {
		.shimmer { animation: none; }
	}
</style>
