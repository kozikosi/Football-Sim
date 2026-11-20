/* probe-contrast.mjs — the Owner's two flagged palette questions, MEASURED (audit only — the fix
   is the Owner's ruling, never shipped here):
     1. the light-mode gold2-on-pale-rose contrast (gold2 #e6c67d text on #fdf2f6 / #ffffff panels)
     2. the dark block's text: the plum ink #8e5566 on #1e1119 (the dark sheet sets no --text)
   WCAG 2.1 relative luminance + ratio; AA needs 4.5:1 (normal) or 3:1 (large text). */
const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x); return (l1 + 0.05) / (l2 + 0.05); };
const rows = [
  ['light gold2 #e6c67d on pale rose #fdf2f6', ratio('#e6c67d', '#fdf2f6'), 4.5],
  ['light gold2 #e6c67d on white panel #ffffff', ratio('#e6c67d', '#ffffff'), 4.5],
  ['light text #8e5566 on pale rose #fdf2f6', ratio('#8e5566', '#fdf2f6'), 4.5],
  ['dark text (rose ink) #8e5566 on plum #1e1119', ratio('#8e5566', '#1e1119'), 4.5],
  ['dark zcream #f2e7d5 on plum #1e1119', ratio('#f2e7d5', '#1e1119'), 4.5],
  ['dark gold2 #e8c87e on plum #1e1119', ratio('#e8c87e', '#1e1119'), 4.5],
];
console.log('== the Owner-flagged contrast questions, measured (WCAG 2.1) ==');
for (const [name, r, aa] of rows) console.log(`${(r).toFixed(2)}:1  AA(${aa}:1) ${r >= aa ? 'PASS' : 'FAIL'}  — ${name}`);
