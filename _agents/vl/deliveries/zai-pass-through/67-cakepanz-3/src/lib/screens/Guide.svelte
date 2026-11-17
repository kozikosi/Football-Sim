<!-- 67 Cakepanz · the Guide: "How this works" — the honest statement of what the engine does, written
     plain, integers, no promises. Reduced-motion respected (the shell's global law). -->
<script lang="ts">
  import { engineVersion, WINS_PER_UNIT } from '../port/seam.ts';
</script>

<section class="cp-guide">
  <h2 class="cp-h2">HOW THIS WORKS</h2>
  <p class="cp-note">76 Pancakes is a draft simulator: you draft real players for one of the 32 teams, the other 31 teams draft against you, and then the engine plays a full 22-week season — every game, every drive — from the rosters the draft produced. Nothing on any screen is a promise; every number is a measured value the engine computed.</p>

  <dl>
    <dt>THE DRAFT</dt>
    <dd>32 teams, 32 rounds, one pick per slot. Your board shows the players you can still take; the CPU teams pick by the engine's own policy while you are not on the clock. You may draft a player into any slot he legally fits — a flex cost applies when he plays out of position, and the cost is the engine's own table, shown as "−N flex".</dd>

    <dt>THE NUMBERS (Wins · Priority · OVR)</dt>
    <dd><b>Wins</b> is the model's estimate of how many wins a player adds — the engine's weight-OVR units carried to wins ({WINS_PER_UNIT === 0 ? '' : ''}one number, one decimal). <b>Priority</b> is Wins divided by the gone odds — the value of taking him right now. <b>OVR</b> is the player's overall rating. Only these three ride the board; integers everywhere except Wins and Priority, which print one decimal.</dd>

    <dt>GONE%</dt>
    <dd>The chance the player is drafted between now and your next pick. The method, in plain words: the engine simulates the CPU draft from this point 30 times and counts how often each player is gone when your turn returns. Hover the column to see the exact counts.</dd>

    <dt>VALUATION MODES</dt>
    <dd>Every number carries a label: <b>Model Value</b> (the engine's measured default), <b>Game balance</b>, or <b>Owner preset</b>. One mode at a time, never blended; the label travels with the numbers everywhere they appear; the switch locks the moment a draft starts.</dd>

    <dt>THE SEASON</dt>
    <dd>The finished rosters become 32 rated teams (the engine builds each team's lineup and rates it — no ratings are invented here). The engine builds the schedule, plays every game week by week through its drive generator, seeds the playoffs after week 18, and plays Wild Card → Divisional → Conference → Super Bowl. Each game's result is a fixed derivation of the season seed and the matchup: the same draft and seed always replay the same game, and the gameSeed stamp on every card proves it.</dd>

    <dt>THE FEED AND THE RECAP</dt>
    <dd>The feed is the play-by-play of the user's game, drive by drive, with running scores and lead-change marks. The recap names every score, every turnover and every star in plain informative lines. Overtime events appear in the overtime block; the words "expected scoring" and "sudden death" never appear anywhere in this product. There are no injuries in any sport, ever.</dd>

    <dt>SAVES</dt>
    <dd>One save blob per slot, version-checked on every read. A corrupt save is refused and shown verbatim — never repaired, never silently replaced. A save written by a newer build is refused with its version named.</dd>

    <dt>OFFLINE</dt>
    <dd>The fonts are bundled in the app (Cinzel, inlined — never loaded from Google's servers). The whole product runs from a single file on disk with no network. Shareable cards export as one self-contained file each.</dd>

    <dt>BUILD</dt>
    <dd>Engine stamp {engineVersion()} — the frozen snapshot this shell consumes byte-identically. The engine's own test suite runs in this tree; the shell's battery laws run against the built app.</dd>
  </dl>
</section>
