import { writable } from 'svelte/store';

const teams = {
  kc: { key:'kc', name:'Kansas City Chiefs', primary:'#e31837', secondary:'#ffb81c' },
  sea: { key:'sea', name:'Seattle Seahawks', primary:'#002244', secondary:'#69be28' },
  dal: { key:'dal', name:'Dallas Cowboys', primary:'#003594', secondary:'#869397' },
};

export const team = writable(teams.kc);

export function setTeam(key) {
  if (teams[key]) team.set(teams[key]);
}

export { teams };
