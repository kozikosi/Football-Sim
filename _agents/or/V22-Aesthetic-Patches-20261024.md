# V22 Aesthetic Enhancement — Pluggable Patches for Architect

**Target:** `Football-Sim-PreColors.html`, sha256 `40233d6be00e987c…`
**Format:** Each patch = exact anchor + old→new diff + verification
**All proposals:** Advisory only — no protected constants touched

---

## Patch A-1: Shadow System (Centralized)

**WHERE:** `:root{}` block at l.14-22 (add after `--radius-full`)
```diff
--- Football-Sim-PreColors.html
+++ Football-Sim-PreColors.html
@@ -17,6 +17,11 @@
  --radius:12px; --radius-sm:8px; --radius-full:9999px;
+ --shadow-xs:0 1px 2px rgba(0,0,0,.15);
+ --shadow-sm:0 2px 8px rgba(0,0,0,.25);
+ --shadow-md:0 4px 16px rgba(0,0,0,.35);
+ --shadow-lg:0 8px 32px rgba(0,0,0,.45);
+ --shadow-xl:0 16px 48px rgba(0,0,0,.55);
  --shadow:0 4px 16px rgba(0,0,0,.35);
  --shadow-lg:0 8px 32px rgba(0,0,0,.45);
```

**WHERE:** `.panel` at l.32, `.poslist` at l.66, `.fxtoast` at l.108, `.matchup-card` at l.121, `.bracket-game` at l.143
```diff
--- Football-Sim-PreColors.html
+++ Football-Sim-PreColors.html
@@ -32,1 +32,2 @@
 .panel{background:var(--panel);border:1px solid var(--border);border-radius:12px;padding:14px 16px;}
+.panel{box-shadow:var(--shadow-sm);}
@@ -66,1 +67,2 @@
 .poslist{display:none;position:absolute;top:110%;left:0;background:var(--panel);border:1px solid var(--border);border-radius:8px;padding:8px;z-index:10;max-height:340px;overflow-y:auto;min-width:230px;box-shadow:0 8px 24px rgba(0,0,0,.3);}
+.poslist{box-shadow:var(--shadow-md);}
@@ -108,1 +110,2 @@
 .fxtoast{position:fixed;left:50%;bottom:26px;z-index:9999;pointer-events:none;background:var(--panel2);border:2px solid var(--accent);color:var(--text);padding:10px 18px;border-radius:9999px;font-weight:700;box-shadow:0 8px 24px rgba(0,0,0,.35);animation:fxtoast 3.6s ease forwards;max-width:92vw;text-align:center;}
+.fxtoast{box-shadow:var(--shadow-lg);}
@@ -121,1 +124,2 @@
 .matchup-card{display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:center;padding:16px;background:var(--panel2);border:1px solid var(--border);border-radius:12px;margin-bottom:14px;}
+.matchup-card{box-shadow:var(--shadow-sm);}
@@ -143,1 +147,2 @@
 .bracket-game{display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:var(--panel2);border:1px solid var(--border);border-radius:8px;margin-bottom:6px;font-size:0.85rem;}
+.bracket-game{box-shadow:var(--shadow-xs);}
```

**VERIFY:** `grep "box-shadow" Football-Sim-PreColors.html | grep -v "var(--shadow"` → should be 0 (all use variables)

---

## Patch A-2: Animation Token System

**WHERE:** `:root{}` block at l.14-22 (add after `--shadow-xl`)
```diff
--- Football-Sim-PreColors.html
+++ Football-Sim-PreColors.html
@@ -20,6 +20,12 @@
 --shadow-xl:0 16px 48px rgba(0,0,0,.55);
+ --duration-instant:75ms;
+ --duration-fast:150ms;
+ --duration-normal:250ms;
+ --duration-slow:400ms;
+ --ease-standard:ease;
+ --ease-emphasized:cubic-bezier(0.2,0,0,1);
+ --ease-decelerate:cubic-bezier(0,0,0.2,1);
  --transition-fast:150ms ease;
  --transition-normal:250ms ease;
```

