<script setup lang="ts">
import type {Score} from "~/composables/useMemoryCard";

const props = defineProps<{ scores: Score[] }>()
</script>

<template>
  <div class="board">
    <span class="text">Bewertung</span>
    <div v-for="score in props.scores" :key="score.round" class="score">
      <span class="text small">{{ score.round }}</span>
      <span class="text small">{{ score.score }}</span>
      <span class="text small">{{ score.time }}</span>
    </div>
  </div>
</template>

<style scoped>
.board {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.score {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
}
</style>
