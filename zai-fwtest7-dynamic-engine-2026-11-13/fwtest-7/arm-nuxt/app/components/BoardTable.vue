<script setup lang="ts">
import { arrowFor } from '../state';
import type { PriorityRow, SlotId } from '../engine-contract/index.ts';

defineProps<{ board: PriorityRow[]; teamSlots: Readonly<Record<SlotId, number>>; focusLabel: string }>();
</script>

<template>
  <section data-testid="board">
    <h2>The draft board <span class="tag">focus: {{ focusLabel }}</span></h2>
    <p class="law">Wins are the static truth — the focus moves Priority only.</p>
    <table>
      <thead><tr><th>Slot</th><th>OVR</th><th>Wins</th><th>Priority</th><th>Form</th></tr></thead>
      <tbody>
        <tr v-for="r in board" :key="r.slot" :data-testid="`row-${r.slot}`">
          <td>{{ r.slot }}</td>
          <td>{{ teamSlots[r.slot] }}</td>
          <td>{{ r.wins.toFixed(2) }}</td>
          <td class="priority" :data-testid="`priority-${r.slot}`">{{ r.priority }}</td>
          <td>
            <span v-if="arrowFor(r.slot)" class="arrow" :class="arrowFor(r.slot)"
              :title="arrowFor(r.slot) ?? undefined" :aria-label="`form: ${arrowFor(r.slot)}`" />
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
