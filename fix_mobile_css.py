with open('/Users/kosi/Desktop/Football Sim/Madden NFL 27 Team Power Rankings & Draft Simulator (7).html', 'r') as f:
    content = f.read()

old_css = '''/* ---- phone layout: smaller base text, stacked columns, scrollable tables ---- */
@media (max-width:760px){
  html{font-size:16px;}
  .draft-columns{grid-template-columns:1fr !important;}
  .panel{padding-left:12px !important;padding-right:12px !important;}
  table{display:block;max-width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch;}
  .tabs{flex-wrap:wrap;}
  .filters{flex-wrap:wrap;}
  .score-line{grid-template-columns:1fr !important;text-align:center;}
  .sl-team{text-align:center !important;}
  select,input[type=text],input[type=search]{max-width:100% !important;}
  .depth-row{flex-wrap:wrap;}
  h1{font-size:1.2rem;}
  .chipbar,.filters,#draftChips{flex-wrap:wrap !important;}
  .panel{max-width:100%;overflow-x:auto;min-width:0;}
  .view,.panel>div{min-width:0;}
}'''

new_css = '''/* ---- phone layout: smaller base text, stacked columns, scrollable tables ---- */
@media (max-width:760px){
  html{font-size:16px;}
  .draft-columns{grid-template-columns:1fr !important;}
  .panel{padding-left:12px !important;padding-right:12px !important;}
  table{display:block;max-width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch;}
  .tabs{flex-wrap:wrap;}
  .filters{flex-wrap:wrap;}
  .score-line{grid-template-columns:1fr !important;text-align:center;}
  .sl-team{text-align:center !important;}
  select,input[type=text],input[type=search]{max-width:100% !important;}
  .depth-row{flex-wrap:wrap;}
  h1{font-size:1.2rem;}
  .chipbar,.filters,#draftChips{flex-wrap:wrap !important;}
  .panel{max-width:100%;overflow-x:auto;min-width:0;}
  .view,.panel>div{min-width:0;}
  
  /* Draft board: table -> stacked cards */
  #draftTableWrap{table-layout:fixed;}
  #draftTable2 thead{display:none;}
  #draftTable2 tbody{display:block;}
  #draftTable2 tr{display:block;margin-bottom:12px;padding:10px;background:var(--panel2);border:1px solid var(--border);border-radius:8px;}
  #draftTable2 td{display:flex;justify-content:space-between;padding:4px 0;border:none;font-size:0.85rem;}
  #draftTable2 td::before{content:attr(data-label);font-weight:600;color:var(--sub);font-size:0.75rem;}
  #draftTable2 td:first-child::before{content:'Player';}
  #draftTable2 td:nth-child(2)::before{content:'Pos';}
  #draftTable2 td:nth-child(3)::before{content:'Team';}
  #draftTable2 td:nth-child(4)::before{content:'OVR';}
  #draftTable2 td:nth-child(5)::before{content:'Wins';}
  #draftTable2 td:nth-child(6)::before{content:'Value';}
  #draftTable2 td:nth-child(7)::before{content:'Priority';}
  #draftTable2 td:nth-child(8)::before{content:'Gone%';}
  #draftTable2 td:nth-child(9)::before{content:'Fills';}
  #draftTable2 td:last-child::before{content:'Action';}
  
  /* Draft priority chart - stack bars */
  .pr-row{grid-template-columns:1fr;gap:4px;}
  .pr-row>div:first-child{font-weight:700;}
  .pr-bar{height:8px;margin-top:4px;}
  
  /* Chips - smaller, wrap */
  .chip{font-size:0.7rem;padding:2px 3px 2px 8px;}
  .chip .star{font-size:0.65rem;padding:0 4px;}
  
  /* Lineup editor - stack columns */
  .draft-columns[style*="grid-template-columns:1fr 1fr 1fr"]{grid-template-columns:1fr !important;}
  .depth-group{padding-left:8px;}
  .depth-row.lgrid{grid-template-columns:auto 1fr auto !important;gap:6px;}
  .depth-row.lgrid .slotname{min-width:50px;}
  .depth-row.lgrid select{font-size:0.75rem;padding:2px 4px;}
  .depth-row.dgrid{grid-template-columns:auto 1fr auto auto !important;}
  
  /* Stars faceoff - stack columns */
  .draft-columns[style*="grid-template-columns:1fr 1fr"]{grid-template-columns:1fr !important;gap:12px;}
  .sfrow{font-size:0.8rem;padding:4px 6px;}
  
  /* Matchup card - stack */
  .matchup-card{grid-template-columns:1fr !important;gap:8px;text-align:center;}
  .matchup-card .mc-vs{margin:8px 0;}
  .mtag{padding:8px 12px;margin:0 0 10px;}
  
  /* Score line - stack */
  .score-line{grid-template-columns:1fr !important;gap:6px;}
  .sl-score{font-size:1.5rem;}
  
  /* Bracket - stack */
  .bracket-game.bg3{grid-template-columns:1fr !important;gap:4px;text-align:center;}
  .bracket-game.bg3>span:first-child,.bracket-game.bg3>span:last-child{text-align:center;}
  .bracket-game.bg3>span:nth-child(2){font-weight:700;color:var(--sub);}
  
  /* Team stats table */
  .divtable table{font-size:0.75rem;}
  
  /* Player browser table */
  #playerTable thead{display:none;}
  #playerTable tbody{display:block;}
  #playerTable tr{display:block;margin-bottom:8px;padding:8px;background:var(--panel2);border:1px solid var(--border);border-radius:8px;}
  #playerTable td{display:flex;justify-content:space-between;padding:2px 0;border:none;}
  #playerTable td::before{content:attr(data-col);font-weight:600;color:var(--sub);font-size:0.7rem;text-transform:uppercase;}
  
  /* Position rankings table */
  #groupTable thead{display:none;}
  #groupTable tbody{display:block;}
  #groupTable tr{display:block;margin-bottom:8px;padding:8px;background:var(--panel2);border:1px solid var(--border);border-radius:8px;}
  #groupTable td{display:flex;justify-content:space-between;padding:2px 0;border:none;}
  #groupTable td::before{content:attr(data-label);font-weight:600;color:var(--sub);font-size:0.7rem;}
  
  /* Team comparison tables */
  #homeCmpResult table thead{display:none;}
  #homeCmpResult table tbody{display:block;}
  #homeCmpResult table tr{display:block;margin-bottom:8px;padding:8px;background:var(--panel2);border:1px solid var(--border);border-radius:8px;}
  #homeCmpResult table td{display:flex;justify-content:space-between;padding:2px 0;border:none;}
  #homeCmpResult table td::before{content:attr(data-label);font-weight:600;color:var(--sub);font-size:0.7rem;}
  
  /* Guide - smaller text */
  #guideBody details{font-size:0.9rem;}
  #guideBody summary{font-size:1rem;}
  
  /* League leaders tables */
  .divtable{overflow-x:auto;}
  .divtable table{font-size:0.7rem;}
  
  /* Game recap - ensure text wraps */
  .detail-item{word-wrap:break-word;overflow-wrap:break-word;}
  .pbp{font-size:0.9rem;}
  
  /* Season review */
  #seasonReview details{font-size:0.9rem;}
  
  /* 100-season report */
  #league100 details{font-size:0.9rem;}
  
  /* Playoff awards */
  .draft-columns[style*="grid-template-columns:1fr 1fr"]{grid-template-columns:1fr !important;}
  
  /* Ensure no horizontal overflow anywhere */
  body,html,.wrap{overflow-x:hidden;max-width:100vw;}
  *{max-width:100%;box-sizing:border-box;}
}'''

if old_css in content:
    content = content.replace(old_css, new_css)
    with open('/Users/kosi/Desktop/Football Sim/Madden NFL 27 Team Power Rankings & Draft Simulator (7).html', 'w') as f:
        f.write(content)
    print('Done!')
else:
    print('NOT FOUND')
    # Find the media query
    idx = content.find('/* ---- phone layout')
    if idx >= 0:
        print('Found at:', idx)
        print(content[idx:idx+500])