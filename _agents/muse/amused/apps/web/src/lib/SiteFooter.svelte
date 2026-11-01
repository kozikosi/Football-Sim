<script lang="ts">
	import { crestFor } from '$lib/design/crests.ts';
	import { TEAM_COLORS } from '$lib/design/team-colors-data.ts';

	const teams = Object.keys(TEAM_COLORS).sort();
	let ticker = $derived(teams.map((t) => ({ t, c: crestFor(t) })));

	// w52's footer tabs; only built routes link, the rest are marked soon
	const tabs = [
		{ label: 'Simulator', href: '/', live: true },
		{ label: 'Draft', href: '/draft', live: true },
		{ label: 'Season', href: '/season', live: true },
		{ label: 'Madden Rankings', href: '', live: false },
		{ label: 'Player Browser', href: '', live: false },
		{ label: 'Position Rankings', href: '', live: false },
		{ label: 'Team Comparison', href: '', live: false },
		{ label: 'Guide', href: '', live: false },
	];
</script>

<footer>
	<nav aria-label="Site">
		{#each tabs as t}
			{#if t.live}
				<a href={t.href}>{t.label}</a>
			{:else}
				<span class="soon" title="coming soon">{t.label}</span>
			{/if}
		{/each}
	</nav>
	<div class="ticker" aria-hidden="true">
		<div class="track">
			{#each [...ticker, ...ticker] as { t, c }, i (t + i)}
				{#if c}<img src={c} alt="" title={t} />{/if}
			{/each}
		</div>
	</div>
</footer>

<style>
	footer {
		position: relative;
		border-top: 1px solid color-mix(in srgb, var(--rosehair) 60%, transparent);
		padding: 1rem 0 0;
	}
	nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.4rem 1.4rem;
		padding: 0 1rem 0.8rem;
	}
	nav a, nav .soon {
		font-size: 0.82rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--text);
		opacity: 0.72;
	}
	nav a:hover { opacity: 1; color: var(--b1); }
	nav .soon { opacity: 0.35; cursor: default; }
	.ticker {
		overflow: hidden;
		padding: 0.9rem 0 1.2rem;
		-webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
		mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
	}
	.track { display: flex; gap: 2.2rem; width: max-content; animation: drift 90s linear infinite; }
	.track img { width: 30px; height: 30px; object-fit: contain; opacity: 0.5; }
	@keyframes drift { to { transform: translateX(-50%); } }
	@media (prefers-reduced-motion: reduce) {
		.track { animation: none; }
	}
</style>
