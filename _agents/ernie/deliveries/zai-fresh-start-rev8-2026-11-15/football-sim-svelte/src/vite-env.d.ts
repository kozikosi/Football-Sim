/// <reference types="vite/client" />
/// <reference types="svelte" />

interface Window {
  __SIM_STATE__?: Readonly<{ ready: boolean }>;
}

declare module '*.svelte' {
  import type { Component } from 'svelte';

  const component: Component<any>;
  export default component;
}
