import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/tokens.css'
import './assets/screens.css'
import App from './App.vue'
// Part A / Rev 8: the 11-field Pinia cell rides the build graph through the DEV-only QA hook.
import { useSeasonStore11 } from './stores/seasonStore11'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

import { useWeekStoreSealed } from './stores/weekStore-sealed'
import WeekStepperSealed from './components/WeekStepperSealed.vue'

if (import.meta.env.DEV) {
  ;(window as unknown as Record<string, unknown>).__pinia = pinia
  ;(window as unknown as Record<string, unknown>).__PART_A__ = { useSeasonStore11 }
  // Rev 9 Part C: the sealed-recipe surface rides the build graph through the DEV-only QA hook —
  // the same mechanism the receipted Part A live probes use; the battery's six screens are untouched.
  ;(window as unknown as Record<string, unknown>).__SEALED__ = {
    useWeekStoreSealed,
    mountSealedWeek() {
      const host = document.createElement('div')
      host.id = 'sealed-root'
      document.body.appendChild(host)
      const app2 = createApp(WeekStepperSealed)
      app2.use(pinia)
      app2.mount(host)
      return host
    },
  }
}

app.mount('#app')
