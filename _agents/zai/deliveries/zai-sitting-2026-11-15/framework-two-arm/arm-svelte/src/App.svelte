<script lang="ts">
  // Two-arm build, arm 2 (Svelte 5 + Vite). The root: boot the engine-backed feed once, render the panel.
  // The feature spec (§2.5c, fixed before either arm was built): drive-level events, newest-first,
  // filter by drive, keyboard reachable, user's team in blue, every turnover named. Same chrome as arm 1.
  import FeedPanel from './lib/screens/FeedPanel.svelte';
  import { bootFeed } from './lib/bootData.ts';
  import type { FeedVM } from './lib/feedVM.ts';

  const feed: FeedVM = bootFeed();
</script>

<main class="cp-root">
  <header>
    <div class="cp-brand">76 Pancakes <span class="cp-shine">·</span> <span class="cp-track">two-arm build · Svelte 5 + Vite</span></div>
    <p class="cp-note">The §2.5 feed panel — drive-level events, engine-true. The engine, the view-model and the fixture are the same bytes as the Vue arm; only this view differs.</p>
  </header>
  <FeedPanel {feed} />
</main>
