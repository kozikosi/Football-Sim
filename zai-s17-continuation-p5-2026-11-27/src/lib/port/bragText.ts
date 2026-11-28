// port/bragText.ts — the P-209 brag-share TEXT (S15 §4.8). The Owner ruled: a copy-and-paste
// shareable with a link to the project — "No downloads", "it's a brag share". The share carries
// NO save data, NO seed, NO state of any kind (P-209 behavior 3); the provenance stamp on the
// cards is card-preview content and is deliberately NOT part of the paste text.
//
// The link is a BUILD-TIME constant: set VITE_BRAG_URL at make-live to the pinned Worker hostname
// (play.76pancakes.workers.dev or the closest free variant — the Architect's releases.md pins it).
// It is NEVER window.location, file://, localhost, a parameter, encoded state or save data. While
// the constant is unset the link-carrying share button HIDES (the Share screen reads hasBragLink())
// so a pre-make-live build can never ship a broken link. Signed-out users can share: nothing here
// touches an account — the brag is the most-shared artefact the product has.
/// <reference types="vite/client" />
import type { ShareCard } from './shareable.ts';

export const BRAG_URL: string = import.meta.env?.VITE_BRAG_URL ?? '';

export const hasBragLink = (): boolean => BRAG_URL !== '';

// The SEASON brag — the Owner's verbatim ask ("Can you go 20-0?", muse P-209's quote of the
// 1 Nov words — the same slogan the shipped page title carries) inside the work order §4.8's
// structure: "I went X-Y and [result] with [team]. Can you go 20-0? [link]". The two orders'
// ask lines are REPORTED in the hand-over (the briefing paraphrased "undefeated"; the Owner's
// own words and the shipped slogan say "20-0" — the Owner's verbatim governs). The link rides
// only when the build-time constant is set.
export function seasonBragText(o: { w: number; l: number; t: number; teamName: string; result: string }, link: string = BRAG_URL): string {
  const record = `${o.w}-${o.l}${o.t ? '-' + o.t : ''}`;
  return `I went ${record} and ${o.result} with the ${o.teamName}. Can you go 20-0?${link ? ' ' + link : ''}`;
}

// The other stages paste their card's prose: the HTML tags stripped, the provenance stamp dropped
// (the stamp carries the seed — P-209: the share carries no seed, ever).
export function cardBragText(c: ShareCard): string {
  return c.lines.map((l) => l.replace(/<[^>]+>/g, '')).join('\n');
}
