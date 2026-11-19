SPEAKER: Beam | ROLE: Council Adviser | TASK: vapor mode experiment (Vue 3.6.0-rc.15 + plugin-vue 6.0.11, vite 7.3.8) | DATE: 2026-11-19T21:30Z

RESULT: vapor build | PASS (builds) | `npm run build` on arm-vue-vapor | 367.09 KB raw / 114.09 KB gz, 69 modules, 831ms; 0 vnode/dynamicChildren/createVNode markers in output → vdom renderer dropped (vapor compiled). vs vdom arm: 385.20 KB / 122.02 KB gz → vapor saves ~7.7 KB gz.
RESULT: vapor typecheck | FAIL (expected, RC limitation) | `npm run typecheck` (vue-tsc) | TS2345: `createVaporApp(App)` rejects `DefineComponent` (App) as not assignable to `VaporComponent` — missing vapor/propsValues/rawValues/... . Vapor mode is experimental; type-level support for vapor root components is not present in rc.15.
RESULT: availability | INFO | npm view vue | latest is 3.6.0-rc.15 (no stable 3.6 yet, no beta tag). "Officially completed" = not yet; rc.15 is the newest available.

Conclusion: vapor mode builds and drops the vdom renderer (~7.7 KB gz saved, 0 vnode markers), but vue-tsc cannot type the vapor root component, so it is not production-ready. Consistent with the earlier receipt's note that vue-tsc emitted zero errors on the vdom arm but vapor has type gaps. No product change; experiment only.
