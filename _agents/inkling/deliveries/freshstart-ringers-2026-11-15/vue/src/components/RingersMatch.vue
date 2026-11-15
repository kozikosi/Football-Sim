<script setup lang="ts">
import { RINGERS_FIXTURE, TEAM_META, type TeamId } from '../engine/ringers'
import { useRingersStore } from '../stores/ringers'
import './ringers.css'

const ringers = useRingersStore()
const teams: TeamId[] = ['AUR', 'BRB']
const linesFor = (team: TeamId) =>
  ringers.result?.lines.filter((l) => l.team === team) ?? []
const totalYards = (team: TeamId) => ringers.result?.yards[team] ?? 0
</script>

<template>
  <main class="ringers">
    <h1>Cardboard Ringers</h1>
    <p class="tag">Two teams · 3 slots each · one seeded match · synthetic fixture</p>

    <section class="teams" aria-label="Teams and roster slots">
      <div v-for="team in teams" :key="team" class="team">
        <h2>{{ TEAM_META[team].name }}</h2>
        <div
          v-for="card in RINGERS_FIXTURE.filter((p) => p.team === team)"
          :key="card.id"
          class="card"
        >
          <span>
            <span class="nm">{{ card.name }}</span><br />
            <span class="meta">#{{ card.jersey }} · {{ card.pos }} · SPD {{ card.speed }}</span>
          </span>
          <span class="ovr" aria-label="OVR">{{ card.power }}</span>
        </div>
      </div>
    </section>

    <form class="controls" @submit.prevent="ringers.run()">
      <label for="seed">Seed</label>
      <input id="seed" v-model.number="ringers.seed" type="number" min="1" step="1" />
      <button type="submit">Run match</button>
      <button type="button" class="ghost" @click="ringers.reset()">Reset</button>
    </form>

    <section v-if="ringers.result" class="result" aria-live="polite">
      <p class="scoreline">
        {{ TEAM_META.AUR.short }} {{ ringers.result.score.AUR }}
        — {{ ringers.result.score.BRB }} {{ TEAM_META.BRB.short }}
      </p>
      <p class="winner">{{ ringers.result.winnerName }} take it.</p>
      <p class="meta">AUR {{ totalYards('AUR') }} yards · BRB {{ totalYards('BRB') }} yards · seed {{ ringers.result.seed }}</p>
    </section>

    <section v-if="ringers.result" class="log" aria-label="Play-by-play log">
      <p v-for="ev in ringers.result.events" :key="ev.play" :class="{ to: ev.text.includes('turns it over') }">
        <span class="play-n">P{{ ev.play }}</span>{{ ev.text }}
      </p>
    </section>

    <table v-if="ringers.result" class="stats">
      <caption>Player lines — synthetic fixture (not real players)</caption>
      <thead>
        <tr><th>Player</th><th>Team</th><th>OVR</th><th>Touches</th><th>Yards</th><th>Big plays</th><th>TO</th></tr>
      </thead>
      <tbody>
        <tr v-for="line in ringers.result.lines" :key="line.id">
          <td>{{ line.name }}</td>
          <td>{{ line.team }}</td>
          <td>{{ line.ovr }}</td>
          <td>{{ line.touches }}</td>
          <td>{{ line.yards }}</td>
          <td>{{ line.bigPlays }}</td>
          <td>{{ line.turnovers }}</td>
        </tr>
      </tbody>
    </table>

    <p class="synth">Cardboard Ringers is a synthetic fixture built for the framework comparison (R-13). Every player, rating and result above is invented for testing; it is not real NFL data and must not be shown to users.</p>
  </main>
</template>
