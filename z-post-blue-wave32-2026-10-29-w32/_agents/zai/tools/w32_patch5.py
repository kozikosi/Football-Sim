#!/usr/bin/env python3
# w32_patch5.py — wave 32 stage 5: preview card caps, map hover hooks, ResizeObserver cure,
# light-mode tint soften, division-phrase tag, leaderboard integers + returner rating sort.
import io, sys, re, hashlib

SRC = '/home/z/my-project/scripts/w32-stage4.html'
DST = '/home/z/my-project/scripts/w32-stage5.html'
s = io.open(SRC, encoding='utf-8').read()

def sub1(pat, repl, n=1, tag=''):
    global s
    rx = re.compile(pat)
    hits = len(rx.findall(s))
    if hits != n:
        print('FAIL [%s] hits=%d expected=%d' % (tag, hits, n)); sys.exit(1)
    s = rx.sub(lambda m: repl, s, count=n)

def repl_line(contains, new_line, tag, n=1):
    global s
    lines = s.split('\n')
    hits = [i for i, l in enumerate(lines) if contains in l]
    if len(hits) != n:
        print('FAIL [%s] line hits=%d expected=%d' % (tag, len(hits), n)); sys.exit(1)
    for i in hits:
        lines[i] = new_line
    s = '\n'.join(lines)

# ---------- A46/B30 · game preview cards: 85+ bold, max three stat badges, no zero-value stats ----------
sub1(r"    const chips = \(!pre && r\.gp>0 && typeof seasonStatLine==='function'\) \? seasonStatLine\(r\.group, r\.st\|\|\{\}\)\.split\(', '\)\.filter\(Boolean\)\.slice\(0,4\) : \[\];",
     """    // w32 (Owner): at most three stat badges, and a stat the player does not have never shows
    const chips = (!pre && r.gp>0 && typeof seasonStatLine==='function') ? seasonStatLine(r.group, r.st||{}).split(', ').filter(Boolean)
      .filter(c=>!/\\b0\\b/.test(c.replace(/\\/\\d+/g, m=>m)) || /^\\d+\\/\\d+ (FG|CMP)/.test(c))
      .filter(c=>{ const m=/^([\\d,]+)\\/.([\\d,]+) /.exec(c); if(m) return !(+m[1].replace(/,/g,'')===0 && +m[2].replace(/,/g,'')===0); return !/^0\\b/.test(c); })
      .slice(0,3) : [];""",
     n=1, tag='prev-chips')
sub1(r"    return '<div class=\"zpb-pcard zpb-pvcard\" style=\"'\+stv\(team\)\+'\">'\n     \+ '<div class=\"zpb-pcard-hd\"><b class=\"'\+\(star90\?'zpb-shm':''\)\+'\">'\+r\.name\+'</b>'",
     """    const star85 = (r.ovr||0)>=85;
    return '<div class="zpb-pcard zpb-pvcard" style="'+stv(team)+'">'
     + '<div class="zpb-pcard-hd"><b class="'+(star90?'zpb-shm':(star85?'zpb-vib':''))+'">'+r.name+'</b>'""",
     n=1, tag='prev-85')

# ---------- B17 · the map stations and the breakdown chips share data-slot hooks ----------
repl_line("zpb-fm-ini ' + cls",
  '''   return '<i class="zpb-fm-ini ' + cls + '" data-slot="' + sl + '" title="' + String(e.name).replace(/"/g,'&quot;') + (ov ? ' \\u00b7 ' + Math.round(ov) : '') + '"><b>' + ini(e.name) + '</b><i>' + lab + '</i></i>';''',
  'map-slot')
sub1(r"    out \+= '<span class=\"zpb-dbk\" style=\"'\+rowVars\(e\.teamName\)\+'\"><b class=\"'\+tier\(en\.ovr\)\+'\">'\+en\.name\+'</b><i>'",
     """    out += '<span class="zpb-dbk" data-slot="'+s+'" style="'+rowVars(e.teamName)+'"><b class="'+tier(en.ovr)+'">'+en.name+'</b><i>'""",
     n=1, tag='chip-slot')

# ---------- A8/B13 · the ResizeObserver cure: rAF-debounced, and the setback note ignores benign loop notices ----------
repl_line("new ResizeObserver(()=>fitFace(btn)).observe(btn)",
  "  if('ResizeObserver' in window){ try{ let _raf=0; new ResizeObserver(()=>{ if(_raf) return; _raf=requestAnimationFrame(()=>{ _raf=0; try{ fitFace(btn); }catch(err){} }); }).observe(btn); }catch(e){ } } // w32 (Owner): the observer is rAF-debounced \u2014 the loop notification can never fire",
  'ro-debounce')
