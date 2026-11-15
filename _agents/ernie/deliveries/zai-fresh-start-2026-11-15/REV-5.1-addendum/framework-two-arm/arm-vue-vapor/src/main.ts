// vapor-mode falsifier (item 1): the pure-vapor entry — createVaporApp (@vue/runtime-vapor, re-exported
// by vue 3.6) instead of the vdom createApp. This is what drops the vdom renderer from the bundle;
// with the vdom createApp + interop the bundle GROWS (both runtimes ship). Same App, same chrome.
import { createVaporApp } from 'vue';
import App from './App.vue';
import './feed.css';

createVaporApp(App).mount('#app');
