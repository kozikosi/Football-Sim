import { mount } from 'svelte';
import './lib/assets/tokens.css';
import './lib/assets/screens.css';
import App from './App.svelte';
// Part A / Rev 8: the store cells ride the build graph through the DEV-only QA hook (CLAUDE.md §2
// idiom). This import is also the WRAPPER VARIANT's build verification (Rev 8 erratum 0.7): the
// bundler compiles weekStore-wrappers.svelte.ts on every `npm run build` from here on — the
// "also compiles clean" claim rests on the BUILD, not only svelte-check.
import { seasonClass } from './lib/state/seasonStore-class.svelte.ts';
import { seasonFacade } from './lib/state/seasonStore-facade.svelte.ts';
import * as weekWrappers from './lib/state/weekStore-wrappers.svelte.ts';

const target = document.getElementById('app');

if (!target) {
  throw new Error('Missing #app mount target');
}

mount(App, { target });

import { weekSealed } from './lib/state/weekStore-sealed.svelte.ts';
import WeekStepperSealed from './lib/components/WeekStepperSealed.svelte';

if (import.meta.env.DEV) {
  (window as unknown as Record<string, unknown>).__PART_A__ = { seasonClass, seasonFacade, weekWrappers };
  // Rev 9 Part C: the sealed-recipe surface rides the build graph through the DEV-only QA hook —
  // the same mechanism the receipted Part A live probes use; the battery's six screens are untouched.
  (window as unknown as Record<string, unknown>).__SEALED__ = {
    weekSealed,
    mountSealedWeek() {
      const host = document.createElement('div');
      host.id = 'sealed-root';
      document.body.appendChild(host);
      mount(WeekStepperSealed, { target: host });
      return host;
    },
  };
}
