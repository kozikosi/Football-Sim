// zpb-lab-inpage.js — the w79 shell lab, injected into the page (Z.ai, 7 Nov 2026)
// The testing apparatus for the Owner's weight/flex questions, run against the REAL shell engine:
// seeded drafts (32 CPU teams), the w66 natural-first lineup optimizer, and the 85+ placement scan.
// Classes (Claude's flexcap definitions, shell edition):
//   drive     — an 85+ player who is the BEST of his role on that roster, placed through a >=10 rule
//               into a slot that weighs MORE than his role's best natural slot. The Owner's driver.
//   small     — the same placement through a 2 or 4 rule (the Owner left these alone; REPORTED, never driving)
//   second    — a surplus star of his role (rank k > 1; no top slot of his own)
//   emergency — the -8 last-spot fill
window.zpbLab = (function(){
  const STARS = ['Trey McBride','Brock Bowers','George Kittle','Travis Kelce','Sam LaPorta',
    'Bijan Robinson','Christian McCaffrey','Jahmyr Gibbs','Derrick Henry','Saquon Barkley',
    'Christian Gonzalez','Pat Surtain II','Sauce Gardner',
    'Joe Thuney','Chris Lindstrom','Quenton Nelson','Creed Humphrey','Tyler Linderbaum','Frank Ragnow',
    'Derrick Brown','Jeffery Simmons','Chris Jones',
    'Fred Warner','Roquan Smith','Zack Baun','Foyesade Oluokun',
    'Kyle Hamilton','Antoine Winfield Jr.','Jessie Bates III','Brian Branch'];
  function mulberry32(a){ return function(){ a|=0; a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15, 1|a); t=t+Math.imul(t^t>>>7, 61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
  function clearCaches(){ try{ _wTable=null; _wpoCache=null; _replStatic=null; _warCache.clear(); for(const k in _fpc) delete _fpc[k]; }catch(e){} }
  function setWeights(w){ window.zpbLabWeights = w ? {...w} : null; clearCaches(); }
  function runDraft(seed){
    Math.random = mulberry32(seed);
    clearCaches();
    const teamNames = Object.keys(TEAM_DATA);
    const rosters = []; for(let i=0;i<32;i++) rosters.push({slots:{}, isUser:i===0, teamName: teamNames[i]});
    draftSim = { userIndex:0, rosters, teamNames,
      pool: PLAYERS.filter(p=>POS_SLOT_MAP[p[1]]).sort((a,b)=>(b[3]-a[3])||(a[0]<b[0]?-1:1)),
      order: buildSnakeOrder(), pos:0, log:[], awaitingUser:false, undoUsedRound:null,
      bias:{}, noiseSd:{}, missP:{} };
    let guard = 0;
    while(draftSim.pos < draftSim.order.length && guard++ < 5000){
      const t = draftSim.order[draftSim.pos];
      const roster = draftSim.rosters[t];
      if(firstOpenSlotAny(roster)===null){ draftSim.pos++; continue; }
      const pk = cpuPick(t);
      if(pk && pk.slot) executePick(t, pk.player, pk.slot); else draftSim.pos++;
    }
    return draftSim;
  }
  // slot weight of a role's best natural slot (the Owner's "encouraged" yardstick)
  function roleNatWeight(tag, W){ // W = weight reader (zpbSlotWeight)
    const slots = (typeof NATURAL_SLOT_MAP!=='undefined' && NATURAL_SLOT_MAP[tag]) || [];
    let best = 0; slots.forEach(s=>{ const v = W(s); if(v>best) best=v; }); return best;
  }
  function scanDraft(seed, minOvr){
    const S = runDraft(seed);
    const W = s => (window.zpbLabWeights && window.zpbLabWeights[s]!=null) ? window.zpbLabWeights[s] : (ZPB_SLOTS_W[s]||10);
    const out = { seed, placements:[], counts:{drive:0,small:0,second:0,emergency:0}, stars:0 };
    const whoSeen = {};
    S.rosters.forEach(r=>{
      const rank = {};
      Object.keys(r.slots).forEach(sl=>{ const p=r.slots[sl]; const arr=rank[p[1]]=rank[p[1]]||[];
        arr.push({name:p[0], ovr:p[3], slot:sl}); });
      Object.values(rank).forEach(a=>a.sort((x,y)=>y.ovr-x.ovr));
      const rankOf = (tag,name)=>{ const a=rank[tag]||[]; const i=a.findIndex(x=>x.name===name); return i<0?1:i+1; };
      const lu = optimalLineup(r.slots);
      ROSTER_SLOTS.forEach(sl=>{
        const p = lu[sl]; if(!p) return;
        if(p[3] < minOvr) return;
        out.stars++;
        const nat = isNaturalSlot(p[1], sl);
        const pen = flexPenaltyFor(p[1], sl);
        const natW = roleNatWeight(p[1], W), slotW = W(sl);
        const k = rankOf(p[1], p[0]);
        const isStar = STARS.indexOf(p[0])>=0;
        if(!nat && pen>0){
          const cls = pen>=10 ? (k>1?'second':'drive') : (pen>=8 ? 'emergency' : 'small');
          const encouraged = slotW > natW; // the Owner's test: the target outweighs his role's best natural slot
          if(isStar) (whoSeen[p[0]] = whoSeen[p[0]]||[]).push({slot:sl, pen, ovr:p[3], team:r.teamName, cls: encouraged?cls:cls+'(not-encouraged)'});
          if(encouraged){
            out.counts[cls] = (out.counts[cls]||0)+1;
            out.placements.push({seed, team:r.teamName, name:p[0], pos:p[1], ovr:p[3], slot:sl, pen, k, cls});
          } else {
            out.counts.other = (out.counts.other||0)+1;
          }
        } else if(isStar){
          (whoSeen[p[0]] = whoSeen[p[0]]||[]).push({slot:sl, pen:0, ovr:p[3], team:r.teamName, cls:'natural'});
        }
      });
    });
    out.who = whoSeen;
    return out;
  }
  function flexScan(seeds, minOvr){
    const agg = {seeds:[], counts:{drive:0,small:0,second:0,emergency:0,other:0}, placements:[], stars:0, perDraft:[]};
    const who = {};
    seeds.forEach(s=>{
      const r = scanDraft(s, minOvr||85);
      agg.seeds.push(s); agg.stars += r.stars;
      Object.keys(agg.counts).forEach(k=> agg.counts[k] += r.counts[k]||0);
      agg.placements = agg.placements.concat(r.placements.slice(0, 40));
      Object.keys(r.who).forEach(n=>{ who[n] = (who[n]||[]).concat(r.who[n]); });
      agg.perDraft.push({seed:s, drive:r.counts.drive||0, small:r.counts.small||0, second:r.counts.second||0});
    });
    agg.who = {};
    Object.keys(who).forEach(n=>{
      const nat = who[n].filter(x=>x.cls==='natural').length;
      const flex = who[n].filter(x=>x.cls!=='natural');
      agg.who[n] = {n: who[n].length, natural: nat, flexed: flex.length,
        bySlot: flex.reduce((m,x)=>{ const k=x.slot+' -'+x.pen; m[k]=(m[k]||0)+1; return m; }, {}),
        sample: flex.slice(0,6).map(x=>x.slot+' -'+x.pen+' ('+x.cls+')')};
    });
    return agg;
  }
  function draftSummary(seed){
    const S = runDraft(seed);
    const picks = S.log.filter(l=>l.round<=3).map(l=>l.player[1]);
    const byPos = {}; picks.forEach(p=>byPos[p]=(byPos[p]||0)+1);
    const filled = S.rosters.map(r=>ROSTER_SLOTS.filter(s=>r.slots[s]).length);
    const scores = S.rosters.map(r=>lineupWins(optimalLineup(r.slots)));
    return {seed, r1to3:byPos, minFilled:Math.min(...filled), avgFilled:filled.reduce((a,b)=>a+b,0)/filled.length,
      avgWins: scores.reduce((a,b)=>a+b,0)/scores.length};
  }
  function teamRankings(){
    // the Madden rankings order under the CURRENT weights (real-roster math, not the draft)
    const rows = Object.keys(TEAM_DATA).map(team=>{
      let sum=0, tw=0;
      for(const s in weights){ const w = weights[s]||0; const e = TEAM_DATA[team][s]; if(!e) continue; sum += w*(e.ovr||70); tw += w; }
      return {team, score: tw? sum/tw : 0};
    }).sort((a,b)=>b.score-a.score);
    return rows;
  }
  function sweep(baseWeights, deltas, seeds){
    // per-slot weight deltas -> downstream report (CPU draft emphasis, star placements, rankings, wins)
    const out = { baseline:null, runs:[] };
    setWeights(null);
    const baseDrafts = seeds.map(s=>draftSummary(s));
    const baseScan = flexScan(seeds, 85);
    const baseRank = teamRankings().slice(0,10).map(r=>r.team.slice(0,3)).join(',');
    out.baseline = {drafts:baseDrafts, scan:baseScan.counts, rankTop10:baseRank,
      stars:baseScan.stars, who:baseScan.who};
    deltas.forEach(d=>{
      setWeights({[d.slot]: Math.max(0, (ZPB_SLOTS_W[d.slot]||0)+d.delta)});
      const drafts = seeds.map(s=>draftSummary(s));
      const scan = flexScan(seeds, 85);
      const rank = teamRankings().slice(0,10).map(r=>r.team.slice(0,3)).join(',');
      out.runs.push({slot:d.slot, delta:d.delta, w:(ZPB_SLOTS_W[d.slot]||0)+d.delta,
        r1top: drafts[0].r1to3, drive:scan.counts.drive, small:scan.counts.small,
        rankChanged: rank!==baseRank, rankTop10: rank,
        avgWinsBase: baseDrafts.reduce((a,b)=>a+b.avgWins,0)/baseDrafts.length,
        avgWinsNow: drafts.reduce((a,b)=>a+b.avgWins,0)/drafts.length,
        whoChanged: JSON.stringify(scan.who) !== JSON.stringify(baseScan.who)});
      setWeights(null);
    });
    return out;
  }
  return { runDraft, scanDraft, flexScan, draftSummary, teamRankings, sweep, setWeights, STARS };
})();
