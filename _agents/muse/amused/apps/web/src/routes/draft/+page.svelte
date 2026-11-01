<script lang="ts">
	import { page } from '$app/stores';
	import { light, dark, type ThemeName } from '$lib/design/tokens.ts';
	import { packFor } from '$lib/design/team-pack.ts';
	import { rowVars } from '$lib/design/row-vars.ts';
	import { crestFor } from '$lib/design/crests.ts';
	import { Draft, ROUNDS, type Pick } from '$lib/draft/engine.ts';
	import { fly, fade } from 'svelte/transition';

	const team = $derived($page.url.searchParams.get('team') || 'Kansas City Chiefs');
	let mode = $state<ThemeName>('light');

	// Draft state — created once per visit
	let draft = $state<Draft | null>(null);
	let tickerPicks = $state<Pick[]>([]);
	let browserOpen = $state(false);
	let posFilter = $state<string | null>(null);
	let done = $state(false);

	$effect(() => {
		const t = team;
		const d = new Draft(t, (Math.random() * 1e9) | 0);
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

	let available = $derived(
		draft ? draft.available(posFilter ?? undefined, 40) : []
	);
	let myRoster = $derived(draft ? draft.rosterOf(team) : []);
	let positions = $derived(
		draft ? [...new Set(draft.available(undefined, 400).map((p) => p.pos))].sort() : []
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
			</div>
		{/if}
	</main>

	<!-- your turn: the browser rises as a sheet, gold-bloomed -->
	{#if browserOpen && draft?.isUserTurn && !done}
		<div class="sheet" transition:fly={{ y: 120, duration: 420 }}>
			<div class="sheetbloom" aria-hidden="true"></div>
			<div class="sheethead">
				<h3>Your pick <span>#{draft.picks.length + 1}</span></h3>
				<button class="pill ghost" onclick={skipAhead}>auto-finish</button>
			</div>
			<div class="filters">
				<button class="fchip" class:on={!posFilter} onclick={() => (posFilter = null)}>all</button>
				{#each positions as pos}
					<button class="fchip" class:on={posFilter === pos} onclick={() => (posFilter = posFilter === pos ? null : pos)}>
						{pos}
					</button>
				{/each}
			</div>
			<div class="plist">
				{#each available as p (p.name)}
					<button class="prow" onclick={() => draftPlayer(p)}>
						<b>{p.name}</b>
						<span class="pmeta"><i>{p.pos}</i><em>{p.ovr}</em></span>
					</button>
				{/each}
			</div>
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

	/* the flow */
	.flow { position: relative; padding: 0.6rem 1.6rem 12rem; max-width: 880px; margin: 0 auto; }
	.round {
		font-family: 'Cinzel Decorative', serif;
		font-size: 1.15rem;
		margin: 1.8rem 0 0.4rem;
		color: var(--sub);
	}
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

	/* the sheet: browser rises, gold-bloomed */
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
	}
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
	.prow:hover b { color: var(--b1); }
	.prow b { font-weight: 600; }
	.pmeta { display: flex; gap: 0.7rem; align-items: baseline; }
	.pmeta i { font-style: normal; font-size: 0.78rem; opacity: 0.6; }
	.pmeta em { font-style: normal; font-variant-numeric: tabular-nums; font-weight: 700; color: var(--b1); }

	.finale { padding: 2rem 0; text-align: center; }
	.finale h2 { font-family: 'Cinzel Decorative', serif; }
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
