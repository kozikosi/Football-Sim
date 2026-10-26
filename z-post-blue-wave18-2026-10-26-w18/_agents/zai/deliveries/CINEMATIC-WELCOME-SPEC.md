# THE WELCOME CINEMATIC — SAVED SPEC · never stray from this design

**Owner, 26 Oct:** *"You really did have it perfect … Perfect on the cinematic … Make sure that whole cinematic is saved separately and easily accessible from now on to find again in case you stray from this design."*

This document IS that save. It contains the complete, current implementation of the pre-draft
welcome cinematic (waves 14 + 15). If any future build drifts from this, restore from here.

---

## 1 · The design (Owner's words are the law)

- Vertical stack, all dead center, gold Cinzel Decorative: **WELCOME**, then under it **TO THE**, then **DRAFT**.
- **WELCOME lingers alone ~3 seconds** (fades in over 1.4 s, alone on screen for 3 s).
- **Then the rest of the text (TO THE + DRAFT) joins and lingers ~3 seconds** as the full stack.
- **"Welcome to the" (WELCOME + TO THE) fades out together** over 2.2 s.
- **DRAFT rises — more slowly (3.6 s) — to the exact center** of the screen and **lingers ~3 seconds**.
- **DRAFT fades out (2.4 s) with the veil**; the overlay is removed ~2.6 s later.
- **The CPU draft starts the instant DRAFT begins to fade** — never behind the cinematic.
- `prefers-reduced-motion`: no cinematic at all; the draft starts immediately.
- One-shot latch (`_zpbKickStarted`) guarantees exactly one kickoff chain; async fire guarantees
  the kickoff never runs before `startDraft2` finishes initializing.

## 2 · Timeline (ms from overlay mount)

| t (ms) | beat |
|---|---|
| 200 | WELCOME fades in (1.4 s) — lingers alone 3 s |
| 4600 | TO THE + DRAFT fade in (1.4 s) — the stack lingers 3 s |
| 9000 | WELCOME + TO THE fade out together (2.2 s) |
| 9700 | DRAFT rises to `translateY(0)` (3.6 s, ease-out cubic-bezier(.22,.61,.36,1)) |
| 16300 | DRAFT has lingered 3 s; DRAFT + veil fade (2.4 s) — **`done()` fires here: the CPU draft begins** |
| 18900 | overlay removed |

## 3 · CSS (single block, lives with the other `.zpb-fin` rules)

```css
.zpb-fin.zpb-fin-welcome p{position:absolute;left:0;right:0;font-size:clamp(1.4rem,4vw,2.4rem);opacity:0;transform:translateY(0);transition:opacity 1.4s ease,transform 3.6s cubic-bezier(.22,.61,.36,1);}
.zpb-fin.zpb-fin-welcome p.zpb-fin-in{opacity:1;}
.zpb-fin.zpb-fin-welcome p:nth-child(1){transform:translateY(-2em);}
.zpb-fin.zpb-fin-welcome p:nth-child(3){transform:translateY(2em);}
.zpb-fin.zpb-fin-welcome.zpb-wt-out p:nth-child(1),.zpb-fin.zpb-fin-welcome.zpb-wt-out p:nth-child(2){opacity:0;transition-duration:2.2s,3.6s;}
.zpb-fin.zpb-fin-welcome p.zpb-draft-center{transform:translateY(0);}
.zpb-fin.zpb-fin-welcome p.zpb-draft-fade{opacity:0;transition-duration:2.4s,3.6s;}
.zpb-fin.zpb-fin-welcome.zpb-fin-fadebg{opacity:0;transition:opacity 2.4s ease;}
```

⚠️ The explicit `.zpb-fin.zpb-fin-welcome p.zpb-fin-in{opacity:1}` rule is **required**: without it,
`.zpb-fin.zpb-fin-welcome p{opacity:0}` ties in specificity with `.zpb-fin p.zpb-fin-in` and the
later `opacity:0` wins — the words render invisible. The v14 suite caught this as "opacity 0,0,0".

## 4 · JS (the overlay builder + the kickoff gate)

```js
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
 at(200,  ()=>ps[0].classList.add('zpb-fin-in'));       // WELCOME — lingers alone for 3 s
 at(4600, ()=>{ ps[1].classList.add('zpb-fin-in'); ps[2].classList.add('zpb-fin-in'); }); // TO THE + DRAFT — the rest of the text lingers 3 s
 at(9000, ()=>ov.classList.add('zpb-wt-out'));          // 'welcome to the' fades out together
 at(9700, ()=>ps[2].classList.add('zpb-draft-center')); // DRAFT rises, more slowly, to the center
 at(16300, ()=>{                                        // DRAFT has lingered 3 s at the center and starts to fade — the CPU draft may begin
  try{ ps[2].classList.add('zpb-draft-fade'); ov.classList.add('zpb-fin-fadebg'); }catch(err){}
  fire();
 });
 at(18900, ()=>{ try{ ov.remove(); }catch(err){} window._zpbWelCleanup = null; });
};
```

At the **end of `startDraft2`** (never at the top — the synchronous reduced-motion callback must
not run before `draftSim` exists):

```js
 // W14-1/W15-1: the CPU draft starts ONLY when DRAFT begins to fade — zpbKick fires from zpbWelcomeCine
 const zpbKick = ()=>{ if(window._zpbKickStarted) return; window._zpbKickStarted = true; processUntilUserTurn(); };
 try{ if(typeof zpbWelcomeCine==='function') zpbWelcomeCine(zpbKick); else zpbKick(); }catch(err){ zpbKick(); }
```
with `window._zpbWelDone = false; window._zpbKickStarted = false;` reset at the top of `startDraft2`.

## 5 · Verify

`node _agents/zai/tools/v14_verify.js` (structure/gate, wave-14 timings) — the wave-15 suite
`v15_verify.js` §1 checks the new beats (WELCOME alone at 2 s, stack at 6.3 s, gate at 10.7 s /
15.9 s / 17.6 s). Both must pass before any build ships.
