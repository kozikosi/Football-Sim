import os, pandas as pd, numpy as np
DATA=os.environ.get('NFLVERSE_DIR',os.path.join(os.path.dirname(os.path.abspath(__file__)),'data'))   # fetch.sh fills it; gitignored
COLS=['game_id','play_id','season_type','week','posteam','defteam','home_team','away_team','qtr','drive','down','ydstogo','yardline_100','game_seconds_remaining','half_seconds_remaining','score_differential','posteam_score','defteam_score','play_type','yards_gained','penalty','sack','interception','fumble_lost','fumble','touchdown','safety','field_goal_result','kick_distance','return_yards','punt_blocked','fixed_drive','fixed_drive_result','drive_play_count','drive_time_of_possession','drive_start_yard_line','drive_end_transition','pass_attempt','rush_attempt','complete_pass','qb_kneel','qb_spike','qb_scramble','air_yards','yards_after_catch','touchback','two_point_attempt','extra_point_result','timeout','posteam_timeouts_remaining','defteam_timeouts_remaining','kickoff_returner_player_id','special_teams_play','play_deleted','wp','ep','epa','score_differential_post','total_home_score','total_away_score','drive_ended_with_score','series_success','goal_to_go','shotgun','no_huddle','td_team','two_point_conv_result','punt_blocked','kickoff_attempt','extra_point_attempt','field_goal_attempt','kicker_player_id','defensive_two_point_attempt','return_team','lateral_recovery','pass_defense_1_player_id','out_of_bounds']
def load(years):
    fs=[]
    for y in years:
        d=pd.read_parquet(os.path.join(DATA,f'play_by_play_{y}.parquet'))
        d=d[[c for c in COLS if c in d.columns]].copy(); d['season']=y; fs.append(d)
    return pd.concat(fs,ignore_index=True)
