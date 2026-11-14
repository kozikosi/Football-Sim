// The bench board entry (Vue arm). Repointed from index.html; the scaffold's own src/main.ts is untouched.
import { createApp } from 'vue';
import './shared/board.css';
import Board from './Board.vue';

createApp(Board).mount('#app');
