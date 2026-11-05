// The app entry (w74 item 5b, Z.ai DRAFT). Vite loads index.html's /src/main.ts; Svelte 5 mounts with the
// mount() API (createRoot is Svelte 4). Boot order: accessibility read ONCE (item 5h) -> root attributes ->
// mount. The whole-app boot phases (BOOT_DATASET_OK / LOAD_OK) belong to the pending AppState reducer; the
// slice's boot is deliberately minimal and marked as such.
import { mount } from 'svelte';
import App from './App.svelte';
import { readA11yAtBoot } from './platform/a11y.ts';

// Item 5h: read the accessibility state once at boot and put it on the root element as data attributes —
// state the screens read, not CSS-only media queries (CSS stays as the fallback for mid-session OS changes).
const a11y = readA11yAtBoot();
for (const [k, v] of Object.entries(a11y.dataAttributes())) {
  document.documentElement.setAttribute(k, v);
}

const app = mount(App, { target: document.getElementById('app')! });
export default app;

// Service worker (folder 06, item 6a): register only in production builds — the SW is generated at build time
// from Vite's output (tools/vite-plugin-sw.mjs), so in dev there is nothing to register. On update: the new SW
// activates immediately (skipWaiting + clients.claim in the generated file); a one-line toast tells the user.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then((reg) => {
    navigator.serviceWorker.addEventListener('message', (e) => {
      if (e.data?.type === 'sw:state' && e.data.manifestVersion) {
        document.documentElement.setAttribute('data-sw-version', String(e.data.manifestVersion));   // the update toast reads this
      }
    });
    reg.update();
  }).catch(() => { /* offline first is a default, never a gate: no SW = the app still runs online */ });
}
