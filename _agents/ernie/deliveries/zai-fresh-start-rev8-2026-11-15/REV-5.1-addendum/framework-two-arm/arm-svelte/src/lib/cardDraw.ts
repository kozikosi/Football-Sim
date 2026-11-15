// cardDraw.ts — slice-5 PNG share export, framework-free, IDENTICAL BYTES in both arms.
// Dependency-free canvas draw (600×840): dark warm base, gold frame, the monogram medallion,
// name / pos / NFL team, the three user-visible numbers (OVR · Wins · Priority), the slot line,
// and the draft footer (team on the clock + overall). Tone paints the edge: good→green, bad→red,
// neutral→gold. Written from blank for the authoring bench (design reference: gold palette only).
import type { CardVM } from './cardVM.ts';

export interface CardDrawMeta { teamName: string; overall: number; totalPicks: number }

const TONE_EDGE: Record<CardVM['tone'], string> = { good: '#67b06a', bad: '#e08573', neutral: '#a08b62' };

export function drawCard(card: CardVM, meta: CardDrawMeta): string {
  const W = 600, H = 840;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const g = c.getContext('2d');
  if (!g) return '';
  // base + vignette
  const bg = g.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#140d06'); bg.addColorStop(1, '#0b0703');
  g.fillStyle = bg; g.fillRect(0, 0, W, H);
  // frame (double gold rule)
  g.strokeStyle = '#a08b62'; g.lineWidth = 2; g.strokeRect(14, 14, W - 28, H - 28);
  g.strokeStyle = TONE_EDGE[card.tone]; g.lineWidth = 5; g.strokeRect(22, 22, W - 44, H - 44);
  // medallion
  g.beginPath(); g.arc(W / 2, 150, 86, 0, Math.PI * 2);
  g.fillStyle = '#1c1307'; g.fill();
  g.strokeStyle = '#e8c87e'; g.lineWidth = 3; g.stroke();
  g.fillStyle = '#ecd9ad'; g.font = '800 64px system-ui, sans-serif';
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(card.monogram, W / 2, 152);
  // name / pos / team
  g.fillStyle = '#f5e9dd'; g.font = '800 44px system-ui, sans-serif';
  g.fillText(card.name, W / 2, 300);
  g.font = '800 22px system-ui, sans-serif'; g.fillStyle = '#c8a48f';
  g.fillText(card.pos + '  ·  ' + card.nflTeam, W / 2, 344);
  // the three numbers
  g.strokeStyle = '#a08b62'; g.lineWidth = 1; g.strokeRect(80, 400, 440, 170);
  g.fillStyle = '#fff2c4'; g.font = '800 76px system-ui, sans-serif';
  g.fillText(card.ovr, 200, 465);
  g.fillText(card.wins, 400, 465);
  g.fillStyle = '#c8a48f'; g.font = '800 18px system-ui, sans-serif';
  g.fillText('OVR', 200, 530);
  g.fillText('WINS', 400, 530);
  g.fillStyle = '#e8c87e'; g.font = '800 24px system-ui, sans-serif';
  g.fillText('PRIORITY ' + card.priority, W / 2, 612);
  // slot line
  g.fillStyle = '#c8a48f'; g.font = '700 20px system-ui, sans-serif';
  g.fillText('FITS ' + card.slotLabel, W / 2, 660);
  // footer
  g.strokeStyle = '#a08b62'; g.beginPath(); g.moveTo(80, 710); g.lineTo(520, 710); g.stroke();
  g.fillStyle = '#c8a48f'; g.font = '700 18px system-ui, sans-serif';
  g.fillText(meta.teamName.toUpperCase() + '  ·  OVERALL ' + meta.overall + ' OF ' + meta.totalPicks, W / 2, 756);
  g.font = '700 14px system-ui, sans-serif';
  g.fillText('67 CAKEPANZ  ·  Z-POST-BLUE  ·  SLICE 5', W / 2, 792);
  return c.toDataURL('image/png');
}
