#!/usr/bin/env python3
"""Four-slice slope arithmetic — computed from the measured values, printed for the receipt."""
# Final framework-owned counts (wc -l, measured this sitting)
svelte = {'main': 6, 'App': 26, 'appStore': 68, 'Board': 61, 'TeamSelect': 35, 'Saves': 72, 'FeedPanel': 79}
vue    = {'main': 5, 'App': 30, 'appStore': 61, 'Board': 57, 'TeamSelect': 34, 'Saves': 71, 'FeedPanel': 74}
# Known slice-1 (filed receipt): App was 18 (svelte) / 20 (vue) then
s1_svelte, s1_vue = 103, 99   # main 6 + App 18 + FeedPanel 79 / main 5 + App 20 + FeedPanel 74
# Stage-2 measurement (taken in-flight, before the compile fixes):
st2_svelte = {'App': 19, 'appStore': 38, 'Board': 60}   # marginal: +1 root, 38 store, 60 screen
st2_vue    = {'App': 22, 'appStore': 40, 'Board': 57}   # marginal: +2 root, 40 store, 57 screen
# Glue blocks from the edit record (lines added to the store file per slice):
glue3 = {'svelte': 8, 'vue': 8}          # teams + chooseTeam
glue4 = {'svelte': 12, 'vue': 10}        # metaFor + loadIntoStore (+ the board nav line)
# Debugging overhead in the store file (compile/type fixes, from the fix edits):
fixes = {'svelte': 8, 'vue': 1}          # state_invalid_export getters + derived wrapper + re-export / BoardSort re-export

print('== FINAL framework-owned counts (the truth a maintainer owns) ==')
print('svelte:', svelte, 'total', sum(svelte.values()))
print('vue   :', vue,    'total', sum(vue.values()))
print('cross-check: slice1 (103/99) + root growth + store + screens:')
print('  svelte:', s1_svelte, '+', svelte['App'] - 18, '(root)', '+', svelte['appStore'], '(store)', '+', svelte['Board'], '+', svelte['TeamSelect'], '+', svelte['Saves'], '=', s1_svelte + (svelte['App'] - 18) + svelte['appStore'] + svelte['Board'] + svelte['TeamSelect'] + svelte['Saves'])
print('  vue   :', s1_vue, '+', vue['App'] - 20, '(root)', '+', vue['appStore'], '(store)', '+', vue['Board'], '+', vue['TeamSelect'], '+', vue['Saves'], '=', s1_vue + (vue['App'] - 20) + vue['appStore'] + vue['Board'] + vue['TeamSelect'] + vue['Saves'])

print('\n== cumulative (all framework-owned lines incl. root growth) ==')
cum_s = [s1_svelte,
         s1_svelte + (st2_svelte['App'] - 18) + st2_svelte['appStore'] + st2_svelte['Board'],
         s1_svelte + (st2_svelte['App'] - 18) + st2_svelte['appStore'] + st2_svelte['Board'] + glue3['svelte'] + 35 + 3,
         sum(svelte.values())]
cum_v = [s1_vue,
         s1_vue + (st2_vue['App'] - 20) + st2_vue['appStore'] + st2_vue['Board'],
         s1_vue + (st2_vue['App'] - 20) + st2_vue['appStore'] + st2_vue['Board'] + glue3['vue'] + 34 + 4,
         sum(vue.values())]
print('svelte 1->4:', cum_s)
print('vue    1->4:', cum_v)

print('\n== marginals per slice (screen + glue; root growth listed beside) ==')
m_s = [st2_svelte['appStore'] + st2_svelte['Board'], glue3['svelte'] + 35, glue4['svelte'] + 72]
m_v = [st2_vue['appStore'] + st2_vue['Board'], glue3['vue'] + 34, glue4['vue'] + 71]
print('svelte slices 2-4:', m_s, 'mean', sum(m_s) / 3, '(root growth +8 total)')
print('vue    slices 2-4:', m_v, 'mean', sum(m_v) / 3, '(root growth +10 total)')
R = (sum(m_v) / 3) / (sum(m_s) / 3)
R_total = cum_v[3] / cum_s[3]
print(f'R (primary, mean marginal vue/svelte) = {R:.4f}')
print(f'R_total (cumulative vue/svelte at slice 4) = {R_total:.4f}')
print(f'bands: fires < 0.85 · svelte-better > 1.18 · else inside-the-band')
print(f'svelte marginal advantage if read the other way: 1/R = {1/R:.4f}')

print('\n== four-slice bundle (this sitting) ==')
vue_js = (367559, 114553); svelte_js = (340370, 103607)
print('vue js:', vue_js, '· svelte js:', svelte_js, '· css identical 6598 raw both')
print('JS-only gz delta (toward svelte):', vue_js[1] - svelte_js[1], 'B; raw delta:', vue_js[0] - svelte_js[0], 'B')
print('slice-1 JS-only gz delta (filed): 11569 B')
