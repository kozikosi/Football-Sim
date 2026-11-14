import { solidStart } from '@solidjs/start/config';

// v3 repair: @solidjs/start 2.x is vite-native (no vinxi). The frozen 1.x
// stack (start 1.5.1 + router 0.15.4 + vinxi 0.5.11) SSR-renders an empty
// component boundary for ANY Router-based app — hello-world-bisected in the
// scratch rig (no-Router renders; Router renders empty; receipts in the
// results filing). 2.x streams the full tree; sources unchanged.
export default {
	plugins: [solidStart()],
};
