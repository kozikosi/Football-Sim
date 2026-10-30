// VLC V1 — Design tokens (CSS custom properties + JS)
// Midnight-ink identity. NOT w38's rose-gold.

export const tokens = {
  // Colors
  bg: '#0a0b10',
  panel: 'rgba(20, 22, 30, 0.6)',
  panel2: 'rgba(28, 31, 42, 0.5)',
  ink: '#e8eaf2',
  sub: '#9aa3b2',
  border: 'rgba(255, 255, 255, 0.08)',
  gold: '#c9a227',
  accent: '#7dd3fc',
  success: '#34d399',
  danger: '#f87171',
  warn: '#fbbf24',

  // Radii / shadows / motion
  radius: '20px',
  shadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
  transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
  floatDur: '6s',

  // Typography
  fontDisplay: "'Cinzel Decorative', 'Bodoni Moda', Georgia, serif",
  fontBody: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",

  // Breakpoints
  mobile: '390px',
} as const;
