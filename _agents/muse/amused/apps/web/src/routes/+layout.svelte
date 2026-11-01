<script lang="ts">
	import ThemeToggle from '$lib/ThemeToggle.svelte';
</script>

<ThemeToggle />
<slot />

<style>
	:global(html, body) {
		margin: 0;
		padding: 0;
	}
</style>
