<!-- The on-clock indicator: which team is picking. -->
<script lang="ts">
  let { label }: { label: string } = $props();
</script>
<p class="cp-clock">{label}</p>
<style>
  .cp-clock { font-size: 0.8rem; letter-spacing: 0.08em; color: #d9a94c; text-transform: uppercase; }
</style>
