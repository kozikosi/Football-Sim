// DS tools-eval part 3: PrimeVue 4 DataTable (the ready-made grid the Vue arm would import).
import fs from 'node:fs';
import path from 'node:path';
const ROOT = '/private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/ds-c81/tools-eval/vu-base/prime';
const write = (f, b) => { const p = path.join(ROOT, f); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, b); };
write('index.html', `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>eval</title></head><body><div id="app"></div><script type="module" src="/src/main.ts"></script></body></html>\n`);
write('vite.config.js', `import vue from '@vitejs/plugin-vue';\nexport default { plugins: [vue()] };\n`);
write('src/data.ts', `export type Row = { id: string; name: string; pos: string; ovr: number; gp: number; rating: number; yds: number; td: number; int: number; fp: number };
const POS = ['QB','RB','WR','TE','OL','DL','LB','DB','K'];
export const rows: Row[] = Array.from({ length: 32 }, (_, i) => ({ id: 'p' + i, name: 'Player ' + (i + 1), pos: POS[i % 9], ovr: 60 + ((i * 7) % 38), gp: 1 + (i % 17), rating: 50 + ((i * 13) % 50), yds: 100 + ((i * 137) % 1400), td: (i * 3) % 14, int: i % 9, fp: 10 + ((i * 5) % 30) }));
`);
write('src/main.ts', `import { createApp } from 'vue';\nimport PrimeVue from 'primevue/config';\nimport Aura from '@primevue/themes/aura';\nimport App from './App.vue';\ncreateApp(App).use(PrimeVue, { theme: { preset: Aura } }).mount('#app');\n`);
write('src/App.vue', `<script setup lang="ts">
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { rows } from './data';
const expanded = ref<any[]>([]);
</script>

<template>
  <main>
    <DataTable :value="rows" v-model:expandedRows="expanded" dataKey="id" removableSort size="small">
      <Column field="name" header="Player" sortable />
      <Column field="pos" header="Pos" sortable />
      <Column field="ovr" header="OVR" sortable />
      <Column field="gp" header="GP" sortable />
      <Column field="rating" header="Rating" sortable />
      <Column field="yds" header="Yards" sortable />
      <Column field="td" header="TD" sortable />
      <template #expansion="{ data }"><p>Season splits · FP {{ data.fp }} · INT {{ data.int }}</p></template>
    </DataTable>
  </main>
</template>
`);
console.log('wrote the PrimeVue variant');
