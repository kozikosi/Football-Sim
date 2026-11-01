<script lang="ts">
	import { theme } from '$lib/theme.svelte.ts';
</script>

<button
	class="themetoggle"
	onclick={() => theme.toggle()}
	aria-label={theme.current === 'light' ? 'Switch to night' : 'Switch to day'}
	title={theme.current === 'light' ? 'night' : 'day'}
>
	<span class="knob" class:night={theme.current === 'dark'}></span>
</button>

<style>
	/* a slim pill riding the right edge, always there */
	.themetoggle {
		position: fixed;
		right: 0.9rem;
		top: 50%;
		transform: translateY(-50%);
		z-index: 60;
		width: 2.1rem;
		height: 3.4rem;
		border-radius: 999px;
		border: 1px solid color-mix(in srgb, var(--rosehair, #e6c3d2) 70%, transparent);
		background: color-mix(in srgb, var(--panel, #fff) 70%, transparent);
		backdrop-filter: blur(8px);
		cursor: pointer;
		padding: 0.25rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.knob {
		width: 1.3rem;
		height: 1.3rem;
		border-radius: 999px;
		background: linear-gradient(135deg, var(--b2, #d4a24e), var(--b4, #8a6a2f));
		box-shadow: 0 2px 10px var(--glow, rgba(0,0,0,0.2));
		transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s;
		transform: translateY(0);
	}
	.knob.night {
		transform: translateY(1.35rem);
		background: linear-gradient(135deg, #3a2b4a, #1e1119);
	}
	@media (max-width: 640px) {
		.themetoggle { right: 0.5rem; }
	}
</style>
