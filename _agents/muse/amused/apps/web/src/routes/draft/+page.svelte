<script lang="ts">
	import { page } from '$app/stores';
	import { light, dark, type ThemeName } from '$lib/design/tokens.ts';
	import { packFor } from '$lib/design/team-pack.ts';
	import { rowVars } from '$lib/design/row-vars.ts';
	import { crestFor } from '$lib/design/crests.ts';
	import { Draft, ROUNDS, type Pick } from '$lib/draft/engine.ts';
	import { saveDraft } from '$lib/save.ts';
	import { goto } from '$app/navigation';
	import SiteFooter from '$lib/SiteFooter.svelte';
	import { fly, fade } from 'svelte/transition';

	const team = $derived($page.url.searchParams.get('team') || 'Kansas City Chiefs');
	let mode = $state<ThemeName>('light');

	// Draft state — created once per visit
	let draft = $state<Draft | null>(null);
	let tickerPicks = $state<Pick[]>([]);
	let browserOpen = $state(false);
	let browsing = $state(false);
	let posFilter = $state<string | null>(null);
	let done = $state(false);

	$effect(() => {
		const t = team;
		const d = new Draft(t, seed);
		d.autoAdvance();
		draft = d;
		tickerPicks = [...d.picks].slice(-8).reverse();
		browserOpen = d.isUserTurn;
	});

	function styleFor(name: string): string {
		const v = { ...(mode === 'light' ? light : dark), ...packFor(name)?.vars, ...rowVars(name) };
		return Object.entries(v)
			.map(([k, val]) => `${k}:${val}`)
			.join(';');
	}

	let pageStyle = $derived(styleFor(team));
	let crest = $derived(crestFor(team));

	function draftPlayer(p: (typeof draft)['picks'][number]['player']) {
		if (!draft) return;
		const pick = draft.userPick(p);
		if (!pick) return;
		tickerPicks = [...draft.picks].slice(-8).reverse();
		browserOpen = false;
		// let the moment land, then flow the league forward
		setTimeout(() => {
			if (!draft) return;
			draft.autoAdvance();
			tickerPicks = [...draft.picks].slice(-8).reverse();
			if (draft.done) done = true;
			else browserOpen = draft.isUserTurn;
		}, 650);
	}

	function skipAhead() {
		// auto-pick for the user until the draft ends (demo)
		if (!draft) return;
		while (!draft.done) {
			draft.autoAdvance();
			if (draft.isUserTurn) draft.userPick(draft.available()[0]);
		}
		tickerPicks = [...draft.picks].slice(-8).reverse();
		done = true;
		browserOpen = false;
	}

	function beginSeason() {
		if (!draft) return;
		saveDraft(team, seed, draft.allRosters());
		goto('/season');
	}

	let seed = $state((Math.random() * 1e9) | 0);

	let available = $derived(
		draft ? draft.available(posFilter ?? undefined, 40) : []
	);
	let myRoster = $derived(draft ? draft.rosterOf(team) : []);
	let positions = $derived(
		draft ? [...new Set(draft.available(undefined, 400).map((p) => p.pos))].sort() : []
	);

	// depth chart: roster grouped by unit, always visible
	const UNITS: [string, string[]][] = [
		['Offense', ['QB','RB','HB','FB','WR','TE']],
		['Line', ['OT','OG','C','LT','RT','LG','RG']],
		['Front', ['DE','DT','LEDG','REDG','NT','DT2']],
		['Backers', ['LB','MIKE','WILL','SAM','ILB','OLB']],
		['Secondary', ['CB','S','FS','SS','NB']],
		['Kicking', ['K','P']],
	];
	let depth = $derived(
		UNITS.map(([unit, poss]) => ({
			unit,
			players: myRoster.filter((p) => poss.includes(p.pos)),
		})).filter((g) => g.players.length > 0)
	);

	const roundName = (r: number) =>
		['One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve'][r - 1] ?? String(r);
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="room" style={pageStyle}>
	<div class="bloom" aria-hidden="true"></div>

	<!-- the working marquee: recent picks drift by -->
	{#if tickerPicks.length}
		<div class="ticker" aria-hidden="true">
			<div class="track">
				{#each [...tickerPicks, ...tickerPicks] as pk (pk.overall)}
					<span class="tick">
						{#if crestFor(pk.team)}<img src={crestFor(pk.team)} alt="" />{/if}
						<b>#{pk.overall}</b> {pk.player.name}
						<i>{pk.player.pos}</i>
					</span>
				{/each}
			</div>
		</div>
	{/if}

	<header class="mast">
		{#if crest}<img class="crest" src={crest} alt="" />{/if}
		<div>
			<h1>The Draft</h1>
			<p>
				{#if draft && !done}
					round <b>{draft.round}</b> of {ROUNDS} · pick <b>{draft.picks.length + 1}</b> of {ROUNDS * 32}
					{#if draft.isUserTurn}· <span class="yourturn">your turn</span>{/if}
				{:else if done}
					draft complete — {myRoster.length} drafted
				{/if}
			</p>
		</div>
		<button class="pill ghost" onclick={() => (mode = mode === 'light' ? 'dark' : 'light')}>
			{mode === 'light' ? 'night' : 'day'}
		</button>
	</header>

	<!-- the flow: rounds as Cinzel headers, picks as typographic rows -->
	<main class="flow">
		{#if depth.length}
			<section class="depth" in:fade>
				<h2 class="round">Depth Chart</h2>
				<div class="dgroups">
					{#each depth as g}
						<div class="dgroup">
							<span class="dunit">{g.unit}</span>
							{#each g.players as p}
								<span class="dchip"><b>{p.name}</b><i>{p.pos} · {p.ovr}</i></span>
							{/each}
						</div>
					{/each}
				</div>
			</section>
		{/if}
		{#if draft}
			{#each Array.from({ length: draft.round }, (_, ri) => ri + 1).reverse() as r}
				{@const rpicks = draft.picks.filter((p) => p.round === r).reverse()}
				{#if rpicks.length}
					<h2 class="round" in:fade>Round {roundName(r)}</h2>
					{#each rpicks as pk (pk.overall)}
						<div
							class="pickrow"
							class:mine={pk.team === team}
							class:userpick={pk.userPick}
							style={styleFor(pk.team)}
							in:fly={{ y: 14, duration: 320 }}
						>
							<span class="bleed" aria-hidden="true"></span>
							<span class="num">#{pk.overall}</span>
							<span class="who">
								<b>{pk.player.name}</b>
								<i>{pk.player.pos} · {pk.player.ovr}</i>
							</span>
							<span class="tname">{pk.team}</span>
						</div>
					{/each}
				{/if}
			{/each}
		{/if}
		{#if done}
			<div class="finale" in:fade>
				<h2>Your {team}</h2>
				<div class="roster">
					{#each myRoster as p}
						<span class="rchip"><b>{p.name}</b><i>{p.pos} · {p.ovr}</i></span>
					{/each}
				</div>
				<button class="pill cta big" onclick={beginSeason}>begin the season →</button>
			</div>
		{/if}
	</main>

	<SiteFooter />

	<!-- your turn: the browser is always mounted; it rises on your turn -->
	{#if draft && !done}
		<div class="sheet" class:up={browserOpen && draft.isUserTurn} transition:fly={{ y: 120, duration: 420 }}>
			<div class="sheetbloom" aria-hidden="true"></div>
			<div class="sheethead">
				{#if draft.isUserTurn}
					<h3>Your pick <span>#{draft.picks.length + 1}</span></h3>
					<button class="pill ghost" onclick={skipAhead}>auto-finish</button>
				{:else}
					<h3 class="waiting">Pick #{draft.picks.length + 1} · {draft.currentTeam} on the clock</h3>
					<button class="pill ghost" onclick={() => (browsing = !browsing)}>
						{browsing ? 'hide board' : 'browse'}
					</button>
				{/if}
			</div>
			{#if (browserOpen && draft.isUserTurn) || browsing}
				<div class="filters">
					<button class="fchip" class:on={!posFilter} onclick={() => (posFilter = null)}>all</button>
					{#each positions as pos}
						<button class="fchip" class:on={posFilter === pos} onclick={() => (posFilter = posFilter === pos ? null : pos)}>
							{pos}
						</button>
					{/each}
				</div>
				<div class="plist">
					{#each available as p, i (p.name + i)}
						<button class="prow" disabled={!draft.isUserTurn} onclick={() => draftPlayer(p)}>
							<b>{p.name}</b>
							<span class="pmeta"><i>{p.pos}</i><em>{p.ovr}</em></span>
						</button>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.room {
		position: relative;
		min-height: 100vh;
		background: var(--bg);
		color: var(--text);
		font-family: system-ui, sans-serif;
		overflow-x: hidden;
	}
	.bloom {
		position: fixed;
		inset: -20%;
		background:
			radial-gradient(ellipse 60% 45% at 50% 20%, var(--tGl), transparent 72%),
			radial-gradient(ellipse 40% 32% at 88% 80%, var(--tGb), transparent 72%);
		pointer-events: none;
	}
	/* working marquee */
	.ticker {
		position: relative;
		overflow: hidden;
		padding: 0.7rem 0;
		border-bottom: 1px solid var(--rosehair);
		-webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
		mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
	}
	.track { display: flex; gap: 2.4rem; width: max-content; animation: drift 60s linear infinite; }
	.tick { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; white-space: nowrap; opacity: 0.85; }
	.tick img { width: 22px; height: 22px; object-fit: contain; }
	.tick b { font-variant-numeric: tabular-nums; color: var(--sub); font-weight: 600; }
	.tick i { font-style: normal; opacity: 0.6; font-size: 0.75rem; }
	@keyframes drift { to { transform: translateX(-50%); } }

	.mast {
		position: relative;
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1.4rem 1.6rem 0.6rem;
	}
	.crest { width: 52px; height: 52px; object-fit: contain; filter: drop-shadow(0 6px 18px var(--glow)); }
	.mast h1 { font-family: 'Cinzel Decorative', serif; font-size: 1.7rem; margin: 0; }
	.mast p { margin: 0.2rem 0 0; font-size: 0.9rem; opacity: 0.75; }
	.mast b { font-variant-numeric: tabular-nums; }
	.yourturn { color: var(--b1); font-weight: 700; }
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

	/* the flow */
	.flow { position: relative; padding: 0.6rem 1.6rem 12rem; max-width: 880px; margin: 0 auto; }
	.round {
		font-family: 'Cinzel Decorative', serif;
		font-size: 1.15rem;
		margin: 1.8rem 0 0.4rem;
		color: var(--sub);
	}
	/* depth chart: your roster by unit, always visible */
	.depth { margin-bottom: 0.6rem; }
	.dgroups { display: flex; flex-direction: column; gap: 0.35rem; }
	.dgroup { display: flex; flex-wrap: wrap; gap: 0.45rem; align-items: baseline; }
	.dunit {
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		opacity: 0.55;
		min-width: 4.6rem;
	}
	.dchip {
		display: inline-flex;
		gap: 0.45rem;
		align-items: baseline;
		border-radius: 999px;
		padding: 0.32rem 0.8rem;
		background: linear-gradient(90deg, var(--zr1), transparent);
		border: 1px solid color-mix(in srgb, var(--rosehair) 55%, transparent);
		font-size: 0.8rem;
	}
	.dchip i { font-style: normal; opacity: 0.6; font-size: 0.72rem; font-variant-numeric: tabular-nums; }
	.pickrow {
		position: relative;
		display: flex;
		align-items: baseline;
		gap: 0.9rem;
		padding: 0.62rem 0.4rem 0.62rem 1rem;
		border-bottom: 1px solid color-mix(in srgb, var(--rosehair) 55%, transparent);
		background: linear-gradient(90deg, var(--zr1), transparent 65%);
	}
	/* team-color bleed: no border, the color fades in from the edge */
	.bleed {
		position: absolute;
		left: 0; top: 0; bottom: 0;
		width: 3.2rem;
		background: linear-gradient(90deg, var(--zrb), transparent);
		opacity: 0.5;
		pointer-events: none;
	}
	.num { font-variant-numeric: tabular-nums; color: var(--sub); font-size: 0.85rem; min-width: 3rem; }
	.who { display: flex; align-items: baseline; gap: 0.7rem; flex: 1; min-width: 0; }
	.who b { font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
	.who i { font-style: normal; font-size: 0.8rem; opacity: 0.65; font-variant-numeric: tabular-nums; }
	.tname { font-size: 0.78rem; opacity: 0.55; white-space: nowrap; }
	/* your picks: gold earns its moment */
	.pickrow.userpick {
		background: linear-gradient(90deg, color-mix(in srgb, var(--b2) 26%, transparent), transparent 70%);
	}
	.pickrow.userpick .who b { color: var(--b1); }

	/* the sheet: always mounted; rises gold-bloomed on your turn */
	.sheet {
		position: fixed;
		left: 0; right: 0; bottom: 0;
		max-height: 62vh;
		display: flex;
		flex-direction: column;
		border-radius: 28px 28px 0 0;
		background: color-mix(in srgb, var(--panel) 82%, transparent);
		backdrop-filter: blur(18px);
		box-shadow: 0 -18px 60px rgba(0, 0, 0, 0.25);
		z-index: 20;
		overflow: hidden;
		transform: translateY(calc(100% - 4.2rem));
		transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
	}
	.sheet.up { transform: translateY(0); }
	.sheetbloom {
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse 70% 90% at 50% 115%, var(--b2), transparent 70%);
		opacity: 0.5;
		pointer-events: none;
	}
	.sheethead {
		position: relative;
		display: flex;
		align-items: center;
		padding: 1.1rem 1.4rem 0.4rem;
	}
	.sheethead h3 { font-family: 'Cinzel Decorative', serif; margin: 0; font-size: 1.2rem; }
	.sheethead h3 span { font-variant-numeric: tabular-nums; color: var(--b1); }
	.sheethead h3.waiting { font-family: system-ui, sans-serif; font-size: 0.95rem; font-weight: 500; opacity: 0.8; }
	.sheethead .pill { margin-left: auto; }
	.filters {
		position: relative;
		display: flex;
		gap: 0.5rem;
		padding: 0.6rem 1.4rem;
		overflow-x: auto;
	}
	.fchip {
		border-radius: 999px;
		border: 1px solid var(--rosehair);
		background: transparent;
		color: var(--text);
		padding: 0.35rem 0.85rem;
		font-size: 0.8rem;
		cursor: pointer;
		white-space: nowrap;
	}
	.fchip.on { background: var(--b2); border-color: var(--b2); color: #3a2b12; font-weight: 600; }
	.plist { position: relative; overflow-y: auto; padding: 0 1.4rem 1.6rem; }
	.prow {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		width: 100%;
		padding: 0.6rem 0.2rem;
		background: none;
		border: none;
		border-bottom: 1px solid color-mix(in srgb, var(--rosehair) 45%, transparent);
		color: var(--text);
		cursor: pointer;
		text-align: left;
		font-size: 0.95rem;
	}
	.prow:disabled { cursor: default; }
	.prow:disabled:hover b { color: var(--text); }
	.prow:not(:disabled):hover b { color: var(--b1); }
	.prow b { font-weight: 600; }
	.pmeta { display: flex; gap: 0.7rem; align-items: baseline; }
	.pmeta i { font-style: normal; font-size: 0.78rem; opacity: 0.6; }
	.pmeta em { font-style: normal; font-variant-numeric: tabular-nums; font-weight: 700; color: var(--b1); }

	.finale { padding: 2rem 0; text-align: center; }
	.finale h2 { font-family: 'Cinzel Decorative', serif; }
	.cta.big { margin-top: 1.6rem; font-size: 1.05rem; padding: 0.85rem 2rem; }
	.roster { display: flex; flex-wrap: wrap; gap: 0.6rem; justify-content: center; margin-top: 1rem; }
	.rchip {
		display: inline-flex;
		gap: 0.5rem;
		align-items: baseline;
		border-radius: 999px;
		padding: 0.45rem 1rem;
		background: linear-gradient(90deg, var(--zr1), transparent);
		border: 1px solid color-mix(in srgb, var(--rosehair) 60%, transparent);
		font-size: 0.85rem;
	}
	.rchip i { font-style: normal; opacity: 0.6; font-size: 0.75rem; font-variant-numeric: tabular-nums; }

	@media (prefers-reduced-motion: reduce) {
		.track { animation: none; }
	}
</style>
