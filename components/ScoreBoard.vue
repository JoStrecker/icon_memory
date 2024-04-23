<script setup lang="ts">
import type {Score} from "~/composables/useMemoryCard";

const props = defineProps<{ scores: Score[] }>()

function downloadCSV() {
  const csvContent = generateCSV();
  const blob = new Blob([csvContent], {type: 'text/csv'});
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'scores.csv';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

function generateCSV(): string {
  const headers = ['Runde', 'Zeit merken', 'Zeit auswählen', 'Richtig', 'Komplett'];
  const rows = props.scores.map(score => [
    score.round,
    getTotal(score) * 1.5,
    score.time,
    getCorrect(score),
    getTotal(score)
  ]);
  return [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
}

function getCorrect(score: Score): number {
  return parseInt(score.score.split('/')[0]);
}

function getTotal(score: Score): number {
  return parseInt(score.score.split('/')[1]);
}

function getRoundTime(score: Score): number {
  const totalScore = getTotal(score);
  return totalScore * 1.5; // Assuming each correct answer takes 1.5 seconds
}

</script>

<template>
  <div class="board">
    <span class="text">Bewertung</span>
    <table class="score-table">
      <tr style="border: 1px solid black; font-family: var(--font-medium)">
        <th>Runde</th>
        <th>Zeit merken</th>
        <th>Zeit auswählen</th>
        <th>Richtig</th>
        <th>Komplett</th>
      </tr>
      <tr style="border: 1px solid black; font-family: var(--font)" v-for="score in props.scores" :key="score.round">
        <td>{{ score.round }}</td>
        <td>{{ getRoundTime(score) }}</td>
        <td>{{ score.time }}</td>
        <td>{{ getCorrect(score) }}</td>
        <td>{{ getTotal(score) }}</td>
      </tr>
    </table>
    <GameButton @click="downloadCSV" title="Ergebnis als CSV herunterladen"/>
  </div>
</template>

<style scoped>
.board {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.score-table {
  border: 1px solid black;
  border-collapse: collapse;
  margin: 2em 0;
}

.score-table tr, th, td {
  border: 1px solid black;
}

.score-table th, td {
  border: 1px solid black;
  padding: .25em;
}
</style>
