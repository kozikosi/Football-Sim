# Mobile scroll-to-top bug (UI proposal)

Problem: clicking footer tabs (Madden Rankings, Position Rankings) scrolls to bottom on mobile.

Fix: on tab switch, call `window.scrollTo(0,0)` (or set scrollTop=0 on the scroll container) after render; and remove any `autofocus`/focus that jumps. Also ensure `hashchange`/tab click handlers don't preserve scroll.

Anchor: tab switch handlers (e.g., `showTab`, `tabBtn` click). Add `window.scrollTo({top:0,behavior:'instant'})` in the tab activation function.