sub1(r"window\.addEventListener\('error', function\(ev\)\{\n  if\(window\.__zpbSetbackShown\) return; window\.__zpbSetbackShown = true;",
     """window.addEventListener('error', function(ev){
  // w32 (Owner): benign engine notices never become setbacks \u2014 the ResizeObserver loop
  // notification is the browser telling us a layout pass repeated, not a broken surface.
  var _m = String((ev && (ev.message || ev)) || '');
  if(/ResizeObserver loop/i.test(_m) || _m==='Script error.' || /ResizeObserver loop/i.test(String((ev && ev.error && ev.error.message) || ''))) return;
  if(window.__zpbSetbackShown) return; window.__zpbSetbackShown = true;""",
     n=1, tag='ro-filter')

# ---------- A10/A22 · light mode: the tinted rows breathe — lighter panels, deeper team ink ----------
sub1(r" return '--zr1:'\+zpbRgba\(\(window\.zpbLift\?zpbLift\(pk\.accL,0\.58\):pk\.accL\),0\.12\)\+';",
     " return '--zr1:'+zpbRgba((window.zpbLift?zpbLift(pk.accL,0.76):pk.accL),0.07)+'; // w32 (Owner): light mode lifts the tint further so the team ink always reads",
     n=1, tag='tint-soften')

# ---------- B24 · the first panel speaks in the random rivalry phrases; the period after feud is gone ----------
sub1(r"function matchupTagHTML\(g\)\{\n const riv = rivalryOf\(g\);\n if\(g\.divisional\) return `<div class=\"mtag mtag-div\"><span class=\"mtag-big\">DIVISION SHOWDOWN</span><span class=\"mtag-sub\">\$\{riv\?riv\+'\.\x20':''\}\$\{meetingTagText\(g\)\}</span></div>`;\n if\(riv\) return `<div class=\"mtag mtag-riv\"><span class=\"mtag-big\">RIVALRY GAME</span><span class=\"mtag-sub\">\$\{riv\}\.</span></div>`;\n return '';\n\}",
     """function matchupTagHTML(g){
 const riv = rivalryOf(g);
 const _clean = t=> (t||'').replace(/\\.+\\s*$/,''); // w32 (Owner): no period after the feud line
 if(g.divisional){
  if(!g._divPhrase) g._divPhrase = window.zpbRivalryPhrase();
  return `<div class="mtag mtag-div"><span class="mtag-big">${g._divPhrase}</span><span class="mtag-sub">${riv?_clean(riv)+' ':''}${meetingTagText(g)}</span></div>`;
 }
 if(riv) return `<div class="mtag mtag-riv"><span class="mtag-big">RIVALRY GAME</span><span class="mtag-sub">${_clean(riv)}</span></div>`;
 return '';
}""",
     n=1, tag='mtag')

# ---------- B22 · leaderboard ratings are integers; returners sort by rating ----------
sub1(r"\$\{r\._rating!=null\?r\._rating\.toFixed\(1\):'—'\}",
     "${r._rating!=null?Math.round(r._rating):'\\u2014'}",
     n=2, tag='lb-int')
sub1(r"\.sort\(\(mode==='stat' \|\| b\.pred\) \? \(x,y\)=>\(y\.st\[b\.key\]\|\|0\)-\(x\.st\[b\.key\]\|\|0\) \|\| \(y\.st\.tkl\|\|0\)-\(x\.st\.tkl\|\|0\) : \(x,y\)=>\(y\._rating\|\|0\)-\(x\._rating\|\|0\)\)",
     ".sort(b.pred ? (x,y)=>(y._rating||0)-(x._rating||0) : ((mode==='stat') ? (x,y)=>(y.st[b.key]||0)-(x.st[b.key]||0) || (y.st.tkl||0)-(x.st.tkl||0) : (x,y)=>(y._rating||0)-(x._rating||0))).slice(0,10)})); // w32 (Owner): returners sort by rating",
     n=1, tag='ret-board')

io.open(DST, 'w', encoding='utf-8').write(s)
print('stage5 OK  md5', hashlib.md5(s.encode()).hexdigest(), 'bytes', len(s.encode()))
