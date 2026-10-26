<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NFL Draft Simulator — Header Option A</title>
<style>
  :root { --text:#e8ecf4; --sub:#94a3b8; --accent:#ffb3c6; --rose-soft:#ff6b9d; --border:rgba(255,255,255,.1); }
  body { background:#0a0e17; color:var(--text); font-family:system-ui, sans-serif; margin:0; padding:0; }
  .hero { display:flex; align-items:center; gap:16px; flex-wrap:wrap; padding:20px 22px; margin-bottom:18px; border-radius:20px; border:1px solid var(--border); position:relative; overflow:hidden; background:linear-gradient(160deg, rgba(255,107,157,.10), rgba(255,255,255,.03)); }
  .hero::after { content:"";position:absolute;right:-40px;top:-60px;width:260px;height:260px;border-radius:50%;background:radial-gradient(circle, rgba(255,215,0,.18), transparent 68%);pointer-events:none; }
  .hero-ball { font-size:2.6rem; filter:drop-shadow(0 6px 12px rgba(0,0,0,.4)); }
  .hero-text { flex:1; min-width:200px; }
  .hero h1 { font-size:2.1rem; margin:0; font-weight:900; background:linear-gradient(90deg,var(--text),var(--accent) 70%); -webkit-background-clip:text; background-clip:text; color:transparent; }
  .tagline { color:var(--sub); font-size:.95rem; margin-top:2px; }
  .stepper { list-style:none; display:flex; gap:6px; margin:0; padding:0; flex-wrap:wrap; }
  .stepper li { padding:6px 14px; border-radius:999px; border:1px solid var(--border); background:rgba(0,0,0,.14); color:var(--sub); font-size:.78rem; font-weight:700; text-transform:uppercase; }
  .stepper li.on { background:linear-gradient(90deg,var(--accent),var(--rose-soft)); color:#fff; border-color:transparent; }
</style>
</head>
<body>
  <div class="hero">
    <div class="hero-ball">🏈</div>
    <div class="hero-text">
      <h1>NFL Draft Simulator</h1>
      <div class="tagline">Draft your team. Play the season. Win the Super Bowl.</div>
    </div>
    <ol class="stepper"><li class="on">Draft</li><li>Season</li><li>Playoffs</li><li>Champion</li></ol>
  </div>
  <button class="resetbtn">Start Draft</button>
</body>
</html>
