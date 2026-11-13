<script lang="ts">
	import {
		state, TEAM_SLOTS, FOCUS_LIST, VERSION_TAG, effectiveFocus, board, kickoff,
		halftimeOptions, changeFocusAtHalftime, finish, autoDecisions, arrowFor,
	} from './lib/state.svelte';
	import { focusById } from './engine-contract/index.ts';

	const label = (id: string) => focusById(id).label;
</script>

<main>
	<h1>Framework Test — Offensive Focus <span class="tag">SvelteKit · focus {VERSION_TAG}</span></h1>

	<section data-testid="setup">
		<h2>1 · Pre-game</h2>
		<label class="manage">
			<input type="checkbox" bind:checked={state.manageOn} data-testid="manage-toggle" />
			Manage focus (off = auto — the engine picks, no halftime prompt)
		</label>
		{#if state.manageOn}
			<div class="cards" role="radiogroup" aria-label="offensive focus">
				{#each FOCUS_LIST as f (f.id)}
					<button
						class="card"
						class:selected={state.picked === f.id}
						data-testid="focus-{f.id}"
						onclick={() => (state.picked = f.id)}
					>
						<strong>{f.label}</strong>
						<span>{f.blurb}</span>
					</button>
				{/each}
			</div>
		{:else}
			<p data-testid="auto-pick">Auto mode — the engine picks: <strong>{label(effectiveFocus())}</strong></p>
		{/if}
		<button class="primary" onclick={kickoff} data-testid="kickoff">Kickoff</button>
	</section>

	{#if state.phase !== 'pregame'}
		<section data-testid="halftime">
			<h2>2 · Halftime</h2>
			{#if state.manageOn && !state.halftimeUsed && state.phase === 'halftime' && effectiveFocus() && halftimeOptions().includes(effectiveFocus())}
				<p>One change available. Current: <strong>{label(effectiveFocus())}</strong>.</p>
				<div class="cards">
					{#each halftimeOptions() as id (id)}
						<button
							class="card"
							class:selected={id === effectiveFocus()}
							data-testid="halftime-{id}"
							onclick={() => changeFocusAtHalftime(id)}
						>{label(id)}</button>
					{/each}
				</div>
				{#if state.note}<p class="note">{state.note}</p>{/if}
				<button class="primary" onclick={finish} data-testid="continue">Continue</button>
			{:else}
				<p data-testid="no-halftime">Auto mode — no halftime prompt{state.halftimeUsed ? ' (change used)' : ''}.</p>
				{#if state.note}<p class="note">{state.note}</p>{/if}
				<button class="primary" onclick={finish} data-testid="continue">Continue</button>
			{/if}
		</section>
	{/if}

	<section data-testid="board">
		<h2>The draft board <span class="tag">focus: {label(effectiveFocus())}</span></h2>
		<p class="law">Wins are the static truth — the focus moves Priority only.</p>
		<table>
			<thead><tr><th>Slot</th><th>OVR</th><th>Wins</th><th>Priority</th><th>Form</th></tr></thead>
			<tbody>
				{#each board() as r (r.slot)}
					<tr data-testid="row-{r.slot}">
						<td>{r.slot}</td>
						<td>{TEAM_SLOTS[r.slot]}</td>
						<td>{r.wins.toFixed(2)}</td>
						<td class="priority" data-testid="priority-{r.slot}">{r.priority}</td>
						<td>
							{#if arrowFor(r.slot)}
								<span
									class="arrow {arrowFor(r.slot)}"
									title={arrowFor(r.slot)}
									aria-label="form: {arrowFor(r.slot)}"
								></span>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>

	{#if state.sim}
		<section data-testid="game">
			<h2>3 · The game</h2>
			<p class="score" data-testid="score">
				Home <strong>{state.sim.result.homeScore}</strong> — <strong>{state.sim.result.awayScore}</strong> Away
				<span class="tag">Q4-start diff {state.sim.q4StartDiff}</span>
			</p>
			{#if state.sim.focusLog.length}
				<h3>4th-quarter automatics (fired)</h3>
				<ul data-testid="fired">
					{#each state.sim.focusLog as d (d.key)}
						<li>
							<strong>{d.label}</strong> — {d.detail}
							{#if !d.appliedInSim}<span class="tag">reported to the engine layer</span>{/if}
						</li>
					{/each}
				</ul>
				{#if state.sim.focusLog.some((d) => d.key === 'strat-override') && focusById(effectiveFocus()).offPlan.strat !== 'pass'}
					<p class="note" data-testid="precedence">
						Precedence: the user's focus (<strong>{label(effectiveFocus())}</strong>) stays selected; the
						automatic's tendency applies on top for the overridden plan. The user is never silently re-picked.
					</p>
				{/if}
			{:else}
				<p data-testid="no-automatics">No automatics fired (Q4-start diff {state.sim.q4StartDiff}).</p>
			{/if}
			<h3>Box score</h3>
			<table class="box">
				<thead><tr><th></th><th>Rush yds</th><th>Pass yds</th><th>Plays</th><th>Give</th><th>Take</th><th>Sacks</th></tr></thead>
				<tbody>
					<tr><th>Home</th><td>{state.sim.result.stats.home.rush}</td><td>{state.sim.result.stats.home.pass}</td><td>{state.sim.result.stats.home.plays}</td><td>{state.sim.result.stats.home.giveaways}</td><td>{state.sim.result.stats.home.takeaways}</td><td>{state.sim.result.stats.home.sacksTaken}</td></tr>
					<tr><th>Away</th><td>{state.sim.result.stats.away.rush}</td><td>{state.sim.result.stats.away.pass}</td><td>{state.sim.result.stats.away.plays}</td><td>{state.sim.result.stats.away.giveaways}</td><td>{state.sim.result.stats.away.takeaways}</td><td>{state.sim.result.stats.away.sacksTaken}</td></tr>
				</tbody>
			</table>
		</section>
	{/if}
</main>

<style>
	main { max-width: 860px; margin: 0 auto; font-family: system-ui, sans-serif; padding: 1rem 1.25rem 3rem; color: #16211b; }
	h1 { font-size: 1.35rem; } h2 { font-size: 1.1rem; margin-top: 1.6rem; } h3 { font-size: 1rem; }
	.tag { font-size: 0.75rem; color: #5b6b60; background: #eef2ef; border-radius: 4px; padding: 2px 7px; margin-left: 8px; }
	.cards { display: flex; gap: 8px; flex-wrap: wrap; margin: 0.75rem 0; }
	.card { flex: 1 1 150px; text-align: left; padding: 10px 12px; border: 1px solid #c8d2cb; border-radius: 8px; background: #fff; cursor: pointer; display: flex; flex-direction: column; gap: 4px; }
	.card.selected { border-color: #1f7a3f; outline: 2px solid #1f7a3f33; background: #f2f8f4; }
	.primary { background: #1f7a3f; color: #fff; border: 0; border-radius: 8px; padding: 9px 18px; font-size: 1rem; cursor: pointer; margin-top: 0.5rem; }
	.manage { display: flex; gap: 8px; align-items: center; }
	.law { color: #5b6b60; font-size: 0.85rem; margin-top: 0; }
	table { width: 100%; border-collapse: collapse; font-size: 0.92rem; }
	th, td { text-align: left; padding: 5px 8px; border-bottom: 1px solid #e4e9e5; }
	td.priority { font-weight: 700; }
	.arrow { display: inline-block; width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; }
	.arrow.hot { border-bottom: 9px solid #1f9d55; }
	.arrow.cold { border-top: 9px solid #c0392b; transform: rotate(180deg); }
	.score { font-size: 1.15rem; }
	.note { background: #fdf6e3; border: 1px solid #ecd9a0; padding: 8px 10px; border-radius: 6px; font-size: 0.9rem; }
	ul { padding-left: 1.1rem; } li { margin: 4px 0; }
</style>
