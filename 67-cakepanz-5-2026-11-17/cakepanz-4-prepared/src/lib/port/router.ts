// port/router.ts — the hash router model (framework-free; hash routing because the product must boot
// from vanilla file:// where pushState cannot work). One parse/serialize pair + a subscribe; the
// binding layer listens to hashchange and mirrors the screen into the framework state.
export type ScreenId =
  | 'team' | 'board' | 'complete' | 'hub' | 'week' | 'standings' | 'bracket'
  | 'book' | 'awards' | 'review' | 'guide' | 'cards' | 'feed' | 'stats' | 'settings' | 'saves' | 'share';

export const SCREEN_IDS: readonly ScreenId[] = [
  'team', 'board', 'complete', 'hub', 'week', 'standings', 'bracket',
  'book', 'awards', 'review', 'guide', 'cards', 'feed', 'stats', 'settings', 'saves', 'share',
];

const SCREEN_RE = new RegExp('^#/?(' + SCREEN_IDS.join('|') + ')(?:/([0-9]{1,2}))?$');

export interface Route { screen: ScreenId; param: number | null }

export function parseHash(hash: string): Route | null {
  const m = SCREEN_RE.exec(hash);
  if (!m) return null;
  return { screen: m[1] as ScreenId, param: m[2] ? Number(m[2]) : null };
}

export function hashFor(screen: ScreenId, param?: number | null): string {
  return '#/' + screen + (param !== undefined && param !== null ? '/' + param : '');
}

export function currentRoute(): Route | null {
  if (typeof location === 'undefined') return null;
  return parseHash(location.hash);
}

export function navigate(screen: ScreenId, param?: number | null): void {
  if (typeof location === 'undefined') return;
  location.hash = hashFor(screen, param);
}

export function onRouteChange(fn: (r: Route | null) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const h = () => fn(currentRoute());
  window.addEventListener('hashchange', h);
  return () => window.removeEventListener('hashchange', h);
}
