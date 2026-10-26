#!/usr/bin/env python3
"""Z-post-blue WAVE 14 build module.
Owner directive (cinematic round): rebuild the pre-draft welcome cinematic and
gate the CPU draft on it. Vertical stack, all dead center: WELCOME, then under
it TO THE, then DRAFT. Hold the stack; 'welcome to the' (WELCOME + TO THE)
fades out together; DRAFT rises slowly to the exact center of the screen; the
moment DRAFT *begins* to fade out, the CPU draft starts — never behind the
cinematic (previously processUntilUserTurn() ran immediately at startDraft2,
so the CPU drafted behind the overlay). UI/timing only — protected math
invariants stay byte-identical."""

def apply(html):
    EXACT = []
    REMOVED = []
    def rep(label, old, new, cnt=1):
        EXACT.append((label, old, new, cnt))

    # ---------------- 1. CSS: the welcome stack + fade/rise/fade states ----------------
    rep("welcome CSS: stacked trio, transition states for fade / rise / fade-bg",
        """.zpb-fin.zpb-fin-welcome p{position:absolute;font-size:clamp(1.4rem,4vw,2.4rem);}
.zpb-fin.zpb-fin-welcome p:nth-child(1){transform:translateY(-9vh);}
.zpb-fin.zpb-fin-welcome p:nth-child(3){transform:translateY(9vh);}""",
        """.zpb-fin.zpb-fin-welcome p{position:absolute;left:0;right:0;font-size:clamp(1.4rem,4vw,2.4rem);opacity:0;transform:translateY(0);transition:opacity 1.1s ease,transform 2.6s cubic-bezier(.22,.61,.36,1);}
.zpb-fin.zpb-fin-welcome p.zpb-fin-in{opacity:1;}
.zpb-fin.zpb-fin-welcome p:nth-child(1){transform:translateY(-2em);}
.zpb-fin.zpb-fin-welcome p:nth-child(3){transform:translateY(2em);}
.zpb-fin.zpb-fin-welcome.zpb-wt-out p:nth-child(1),.zpb-fin.zpb-fin-welcome.zpb-wt-out p:nth-child(2){opacity:0;transition-duration:1.5s,2.6s;}
.zpb-fin.zpb-fin-welcome p.zpb-draft-center{transform:translateY(0);}
.zpb-fin.zpb-fin-welcome p.zpb-draft-fade{opacity:0;transition-duration:1.7s,2.6s;}
.zpb-fin.zpb-fin-welcome.zpb-fin-fadebg{opacity:0;transition:opacity 1.7s ease;}""", 1)

    # ---------------- 2. JS: zpbWelcomeCine rebuilt — stack, fade, rise, gated fade ----------------
    rep("zpbWelcomeCine rebuilt: WELCOME / TO THE / DRAFT, done() fires the instant DRAFT starts to fade",
        """// W13-4: welcome to the draft — WELCOME / TO THE DRAFT / DRAFT, equidistant from center
window.zpbWelcomeCine = function(){
 if(window._zpbWelDone) return; window._zpbWelDone = true;
 if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
 const lines = ['WELCOME', 'TO THE DRAFT', 'DRAFT'];
 const ov = document.createElement('div'); ov.className = 'zpb-fin zpb-fin-welcome';
 lines.forEach(t=>{ const p = document.createElement('p'); p.innerHTML = t; ov.appendChild(p); });
 document.body.appendChild(ov);
 const ps = [...ov.querySelectorAll('p')]; let i = 0;
 const step = ()=>{
  if(i >= ps.length){ setTimeout(()=>{ ov.style.transition='opacity 1.4s ease'; ov.style.opacity='0'; setTimeout(()=>ov.remove(), 1500); }, 1700); return; }
  ps[i].classList.add('zpb-fin-in'); i++; setTimeout(step, 2600);
 };
 step();
};""",
        """// W14-1: welcome to the draft — WELCOME / TO THE / DRAFT stacked dead center; 'welcome to the'
// fades out, DRAFT rises slowly to the center, and the CPU draft starts the instant DRAFT
// begins to fade (done() fires exactly then — the draft never runs behind the cinematic)
window.zpbWelcomeCine = function(done){
 const fire = ()=>{ setTimeout(()=>{ try{ if(typeof done==='function') done(); }catch(err){} }, 0); }; // async: the kickoff always runs after startDraft2 has fully initialized
 if(window._zpbWelDone){ fire(); return; } window._zpbWelDone = true;
 if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){ fire(); return; }
 if(typeof window._zpbWelCleanup==='function') window._zpbWelCleanup();
 const ov = document.createElement('div'); ov.className = 'zpb-fin zpb-fin-welcome';
 ['WELCOME','TO THE','DRAFT'].forEach(t=>{ const p = document.createElement('p'); p.innerHTML = t; ov.appendChild(p); });
 document.body.appendChild(ov);
 const ps = [...ov.querySelectorAll('p')], timers = [];
 const at = (ms, fn)=>{ timers.push(setTimeout(fn, ms)); };
 window._zpbWelCleanup = ()=>{ timers.forEach(clearTimeout); window._zpbWelCleanup = null; try{ ov.remove(); }catch(err){} };
 at(100,  ()=>ps[0].classList.add('zpb-fin-in'));       // WELCOME
 at(450,  ()=>ps[1].classList.add('zpb-fin-in'));       // TO THE
 at(800,  ()=>ps[2].classList.add('zpb-fin-in'));       // DRAFT
 at(3400, ()=>ov.classList.add('zpb-wt-out'));          // 'welcome to the' fades out together
 at(4100, ()=>ps[2].classList.add('zpb-draft-center')); // DRAFT rises slowly to the center
 at(7400, ()=>{                                         // DRAFT starts to fade — the CPU draft may begin
  try{ ps[2].classList.add('zpb-draft-fade'); ov.classList.add('zpb-fin-fadebg'); }catch(err){}
  fire();
 });
 at(9300, ()=>{ try{ ov.remove(); }catch(err){} window._zpbWelCleanup = null; });
};""", 1)

    # ---------------- 3. JS: startDraft2 — kickoff is GATED, with a one-shot latch ----------------
    rep("startDraft2: reset the cinematic + kickoff latches up front (wiring moves to the end)",
        """ window._zpbWelDone = false; try{ if(typeof zpbWelcomeCine==='function') zpbWelcomeCine(); }catch(err){}""",
        """ window._zpbWelDone = false; window._zpbKickStarted = false; // W14-1: kickoff wiring lives at the end of startDraft2""", 1)

    rep("startDraft2: immediate kickoff replaced by the DRAFT-fade-gated kickoff (one-shot latch, safe fallbacks)",
        """ if(typeof zpbSyncHome==='function') zpbSyncHome();
 processUntilUserTurn();
}""",
        """ if(typeof zpbSyncHome==='function') zpbSyncHome();
 // W14-1: the CPU draft starts ONLY when DRAFT begins to fade — zpbKick fires from zpbWelcomeCine
 // exactly then (async, so it always runs after this function has fully initialized the draft)
 const zpbKick = ()=>{ if(window._zpbKickStarted) return; window._zpbKickStarted = true; processUntilUserTurn(); };
 try{ if(typeof zpbWelcomeCine==='function') zpbWelcomeCine(zpbKick); else zpbKick(); }catch(err){ zpbKick(); }
}""", 1)

    # ---------------- apply every exact replacement ----------------
    for label, old, new, cnt in EXACT:
        found = html.count(old)
        if found != cnt:
            raise SystemExit(f"ABORT: [v14] {label}: expected {cnt} occurrence(s), found {found}")
        html = html.replace(old, new)
        REMOVED.append(old)
        print(f"[ok] [v14] {label}")

    # ---------------- post-checks ----------------
    posts = [
        ("new: zpb-wt-out class present",              "zpb-wt-out", 3),   # css selector x2 (comma group) + js add
        ("new: zpb-draft-center class present",        "zpb-draft-center", 2),
        ("new: zpb-draft-fade class present",          "zpb-draft-fade", 2),
        ("new: zpb-fin-fadebg class present",          "zpb-fin-fadebg", 2),
        ("new: one-shot kickoff latch",                "_zpbKickStarted", 3),
        ("new: gated kickoff callback wiring",         "zpbWelcomeCine(zpbKick)", 1),
        ("new: cleanup handle",                        "_zpbWelCleanup", 5),
        ("new: kickoff wired at the END of startDraft2", "else zpbKick(); }catch(err){ zpbKick(); }", 1),
    ]
    for label, needle, cnt in posts:
        found = html.count(needle)
        if found != cnt:
            raise SystemExit(f"ABORT: [v14] post-check {label}: expected {cnt}, found {found}")
        print(f"[ok] [v14] {label} (x{found})")

    gone = [
        "old: sequential 'TO THE DRAFT' line array",
        "old: 9vh welcome offsets",
        "old: immediate kickoff after zpbSyncHome",
        "old: fire-and-forget cine call at the top of startDraft2",
    ]
    checks = [
        ("'WELCOME', 'TO THE DRAFT', 'DRAFT'", 0),
        ("translateY(-9vh)", 0),
        ("if(typeof zpbSyncHome==='function') zpbSyncHome();\n processUntilUserTurn();", 0),
        ("zpbWelcomeCine(); }catch(err){}", 0),
    ]
    for (needle, want), g in zip(checks, gone):
        found = html.count(needle)
        if found != want:
            raise SystemExit(f"ABORT: [v14] removal check {g}: still found {found}x: {needle[:60]}")
        print(f"[ok] [v14] {g} removed")

    return html, EXACT, REMOVED


if __name__ == "__main__":
    import hashlib, sys, os
    src = sys.argv[1] if len(sys.argv) > 1 else "_agents/zai/docs-update-2026-10-26/Football-Sim-Z-post-blue.html"
    dst = sys.argv[2] if len(sys.argv) > 2 else "/home/z/my-project/out-v14/Football-Sim-Z-post-blue.html"
    with open(src, "r", encoding="utf-8") as f:
        html = f.read()
    before = hashlib.md5(html.encode()).hexdigest()
    html, EXACT, REMOVED = apply(html)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w", encoding="utf-8") as f:
        f.write(html)
    after = hashlib.md5(html.encode()).hexdigest()
    print(f"[v14] source : {src}  md5 {before}  {len(html):,} -> applied {len(EXACT)} replacements")
    print(f"[v14] built  : {dst}  md5 {after}  {os.path.getsize(dst):,} bytes")
