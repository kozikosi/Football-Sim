<script>
  import { team, setTeam } from './stores/team.js';
  import Home from './components/Home.svelte';
  import DraftBoard from './components/DraftBoard.svelte';
  let route = 'home';
</script>

<svelte:head>
  <title>Beamer V1 — 20-0</title>
</svelte:head>

<div class="shell" style="--team:{$team.primary};--team2:{$team.secondary}">
  <header class="topbar">
    <h1 class="shimmer">20-0</h1>
    <select class="team-select" value={$team.key} on:change={(e)=>setTeam(e.target.value)}>
      {#each teams as t}
        <option value={t.key}>{t.name}</option>
      {/each}
    </select>
  </header>
  <nav class="tabs">
    <button class:active={route==='home'} on:click={()=>route='home'}>Home</button>
    <button class:active={route==='draft'} on:click={()=>route='draft'}>Draft</button>
  </nav>
  <main>
    {#if route==='home'}<Home/>{:else}<DraftBoard/>{/if}
  </main>
</div>

<script context="module">
  const teams = [
    { key:'kc', name:'Kansas City Chiefs', primary:'#e31837', secondary:'#ffb81c' },
    { key:'sea', name:'Seattle Seahawks', primary:'#002244', secondary:'#69be28' },
    { key:'dal', name:'Dallas Cowboys', primary:'#003594', secondary:'#869397' },
  ];
</script>

<style>
  .shell{min-height:100vh;background:radial-gradient(ellipse at top,#1a1014 0%,#0d0a0e 60%);background-attachment:fixed;color:var(--text);padding:16px;font-family:system-ui,sans-serif}
  .topbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
  .shimmer{background:linear-gradient(90deg,var(--gold) 0%,var(--rose) 25%,#fff 50%,var(--rose) 75%,var(--gold) 100%);background-size:200% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:sh 2.5s ease-in-out infinite}
  @keyframes sh{0%{background-position:200% 0}100%{background-position:-200% 0}}
  h1{font-size:1.5rem;margin:0;display:inline-block}
  .team-select{padding:6px 10px;border:1px solid var(--border);background:var(--panel);color:var(--text);border-radius:8px;font-size:.8rem;cursor:pointer;max-width:220px}
  .tabs{display:flex;gap:6px;margin-bottom:12px}
  .tabs button{padding:6px 12px;border:1px solid var(--border);background:var(--panel);color:var(--text);border-radius:6px;cursor:pointer;font-size:.75rem;transition:all var(--motion)}
  .tabs button.active{border-color:var(--gold);color:var(--gold)}
  main{display:block}
  :global(.card){background:var(--panel);backdrop-filter:blur(8px);border:1px solid var(--border);border-radius:16px;padding:16px;margin-bottom:12px;box-shadow:0 4px 24px rgba(0,0,0,.25);transition:transform var(--motion),border-color var(--motion)}
  :global(.card:hover){border-color:var(--border-hover);transform:translateY(-1px)}
</style>
