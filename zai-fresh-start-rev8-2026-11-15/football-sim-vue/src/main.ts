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

if (import.meta.env.DEV) {
  ;(window as unknown as Record<string, unknown>).__pinia = pinia
  ;(window as unknown as Record<string, unknown>).__PART_A__ = { useSeasonStore11 }
}

app.mount('#app')
