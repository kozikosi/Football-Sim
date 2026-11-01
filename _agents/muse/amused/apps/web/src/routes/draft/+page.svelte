<script lang="ts">
	import { page } from '$app/stores';
	import { light, dark } from '$lib/design/tokens.ts';
	import { packFor } from '$lib/design/team-pack.ts';
	import { rowVars } from '$lib/design/row-vars.ts';
	import { crestFor } from '$lib/design/crests.ts';
	import { Draft, ROUNDS, type Pick } from '$lib/draft/engine.ts';
	import { saveDraft } from '$lib/save.ts';
	import { goto } from '$app/navigation';
	import SiteFooter from '$lib/SiteFooter.svelte';
	import { theme } from '$lib/theme.svelte.ts';
	import { fly, fade } from 'svelte/transition';

	const team = $derived($page.url.searchParams.get('team') || 'Kansas City Chiefs');

	// Draft state — created once per visit
	let draft = $state<Draft | null>(null);
	let tickerPicks = $state<Pick[]>([]);
	let posFilter = $state<string | null>(null);
	let done = $state(false);
	let seed = $state((Math.random() * 1e9) | 0);

	$effect(() => {
		const t = team;
		const d = new Draft(t, seed);
		d.autoAdvance();
		draft = d;
		tickerPicks = [...d.picks].slice(-8).reverse();
		if (d.done) done = true;
	});

	function styleFor(name: string): string {
		const v = { ...(theme.current === 'light' ? light : dark), ...packFor(name)?.vars, ...rowVars(name) };
		return Object.entries(v)
			.map(([k, val]) => `${k}:${val}`)
			.join(';');
	}

	let pageStyle = $derived(styleFor(team));
	let crest = $derived(crestFor(team));
	let isUserTurn = $derived(draft ? draft.isUserTurn : false);

	function draftPlayer(p: (typeof draft)['picks'][number]['player']) {
		if (!draft || !draft.isUserTurn) return;
		const pick = draft.userPick(p);
		if (!pick) return;
		// league flows forward instantly to your next turn (or the end)
		draft.autoAdvance();
		tickerPicks = [...draft.picks].slice(-8).reverse();
		if (draft.done) done = true;
	}

	function skipAhead() {
		if (!draft) return;
		while (!draft.done) {
			draft.autoAdvance();
			if (draft.isUserTurn) draft.userPick(draft.available()[0]);
		}
		tickerPicks = [...draft.picks].slice(-8).reverse();
		done = true;
	}

	function beginSeason() {
		if (!draft) return;
		saveDraft(team, seed, draft.allRosters());
		goto('/season');
	}

	let available = $derived(draft ? draft.available(posFilter ?? undefined, 40) : []);
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
		<a class="back" href="/" aria-label="Back to home">←</a>
		{#if crest}<img class="crest" src={crest} alt="" />{/if}
		<div>
			<h1>The Draft</h1>
			<p>
				{#if draft && !done}
					round <b>{draft.round}</b> of {ROUNDS} · pick <b>{draft.picks.length + 1}</b> of {ROUNDS * 32}
					{#if isUserTurn}· <span class="yourturn">your turn</span>{/if}
				{:else if done}
					draft complete — {myRoster.length} drafted
				{/if}
			</p>
		</div>
	</header>

	<main class="flow">
		<!-- YOUR PICK: the one thing to do on this page. No popup, no layers. -->
		{#if draft && isUserTurn && !done}
			<section class="pickpanel" in:fade>
				<div class="pp-head">
					<h2>Your pick <span>#{draft.picks.length + 1}</span></h2>
					<button class="pill ghost" onclick={skipAhead}>auto-finish</button>
				</div>
				<p class="pp-hint">Tap a player to draft them. Filter by position if you like.</p>
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
						<button class="prow" onclick={() => draftPlayer(p)}>
							<b>{p.name}</b>
							<span class="pmeta"><i>{p.pos}</i><em>{p.ovr}</em></span>
						</button>
					{/each}
				</div>
			</section>
		{/if}

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
</div>

<style>
	.room {
		position: relative;
		min-height: 100vh;
		background: var(--bg);
		color: var(--text);
		font-family: system-ui, sans-serif;
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
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
		max-width: 880px;
		margin: 0 auto;
		width: 100%;
	}
	.crest { width: 52px; height: 52px; object-fit: contain; filter: drop-shadow(0 6px 18px var(--glow)); }
	.mast h1 { font-family: 'Cinzel Decorative', serif; font-size: 1.7rem; margin: 0; }
	.mast p { margin: 0.2rem 0 0; font-size: 0.9rem; opacity: 0.75; }
	.mast b { font-variant-numeric: tabular-nums; }
	.yourturn { color: var(--b1); font-weight: 700; }
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
	.flow { position: relative; padding: 0.6rem 1.6rem 3rem; max-width: 880px; margin: 0 auto; width: 100%; flex: 1; }
	.round {
		font-family: 'Cinzel Decorative', serif;
		font-size: 1.15rem;
		margin: 1.8rem 0 0.4rem;
		color: var(--sub);
	}

	/* YOUR PICK — the hero section. Gold-bloomed, impossible to miss. */
	.pickpanel {
		position: relative;
		border-radius: 24px;
		padding: 1.4rem 1.4rem 1rem;
		margin: 1rem 0 0.5rem;
		background:
			radial-gradient(ellipse 80% 100% at 50% 0%, color-mix(in srgb, var(--b2) 22%, transparent), transparent 70%),
			color-mix(in srgb, var(--panel) 70%, transparent);
		border: 1px solid color-mix(in srgb, var(--b2) 45%, transparent);
		box-shadow: 0 12px 44px color-mix(in srgb, var(--b2) 18%, transparent);
	}
	.pp-head { display: flex; align-items: center; justify-content: space-between; }
	.pp-head h2 { font-family: 'Cinzel Decorative', serif; margin: 0; font-size: 1.35rem; }
	.pp-head h2 span { font-variant-numeric: tabular-nums; color: var(--b1); }
	.pp-hint { margin: 0.35rem 0 0; font-size: 0.88rem; opacity: 0.7; }
	.filters {
		display: flex;
		gap: 0.5rem;
		padding: 0.9rem 0 0.4rem;
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
	.plist { max-height: 46vh; overflow-y: auto; padding-bottom: 0.6rem; }
	.prow {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		width: 100%;
		padding: 0.62rem 0.3rem;
		background: none;
		border: none;
		border-bottom: 1px solid color-mix(in srgb, var(--rosehair) 45%, transparent);
		color: var(--text);
		cursor: pointer;
		text-align: left;
		font-size: 0.95rem;
	}
	.prow:hover { background: linear-gradient(90deg, color-mix(in srgb, var(--b2) 14%, transparent), transparent 70%); }
	.prow:hover b { color: var(--b1); }
	.prow b { font-weight: 600; }
	.pmeta { display: flex; gap: 0.7rem; align-items: baseline; }
	.pmeta i { font-style: normal; font-size: 0.78rem; opacity: 0.6; }
	.pmeta em { font-style: normal; font-variant-numeric: tabular-nums; font-weight: 700; color: var(--b1); }

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
	.pickrow.userpick {
		background: linear-gradient(90deg, color-mix(in srgb, var(--b2) 26%, transparent), transparent 70%);
	}
	.pickrow.userpick .who b { color: var(--b1); }

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
