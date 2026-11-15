import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/tokens.css'
import './assets/screens.css'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

if (import.meta.env.DEV) {
  ;(window as unknown as Record<string, unknown>).__pinia = pinia
}

app.mount('#app')
