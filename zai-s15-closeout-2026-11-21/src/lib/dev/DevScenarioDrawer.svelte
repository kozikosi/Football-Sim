<script lang="ts">
  import type { ScenarioId, ScenarioSnapshot } from './scenario.ts';

  let { onrun, title = 'Build & Proof' }: {
    onrun: (id: ScenarioId) => Promise<ScenarioSnapshot>;
    title?: string;
  } = $props();

  let selected = $state<ScenarioId>('board-top-three');
  let snapshot = $state<ScenarioSnapshot | null>(null);
  let busy = $state(false);
  let failure = $state('');

  const choices: { id: ScenarioId; label: string }[] = [
    { id: 'board-top-three', label: 'Board · top three' },
    { id: 'share-paste', label: 'Share · paste text' },
    { id: 'finished-draft', label: 'Draft · complete' },
  ];

  async function load() {
    busy = true;
    failure = '';
    try {
      snapshot = await onrun(selected);
    } catch (error) {
      snapshot = null;
      failure = error instanceof Error ? error.message : String(error);
    } finally {
      busy = false;
    }
  }
</script>

<aside class="cp-dev-scenarios" aria-label={title} data-testid="cp-dev-scenarios">
  <details>
    <summary>{title}</summary>
    <div class="cp-dev-body">
      <label>
        Scenario
        <select bind:value={selected}>
          {#each choices as choice (choice.id)}
            <option value={choice.id}>{choice.label}</option>
          {/each}
        </select>
      </label>
      <button type="button" onclick={load} disabled={busy}>
        {busy ? 'Building…' : 'Load scenario'}
      </button>
      {#if failure}<p role="alert">{failure}</p>{/if}
      {#if snapshot}
        <p class="cp-dev-meta">{snapshot.scenarioId} · seed {snapshot.seedCode} · {snapshot.engineVersion}</p>
        {#if snapshot.board}
          <ol>
            {#each snapshot.suggestedIds as id (id)}
              <li>{snapshot.board.rows.find((row) => row.id === id)?.name ?? id}</li>
            {/each}
          </ol>
        {/if}
        {#if snapshot.shareText}
          <pre>{snapshot.shareText}</pre>
          <button type="button" onclick={() => navigator.clipboard.writeText(snapshot?.shareText ?? '')}>Copy paste text</button>
        {/if}
        {#if snapshot.status === 'done'}
          <p>Completed draft: {snapshot.record?.picks.length ?? 0} / 1,024 picks.</p>
        {/if}
      {/if}
    </div>
  </details>
</aside>

<style>
  .cp-dev-scenarios { position: fixed; z-index: 1000; right: 12px; bottom: 12px; width: min(340px, calc(100vw - 24px)); color: #f5eadc; background: #211a20; border: 1px solid #a98a50; border-radius: 12px; box-shadow: 0 8px 30px #0008; font: 13px/1.45 system-ui, sans-serif; }
  summary { cursor: pointer; padding: 10px 12px; color: #e5c477; font-weight: 700; }
  .cp-dev-body { display: grid; gap: 9px; padding: 0 12px 12px; }
  label { display: grid; gap: 4px; }
  select, button { min-height: 34px; border: 1px solid #806b4a; border-radius: 7px; padding: 6px 9px; color: inherit; background: #30262d; font: inherit; }
  button { cursor: pointer; color: #f4d58b; }
  button:disabled { opacity: .55; cursor: wait; }
  .cp-dev-meta { overflow-wrap: anywhere; color: #c7b9a8; }
  ol { margin: 0; padding-left: 22px; }
  pre { margin: 0; padding: 8px; overflow-wrap: anywhere; white-space: pre-wrap; background: #171217; border-radius: 7px; }
</style>
