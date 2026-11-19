<script setup lang="ts">
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
