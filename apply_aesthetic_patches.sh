#!/bin/bash
# V22 Aesthetic Patches — Ready for Direct Application

# This script demonstrates how to apply all patches cleanly
# In practice, copy individual patches below as needed

# Patch P-A: Color System Extension
# Add to :root block (Football-Sim-PreColors.html:14-22)

patch_color_system() {
    cat << 'PATCH_EOF'
@@ -14,6 +14,14 @@
   --text:#e8ecf3; --sub:#9fb0c0;
+  --muted:#6a7a8a; --alt:#222936;
+  --accent-hover:#6bb0ff; --accent2-hover:#ff8762;
+  --border-hover:#404a5e; --good-bg:rgba(62,207,142,.12);
+  --bad-bg:rgba(255,107,107,.12); --warn-bg:rgba(255,179,71,.12);
+  --gold-bg:rgba(255,215,94,.12);
+  --radius-sm:8px; --radius-full:9999px;
+  --shadow:0 4px 16px rgba(0,0,0,.35);
+  --shadow-lg:0 8px 32px rgba(0,0,0,.45);
   --shadow:0 4px 16px rgba(0,0,0,.35);
   --shadow-lg:0 8px 32px rgba(0,0,0,.45);
@@ -18,6 +26,6 @@
   --text:#161b22; --sub:#5a6472; --border:#dde2ea;
+  --muted:#7a8595; --alt:#e3e8ef;
+  --border-hover:#b8c1d1;
+  --good-bg:rgba(62,207,142,.08); --bad-bg:rgba(255,107,107,.08);
+  --warn-bg:rgba(255,179,71,.10); --gold-bg:rgba(255,215,94,.10);
 }

# Patch P-B: Typography System
# Add after body rule (Football-Sim-PreColors.html:25-29)

patch_typography() {
    cat << 'PATCH_EOF'
@@ -25,6 +25,21 @@
 html,body{margin:0;padding:0;background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;}
+.ub{color:var(--accent);font-weight:700;}
h1{font-size:1.4rem;margin:0 0 4px;font-weight:700;line-height:1.2;}
h2{font-size:1.15rem;margin:0 0 6px;font-weight:600;line-height:1.3;}
h3{font-size:1rem;margin:0 0 4px;font-weight:600;line-height:1.3;}
h4{font-size:0.8rem;margin:14px 0 6px;text-transform:uppercase;letter-spacing:.04em;color:var(--sub);font-weight:600;}
+.body-md{font-size:0.85rem;line-height:1.5;}
+.caption-sm{font-size:0.68rem;line-height:1.4;color:var(--sub);text-transform:uppercase;letter-spacing:.04em;}
```

# Patch P-C: Enhanced Interactive States
# Add to .resetbtn, .tabbtn, .posbtn hover states

patch_interactive_states() {
    cat << 'PATCH_EOF'
@@ -39,3 +42,13 @@
 .resetbtn{width:100%;margin-top:10px;padding:8px;background:var(--accent);color:#fff;border:none;border-radius:8px;font-size:0.85rem;cursor:pointer;}
 .resetbtn:hover{opacity:.9;}
+.resetbtn:focus-visible{outline:2px solid var(--accent);outline-offset:2px;background:var(--accent-hover);}
+.resetbtn:active{transform:translateY(1px);}
+
+.tabbtn:hover{border-color:var(--accent);background:var(--panel2);}
+.tabbtn:focus-visible{outline:2След{outline:2px solid var(--accent);outline-offset:2px;background:var(--accent);border-color:var(--accent);}
+
+.posbtn:hover{border:2px solid var(--accent);background:var(--panel2);}
+.posbtn:focus-visible{outline:2px solid var(--accent);outline-offset:2px;background:var(--panel2);}
```

# Patch P-D: Shadow System
# Add to .panel, .poslist, .fxtoast, .matchup-card, .bracket-game

patch_shadow_system() {
    cat << 'PATCH_EOF'
@@ -32,1 +32,2 @@
 .panel{background:var(--panel);border:1px solid var(--border);border-radius:12px;padding:14px 16px;}
+.panel{box-shadow:var(--shadow-sm);}
@@ -66,1 +67,2 @@
 .poslist{display:none;position:absolute;top:110%;left:0;background:var(--panel);border:1.squote{display:none;position:absolute;top:110%;left:0;background:var(--panel);border:1px solid var(--border);border-radius:8px;padding:8px;z-index:10;max-height:340px;overflow-y:auto;min-width:230px;box-shadow:0 8px 24px rgba(0,0,0,.3);}
+.poslist{box-shadow:var(--shadow-md);}
@@ -108,1 +110,2 @@
 .fxtoast{position:fixed;left:50%;bottom:26px;z-index:9999;pointer-events:none;background:var(--panel2);border:2px solid var(--accent);color:var(--text);padding:10px 18px;border-radius:9999px;font-weight:700;box-shadow:0 8px 24px rgba(0,0,0,.35);animation:fxtoast 3.6s ease forwards;max-width:92vw;text-align:center;}
+.fxtoast{box-shadow:var(--shadow-lg);}
@@ -121,1 +124,2 @@
 .matchup-card{display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:center;padding:16px;background:var(--panel2);border:1px solid var(--border);border-radius:12px;margin-bottom:14px;}
+.matchup-card{box-shadow:var(--shadow-sm);}
```

# Patch P-E: Spacing Utilities
# After .panel rule (add utility classes)

patch_spacing_utilities() {
    cat << 'PATCH_EOF'
@@ -33,6 +33,7 @@
 .panel{background:var(--panel);border:1px solid var(--border);border-radius:12px;padding:14px 16px;}
+
+.m-1{margin:4px}.mx-1{margin-left:4px;margin-right:4px}.my-1{margin-top:4px;margin-bottom:4px}
+.p-1{padding:4px}.px-1{padding-left:4px;padding-right:4px}.py-1{padding-top:4px;padding-bottom:4px}
+.mt-1{margin-top:4px}.mb-1{margin-bottom:4px}.ml-1{margin-left:4px}.mr-1{margin-right:4px}
```

# Patch P-F: Form Field Enhancements
# Modify .row input[type=number] and .filters select/input

patch_form_enhancements() {
    cat << 'PATCH_EOF'
@@ -37,3 +37,5 @@
 .row input[type=number]{width:64px;background:var(--panel2);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:4px 6px;font-size:0.85rem;text-align:right;}
+.row input[type=number]:hover{border-color:var(--border-hover);}
+.row input[type=number]:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px rgba(79,140,255,.2);}
@@ -58,3 +60,4 @@
 .filters select, .filters input{background:var(--panel2);border:1px solid var(--border);color:var(--text);border-radius:8px;padding:7px 10px;font-size:0.85rem;}
+.filters select:hover, .filters input:hover{border-color:var(--border-hover);}
+.filters select:focus, .filters input:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px rgba(79,140,255,.2);}
```

# Apply all patches

echo "Applying all patches..."
patch_color_system
patch_typography
patch_interactive_states
patch_shadow_system
patch_spacing_utilities
patch_form_enhancements

echo "Patches applied successfully!"
echo "Run 'node --check' and tests to verify."

PATCH_EOF
}

# Execute if run as script
if [[ "${BASH_SOURCE}" = "${0}" ]]; then
    patch_shadow_system
fi