<script lang="ts">
	import { light, dark, type ThemeName } from '$lib/design/tokens';
	import { packFor } from '$lib/design/team-pack';
	import { rowVars, neutralRowVars, anchorVars } from '$lib/design/row-vars';
	import { crestFor } from '$lib/design/crests';
	import { TEAM_COLORS } from '$lib/design/team-colors-data';

	const teams = Object.keys(TEAM_COLORS).sort();
	let team = $state('Kansas City Chiefs');
	let mode = $state<ThemeName>('light');

	let vars = $derived({
		...(mode === 'light' ? light : dark),
		...packFor(team)?.vars,
		...rowVars(team),
		...neutralRowVars(team),
		...anchorVars(team)
	});
	let crest = $derived(crestFor(team));
	let style = $derived(
		Object.entries(vars)
			.map(([k, v]) => `${k}:${v}`)
			.join(';')
	);
	let ticker = $derived(teams.map((t) => ({ t, c: crestFor(t) })));
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="stage" {style}>
	<!-- team takeover wash: a radial bloom, not a panel -->
	<div class="bloom" aria-hidden="true"></div>

	<main>
		{#if crest}<img class="crest" src={crest} alt="" />{/if}
		<h1 class="wordmark"><span class="shimmer">amused</span></h1>
		<p class="tagline">the draft, as a current — not a grid</p>

		<div class="controls">
			<label class="pill">
				<span>draft as</span>
				<select bind:value={team}>
					{#each teams as t}<option value={t}>{t}</option>{/each}
				</select>
			</label>
			<button class="pill mode" onclick={() => (mode = mode === 'light' ? 'dark' : 'light')}>
				{mode === 'light' ? 'night' : 'day'}
			</button>
			<a class="pill cta" href="#draft">draft →</a>
		</div>

		<p class="inkline">
			round one flows · the ink is <em style="color:var(--tn)">halfway rose</em> ·
			gold only where it matters
		</p>
	</main>

	<!-- crest ticker: the league drifts by -->
	<div class="ticker" aria-hidden="true">
		<div class="track">
			{#each [...ticker, ...ticker] as { t, c }}
				{#if c}<img src={c} alt="" title={t} />{/if}
			{/each}
		</div>
	</div>
</div>

<style>
	.stage {
		position: relative;
		min-height: 100vh;
		overflow: hidden;
		background: var(--bg);
		color: var(--text);
		font-family: system-ui, sans-serif;
		display: flex;
		flex-direction: column;
	}
	/* the takeover: your franchise's color breathing behind everything.
	   KG's rule: no blank neutral space — every surface wears team colour
	   (homepage rose-and-gold before a team is chosen). */
	.bloom {
		position: absolute;
		inset: -20%;
		background:
			radial-gradient(ellipse 65% 50% at 50% 32%, var(--tGl), transparent 72%),
			radial-gradient(ellipse 45% 38% at 82% 78%, var(--tGb), transparent 72%),
			radial-gradient(ellipse 45% 38% at 18% 72%, var(--tGa), transparent 72%);
		pointer-events: none;
		transition: background 0.8s ease;
	}
	main {
		position: relative;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 2rem;
	}
	.crest {
		width: 84px;
		height: 84px;
		object-fit: contain;
		filter: drop-shadow(0 8px 24px var(--glow));
		animation: float 7s ease-in-out infinite;
	}
	@keyframes float {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-10px); }
	}
	.wordmark {
		font-family: 'Cinzel Decorative', 'Didot', serif;
		font-weight: 900;
		font-size: clamp(3rem, 10vw, 6.5rem);
		margin: 0.5rem 0 0;
		line-height: 1;
	}
	/* gold shimmer sweeping the wordmark — w52's signature motion */
	.shimmer {
		background: linear-gradient(
			110deg,
			var(--text) 30%,
			var(--b2) 42%,
			#fff8e6 50%,
			var(--b2) 58%,
			var(--text) 70%
		);
		background-size: 220% 100%;
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		animation: sweep 6s ease-in-out infinite;
	}
	@keyframes sweep {
		0%, 100% { background-position: 120% 0; }
		50% { background-position: -20% 0; }
	}
	.tagline {
		font-size: 1.05rem;
		opacity: 0.75;
		margin: 0.75rem 0 0;
		font-style: italic;
	}
	.controls {
		display: flex;
		gap: 0.8rem;
		margin-top: 2rem;
		flex-wrap: wrap;
		justify-content: center;
	}
	/* pills, never boxes */
	.pill {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		border-radius: 999px;
		padding: 0.65rem 1.3rem;
		border: 1px solid var(--rosehair);
		background: color-mix(in srgb, var(--panel) 55%, transparent);
		backdrop-filter: blur(8px);
		color: var(--text);
		font-size: 0.95rem;
		cursor: pointer;
		text-decoration: none;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}
	.pill:hover { transform: translateY(-2px); box-shadow: 0 6px 20px var(--glow); }
	.pill select {
		background: transparent;
		border: none;
		color: var(--text);
		font: inherit;
		cursor: pointer;
		max-width: 11rem;
	}
	.pill span { opacity: 0.65; font-size: 0.85rem; }
	.cta {
		background: linear-gradient(135deg, var(--b2), var(--b4));
		color: #3a2b12;
		border: none;
		font-weight: 600;
	}
	.inkline { margin-top: 2rem; opacity: 0.7; font-size: 0.95rem; }
	.inkline em { font-style: normal; font-weight: 600; }
	/* the league drifts by, slow */
	.ticker {
		position: relative;
		overflow: hidden;
		padding: 1.2rem 0 1.6rem;
		-webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
		mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
	}
	.track {
		display: flex;
		gap: 2.2rem;
		width: max-content;
		animation: drift 90s linear infinite;
	}
	.track img { width: 34px; height: 34px; object-fit: contain; opacity: 0.55; }
	@keyframes drift {
		to { transform: translateX(-50%); }
	}
	@media (prefers-reduced-motion: reduce) {
		.shimmer, .crest, .track { animation: none; }
	}
</style>
