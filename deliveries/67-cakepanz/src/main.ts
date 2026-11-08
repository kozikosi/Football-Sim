// 67 Cakepanz — slice 1 entry. The user-facing brand is 76 Pancakes.
import { mount } from 'svelte';
import App from './App.svelte';

const app = mount(App, { target: document.getElementById('app')! });
export default app;
