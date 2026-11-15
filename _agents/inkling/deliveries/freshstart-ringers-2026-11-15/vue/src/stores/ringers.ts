import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { playMatch, type MatchResult } from '../engine/ringers'

export const useRingersStore = defineStore('ringers', () => {
  const seed = ref(2027)
  const result = ref<MatchResult | null>(null)
  const played = computed(() => result.value !== null)

  function run() {
    result.value = playMatch(Math.trunc(seed.value) || 1)
  }

  function reset() {
    result.value = null
  }

  return { seed, result, played, run, reset }
})
