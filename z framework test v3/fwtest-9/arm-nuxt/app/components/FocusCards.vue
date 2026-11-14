<script setup lang="ts">
import { FOCUS_LIST, picked } from '../state';

function select(id: string) { picked.value = id; }
</script>

<template>
  <div class="cards" role="radiogroup" aria-label="offensive focus">
    <button
      v-for="f in FOCUS_LIST" :key="f.id"
      class="card" :class="{ selected: picked === f.id }"
      :data-testid="`focus-${f.id}`" @click="select(f.id)"
    >
      <strong>{{ f.label }}</strong>
      <span>{{ f.blurb }}</span>
    </button>
  </div>
</template>