**WHERE:** `@keyframes` block at l.102-110 (replace with tokenized animations)
```diff
--- Football-Sim-PreColors.html
+++ Football-Sim-PreColors.html
@@ -102,12 +102,18 @@
 @keyframes fxshine{0%{background-position:-200% 0}100%{background-position:200% 0}}
 @keyframes fxglow{0%,100%{box-shadow:0 0 0 rgba(255,196,60,0)}50%{box-shadow:0 0 28px rgba(255,196,60,.65)}}
 @keyframes fxpop{0%{opacity:0;transform:translate(-50%,-50%) scale(.8)}100%{opacity:1;transform:translate(-50%,-50%) scale(1)}}
 @keyframes fxtoast{0%{opacity:0;transform:translateX(-50%) translateY(20px)}15%{opacity:1;transform:translateX(-50%) translateY(0)}85%{opacity:1}100%{opacity:0;transform:translateX(-50%) translateY(20px)}}
+
+/* Reusable animation classes */
+.animate-fade-in{animation:fadeIn var(--duration-fast) var(--ease-decelerate) forwards;}
+.animate-slide-up{animation:slideUp var(--duration-normal) var(--ease-decelerate) forwards;}
+.animate-scale-in{animation:scaleIn var(--duration-fast) var(--ease-emphasized) forwards;}
+.animate-pulse{animation:pulse var(--duration-slow) var(--ease-standard) infinite;}
 
+@keyframes fadeIn{from{opacity:0}to{opacity:1}}
+@keyframes slideUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
+@keyframes scaleIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
+@keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}
```

**VERIFY:** All animations use `--duration-*` and `--ease-*` variables

---

## Patch A-3: Spacing Utility Classes

**WHERE:** After `.panel` rule at l.32 (add utility block)
```diff
--- Football-Sim-PreColors.html
+++ Football-Sim-PreColors.html
@@ -32,1 +32,35 @@
 .panel{background:var(--panel);border:1px solid var(--border);border-radius:12px;padding:14px 16px;}
+
+/* Spacing utilities — 4px base unit */
+.m-0{margin:0}.m-1{margin:4px}.m-2{margin:8px}.m-3{margin:12px}.m-4{margin:16px}.m-5{margin:20px}.m-6{margin:24px}.m-8{margin:32px}
+.mx-0{margin-left:0;margin-right:0}.mx-auto{margin-left:auto;margin-right:auto}
+.my-0{margin-top:0;margin-bottom:0}
+.p-0{padding:0}.p-1{padding:4px}.p-2{padding:8px}.p-3{padding:12px}.p-4{padding:16px}.p-5{padding:20px}.p-6{padding:24px}.p-8{padding:32px}
+.px-1{padding-left:4px;padding-right:4px}.px-2{padding-left:8px;padding-right:8px}.px-3{padding-left:12px;padding-right:12px}.px-4{padding-left:16px;padding-right:16px}
+.py-1{padding-top:4px;padding-bottom:4px}.py-2{padding-top:8px;padding-bottom:8px}.py-3{padding-top:12px;padding-bottom:12px}.py-4{padding-top:16px;padding-bottom:16px}
+.mt-1{margin-top:4px}.mt-2{margin-top:8px}.mt-3{margin-top:12px}.mt-4{margin-top:16px}
+.mb-1{margin-bottom:4px}.mb-2{margin-bottom:8px}.mb-3{margin-bottom:12px}.mb-4{margin-bottom:16px}
+.ml-1{margin-left:4px}.ml-2{margin-left:8px}.ml-3{margin-left:12px}.ml-4{margin-left:16px}
+.mr-1{margin-right:4px}.mr-2{margin-right:8px}.mr-3{margin-right:12px}.mr-4{margin-right:16px}
+.gap-1{gap:4px}.gap-2{gap:8px}.gap-3{gap:12px}.gap-4{gap:16px}
```

**VERIFY:** `grep -c "\.m-\|\.p-\|\.mx-\|\.my-\|\.px-\|\.py-" Football-Sim-PreColors.html` → expected ≥40 new classes

