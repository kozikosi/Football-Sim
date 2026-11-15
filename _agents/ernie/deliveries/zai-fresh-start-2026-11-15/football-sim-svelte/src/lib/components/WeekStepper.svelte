<script lang="ts">
  // WeekStepper.svelte — Part B: steps through the season week by week (prev/next, jump, the
  // week's games, the standings AFTER that week). Consumes the weekStore FACADE (`week.*`).
  import { week } from '../state/weekStore.svelte.ts';
  week.ensure();
</script>

<section>
  <div class="week-head">
    <button class="week-btn" data-testid="week-prev" onclick={() => week.prev()}>◀ PREV</button>
    <span class="week-label" data-testid="week-label">{week.view?.label}</span>
    <button class="week-btn" data-testid="week-next" onclick={() => week.next()}>NEXT ▶</button>
    <select class="week-jump" data-testid="week-jump" value={week.slot} onchange={(e) => week.go(Number((e.currentTarget as HTMLSelectElement).value))}>
      {#each Array(week.total) as _, i (i)}
        <option value={i + 1}>SLOT {i + 1}</option>
      {/each}
    </select>
  </div>
  <div class="week-games" data-testid="week-games">
    {#each week.view?.games ?? [] as g, i (i)}
      <div class="week-game" data-testid={'week-game-' + i}>
        <span class="wg-abbr">{g.awayAbbr}</span><span class="wg-num">{g.as}</span>
        <span class="wg-abbr">@</span>
        <span class="wg-num">{g.hs}</span><span class="wg-abbr">{g.homeAbbr}</span>
        <span class="wg-round">{g.round ?? g.kind}</span>
      </div>
    {/each}
  </div>
  <div class="week-standings" data-testid="standings">
    <h3>STANDINGS THROUGH WEEK {week.standings?.throughWeek}</h3>
    <div class="wst-cols">
      {#each week.standings?.divisions ?? [] as d (d.conf + d.div)}
        <div>
          <h3>{d.conf} {d.div}</h3>
          <table class="wst">
            <tbody>
              {#each d.rows as r (r.team)}
                <tr data-testid={'stand-row-' + r.abbr}>
                  <td class:clinch={week.standings?.clinched.includes(r.team)}>{r.abbr}</td>
                  <td class="num">{r.w}-{r.l}-{r.t}</td>
                  <td class="num">{r.pf}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/each}
    </div>
  </div>
</section>
