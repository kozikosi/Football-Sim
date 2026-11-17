// bindings/shareDownload.ts — the DOM half of the shareables (the P-368 split): the card STRING
// builder stays in port/shareable.ts (framework-free, node-testable); the browser-only download
// (Blob + object URL + the anchor click) lives HERE, with the other bindings. `document` no longer
// appears in src/lib outside bindings/ — node-side fixture rendering is untouched by this file.
import { renderShare } from '../port/shareable.ts';
import type { ShareCard } from '../port/shareable.ts';

export function downloadShare(c: ShareCard): void {
  const html = renderShare(c);
  const blob = new Blob([html], { type: 'text/html' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `76pancakes-${c.stage}-brag.html`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