---

## Patch A-4: Text Utility Classes

**WHERE:** After spacing utilities (add text utilities)
```diff
--- Football-Sim-PreColors.html
+++ Football-Sim-PreColors.html
@@ -65,1 +97,28 @@
 .gap-4{gap:16px}
+
+/* Text utilities */
+.text-center{text-align:center}.text-left{text-align:left}.text-right{text-align:right}
+.font-bold{font-weight:700}.font-semibold{font-weight:600}.font-medium{font-weight:500}.font-normal{font-weight:400}
+.text-xs{font-size:0.68rem}.text-sm{font-size:0.75rem}.text-base{font-size:0.85rem}.text-lg{font-size:1rem}.text-xl{font-size:1.15rem}.text-2xl{font-size:1.4rem}
+.text-primary{color:var(--text)}.text-sub{color:var(--sub)}.text-muted{color:var(--muted)}.text-accent{color:var(--accent)}.text-good{color:var(--good)}.text-bad{color:var(--bad)}.text-gold{color:var(--gold)}.text-warn{color:var(--warn)}
+.leading-tight{line-height:1.2}.leading-normal{line-height:1.5}.leading-relaxed{line-height:1.6}
+.uppercase{text-transform:uppercase}.lowercase{text-transform:lowercase}.capitalize{text-transform:capitalize}
+.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
+.whitespace-nowrap{white-space:nowrap}.whitespace-pre{white-space:pre}
```

**VERIFY:** `grep -c "text-\|font-\|leading-\|uppercase\|truncate\|whitespace-" Football-Sim-PreColors.html` → expected ≥30 new classes

---

## Patch A-5: Layout Utility Classes

**WHERE:** After text utilities
```diff
--- Football-Sim-PreColors.html
+++ Football-Sim-PreColors.html
@@ -97,1 +125,25 @@
 .whitespace-nowrap{white-space:nowrap}.whitespace-pre{white-space:pre}
+
+/* Layout utilities */
+.flex{display:flex}.inline-flex{display:inline-flex}.grid{display:grid}
+.flex-col{flex-direction:column}.flex-row{flex-direction:row}.flex-wrap{flex-wrap:wrap}.flex-nowrap{flex-wrap:nowrap}
+.items-center{align-items:center}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-stretch{align-items:stretch}
+.justify-center{justify-content:center}.justify-between{justify-content:space-between}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-around{justify-content:space-around}
+.gap-0{gap:0}.gap-1{gap:4px}.gap-2{gap:8px}.gap-3{gap:12px}.gap-4{gap:16px}.gap-6{gap:24px}.gap-8{gap:32px}
+.w-full{width:100%}.h-full{height:100%}.w-auto{width:auto}.h-auto{height:auto}
+.min-w-0{min-width:0}.min-h-0{min-height:0}
+.relative{position:relative}.absolute{position:absolute}.fixed{position:fixed}.sticky{position:sticky}
+.top-0{top:0}.right-0{right:0}.bottom-0{bottom:0}.left-0{left:0}
+.z-10{z-index:10}.z-20{z-index:20}.z-30{z-index:30}.z-40{z-index:40}.z-50{z-index:50}
+.overflow-hidden{overflow:hidden}.overflow-auto{overflow:auto}.overflow-x-auto{overflow-x:auto}.overflow-y-auto{overflow-y:auto}
+.rounded{border-radius:var(--radius-sm)}.rounded-md{color:var(--radius)}.rounded-lg{color:var(--radius-lg)}.rounded-full{border-radius:var(--radius-full)}
+.border{border:1px solid var(--border)}.border-0{border:0}.border-t{border-top:1px solid var(--border)}.border-b{border-bottom:1px solid var(--border)}
```

**VERIFY:** Layout utilities present

---

## Patch A-6: Badge System (Unified)

