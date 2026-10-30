<script>
  import { team, setTeam, teams } from '../stores/team.js';
  const list = Object.values(teams);
</script>

<div class="picker">
  <label for="team-sel">Team</label>
  <select id="team-sel" value={$team.key} on:change={(e)=>setTeam(e.target.value)}>
    {#each list as t}
      <option value={t.key}>{t.name}</option>
    {/each}
  </select>
  <span class="hint">Tints the whole site</span>
</div>

<style>
  .picker{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:8px 0 14px}
  label{font-size:.7rem;text-transform:uppercase;letter-spacing:.06em;color:var(--sub)}
  select{padding:8px 12px;border:1px solid var(--border);background:var(--panel);color:var(--text);border-radius:10px;font-size:.8rem;cursor:pointer;backdrop-filter:blur(8px);transition:all var(--motion);max-width:260px}
  select:hover{border-color:var(--border-hover)}
  select:focus{outline:none;border-color:var(--gold);box-shadow:0 0 0 2px var(--gold)}
  .hint{font-size:.65rem;color:var(--muted);font-style:italic}
</style>
