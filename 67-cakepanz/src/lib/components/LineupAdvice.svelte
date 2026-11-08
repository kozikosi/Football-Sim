<!-- The lineup advice: the best lineup the current roster allows (the engine's own win math). -->
<script lang="ts">
  let { slots }: { slots: { label: string; name: string; ovr: string }[] } = $props();
</script>
<section class="cp-adv" aria-label="Lineup advice">
  <h3>Best lineup from your roster</h3>
  <ul>
    {#each slots as s}
      <li><span class="cp-sl">{s.label}</span> {s.name} <b>{s.ovr}</b></li>
    {/each}
  </ul>
</section>
<style>
  .cp-adv { border: 1px solid #3a2c31; border-radius: 12px; padding: 12px 14px; background: #1d151b; margin-top: 12px; }
  .cp-adv h3 { margin: 0 0 8px; font-size: 0.8rem; letter-spacing: 0.12em; text-transform: uppercase; color: #e8c87e; }
  .cp-adv ul { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 4px 14px; }
  .cp-sl { display: inline-block; min-width: 52px; color: #c8a48f; font-size: 0.78rem; letter-spacing: 0.06em; }
</style>
