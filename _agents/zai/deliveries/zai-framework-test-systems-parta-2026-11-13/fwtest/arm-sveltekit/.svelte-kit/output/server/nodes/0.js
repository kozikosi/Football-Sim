import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.D2IR-05D.js","_app/immutable/chunks/BOpD4PWU.js","_app/immutable/chunks/M3uAt831.js","_app/immutable/chunks/Cwl4YVzN.js"];
export const stylesheets = [];
export const fonts = [];