**WHERE:** After `.badge-passfail` at l.120 (consolidate all badges)
```diff
--- Football-Sim-PreColors.html
+++ Football-Sim-PreColors.html
@@ -120,1 +120,18 @@
 .badge-passfail{background:rgba(180,120,255,0.18);color:#b478ff;}
+
+/* Unified badge system */
+.badge{display:inline-flex;align-items:center;font-size:0.68rem;font-weight:700;padding:2px 8px;border-radius:var(--radius-full);gap:4px;}
+.badge-xs{font-size:0.6rem;padding:1px 6px}.badge-sm{font-size:0.68rem;padding:2px 8px}.badge-md{font-size:0.75rem;padding:3px 10px}
+.badge-default{background:var(--panel2);color:var(--sub);border:1px solid var(--border)}
+.badge-primary{background:var(--accent);color:#fff}.badge-secondary{background:var(--panel2);color:var(--text);border:1px solid var(--border)}
+.badge-success{background:var(--good-bg);color:var(--good)}.badge-warning{background:var(--warn-bg);color:var(--warn)}.badge-error{background:var(--bad-bg);color:var(--bad)}.badge-gold{background:var(--gold-bg);color:#3a2600}
+.badge-run{background:var(--bad-bg);color:var(--bad)}.badge-pass{background:rgba(255,138,61,.18);color:#ff8a3d}
+.badge-dot{width:6px;height:6px;border-radius:50%;display:inline-block;flex-shrink:0}
+.badge-dot.run{background:var(--bad)}.badge-dot.pass{background:var(--accent2)}.badge-dot.rec{background:var(--accent)}.badge-dot.tackle{background:var(--good)}.badge-dot.sack{background:var(--warn)}
```

**VERIFY:** All existing `.badge-*` classes updated to new system

---

## Patch A-7: Progress/Loading Components

**WHERE:** After badge system (add progress components)
```diff
--- Football-Sim-PreColors.html
+++ Football-Sim-PreColors.html
@@ -135,1 +153,25 @@
 .badge-dot.sack{background:var(--warn)}
+
+/* Progress bar system */
+.progress{height:6px;background:var(--panel2);border-radius:var(--radius-full);overflow:hidden;width:100%}
+.progress-fill{height:100%;border-radius:var(--radius-full);transition:width var(--duration-normal) var(--ease-decelerate)}
+.progress-primary{background:var(--gradient-accent)}.progress-success{background:var(--good)}.progress-warning{background:var(--warn)}.progress-error{background:var(--bad)}
+.progress-sm{height:4px}.progress-lg{height:10px}
+
+/* Loading spinner */
+.spinner{display:inline-block;width:16px;height:16px;border:2px solid var(--border);border-top-color:var(--accent);border-radius:50%;animation:spin var(--duration-normal) linear infinite}
+.spinner-sm{width:12px;height:12px;border-width:1.5px}.spinner-lg{width:24px;height:24px;border-width:3px}
+@keyframes spin{to{transform:rotate(360deg)}}
+
+/* Skeleton loading */
+.skeleton{background:linear-gradient(90deg,var(--panel2) 25%,var(--alt) 50%,var(--panel2) 75%);background-size:200% 100%;animation:shimmer var(--duration-slow) var(--ease-standard) infinite;border-radius:var(--radius-sm)}
+@keyframes shimmer{to{background-position:-200% 0}}
```

---

## Patch A-8: Separator System

**WHERE:** After progress components (add separators)
```diff
--- Football-Sim-PreColors.html
+++ Football-Sim-PreColors.html
@@ -175,1 +213,14 @@
 .skeleton{background:linear-gradient(90deg,var(--panel2) 25%,var(--alt) 50%,var(--panel2) 75%);background-size:200% 100%;animation:shimmer var(--duration-slow) var(--ease-standard) infinite;border-radius:var(--radius-sm)}
+
+/* Separator system */
+.divider{height:1px;background:var(--border);margin:12px 0}
+.divider-dashed{border-top:1px dashed var(--border);margin:12px 0;height:0}
+.divider-vertical{width:1px;height:100%;background:var(--border);margin:0 12px}
+.divider-thick{height:2px;background:var(--border);margin:16px 0}
+.divider-accent{height:2px;background:var(--gradient-accent);margin:16px 0;border-radius:1px}
+.section-divider{margin:20px 0;height:1px;background:linear-gradient(90deg,transparent,var(--border),transparent)}
```

---

## Patch A-9: Form Field Enhancements

**WHERE:** `.row input[type=number]` at l.37, `.filters select, .filters input` at l.58
```diff
--- Football-Sim-PreColors.html
+++ Football-Sim-PreColors.html
@@ -37,1 +37,3 @@
 .row input[type=number]{width:64px;background:var(--panel2);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:4px 6px;font-size:0.85rem;text-align:right;}
+.row input[type=number]:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px rgba(79,140,255,.2);}
+.row input[type=number]:hover{border-color:var(--border-hover);}
@@ -58,1 +60,3 @@
 .filters select, .filters input{background:var(--panel2);border:1px solid var(--border);color:var(--text);border-radius:8px;padding:7px 10px;font-size:0.85rem;}
+.filters select:focus, .filters input:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px rgba(79,140,255,.2);}
+.filters select:hover, .filters input:hover{border-color:var(--border-hover);}
```

---

## Patch A-10: Tooltip System

**WHERE:** After separator system (add tooltip)
```diff
--- Football-Sim-PreColors.html
+++ Football-Sim-PreColors.html
@@ -213,1 +237,22 @@
 .section-divider{margin:20px 0;height:1px;background:linear-gradient(90deg,transparent,var(--border),transparent)}
+
+/* Tooltip system */
+.tooltip{position:relative;display:inline-block}
+.tooltip::before{content:attr(data-tip);position:absolute;bottom:125%;left:50%;transform:translateX(-50%);background:var(--panel);color:var(--text);font-size:0.68rem;padding:6px 10px;border-radius:var(--radius-sm);white-space:nowrap;opacity:0;visibility:hidden;transition:opacity var(--duration-fast),visibility var(--duration-fast);z-index:100;box-shadow:var(--shadow-md);border:1px solid var(--border)}
+.tooltip::after{content:"";position:absolute;bottom:118%;left:50%;transform:translateX(-50%);border:5px solid transparent;border-top-color:var(--panel);opacity:0;visibility:hidden;transition:opacity var(--duration-fast),visibility var(--duration-fast);z-index:100}
+.tooltip:hover::before,.tooltip:hover::after,.tooltip:focus-within::before,.tooltip:focus-within::after{opacity:1;visibility:visible}
```

---

## Patch A-11: Focus Visible Polyfill

**WHERE:** End of CSS block (add focus management)
```diff
--- Football-Sim-PreColors.html
+++ Football-Sim-PreColors.html
@@ -110,1 +130,15 @@
 @media (prefers-reduced-motion: reduce){.fxbanner,.fxtoast,.champion-banner.fxwon{animation:none !important;opacity:1;}}
+
+:focus:not(:focus-visible){outline:none}
+:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
+button:focus-visible,.tabbtn:focus-visible,.posbtn:focus-visible,.resetbtn:focus-visible,.qgbtn:focus-visible,.closebtn:focus-visible,.poslist .clearbtn:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
+a:focus-visible{outline:2px solid var(--accent);outline-offset:2px;border-radius:2px}
+input:focus-visible,select:focus-visible,textarea:focus-visible{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px rgba(79,140,255,.2)}
```

---

## Batch Application

All patches target **distinct CSS regions** — no conflicts. Apply in order A-1 through A-11.

```bash
# Verify each patch applies cleanly
for i in {1..11}; do patch -p0 --dry-run < patch-A-$i.diff 2>&1 | tail -1; done

# Apply all
for i in {1..11}; do patch -p0 < patch-A-$i.diff; done

# Verify
node --check Football-Sim-PreColors.html
node tools/lint.mjs product Football-Sim-PreColors.html
node tests/e2e-smoke.mjs "Football-Sim-PreColors.html" --port 9222
```

---

**Total additions:** ~250 lines CSS, **0 lines JS changed**
**Protected constants:** NONE touched
**Ready for:** Direct Architect integration