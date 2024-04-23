<script setup lang="ts">
import type {Score} from "~/composables/useMemoryCard";

const props = defineProps<{ scores: Score[] }>()
</script>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ScoreTable',
  methods: {
    downloadCSV() {
      const csvContent = this.generateCSV();
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'scores.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    },
    generateCSV(): string {
      const headers = ['Runde', 'Zeit merken', 'Zeit auswählen', 'Richtig', 'Komplett'];
      const rows = this.scores.map(score => [
        score.round,
        this.getTotal(score) * 1.5,
        score.time,
        this.getCorrect(score),
        this.getTotal(score)
      ]);
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');
      return csvContent;
    },
    getCorrect(score: Score): number {
      return parseInt(score.score.split('/')[0]);
    },
    getTotal(score: Score): number {
      return parseInt(score.score.split('/')[1]);
    },
    getRoundTime(score: Score): number {
      const totalScore = this.getTotal(score);
      return totalScore * 1.5; // Assuming each correct answer takes 1.5 seconds
    }
  }
});
</script>

<template>
  <div class="board">
    <span class="text">Bewertung</span>
    <table class="score-table">
      <tr style="border: 1px solid black">
        <th>Runde</th>
        <th>Zeit merken</th>
        <th>Zeit auswählen</th>
        <th>Richtig</th>
        <th>Komplett</th>
      </tr>
      <tr style="border: 1px solid black" v-for="score in props.scores" :key="score.round">
        <td>{{ score.round }}</td>
        <td>{{ getRoundTime(score) }}</td>
        <td>{{ score.time }}</td>
        <td>{{ getCorrect(score) }}</td>
        <td>{{ getTotal(score) }}</td>
      </tr>
    </table>
    <button id="download-csv" @click="downloadCSV">Ergebnis als CSV herunterladen</button>
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

.score-table{
  border: 1px solid black;
  border-collapse: collapse;
  margin: 2em 0;
}

.score-table tr, th, td{
  border: 1px solid black;
}

.score-table th, td{
  border: 1px solid black;
  padding: .25em;
}

#download-csv{
  background-color: var(--primary-color);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  max-width: 30rem;
  width: 100%;
  height: 3.75rem;
  overflow: hidden;
  padding: 0.63rem 1.25rem;
  box-sizing: border-box;
  text-align: center;
  font-size: var(--standard-size);
  color: var(--light-color);
  font-family: var(--font-medium);
  margin: 0 auto
}

#download-csv:enabled {
  cursor: pointer;
}

#download-csv:hover {
  background-color: var(--primary-color);
  box-shadow: inset 0 4px 4px rgba(255, 255, 255, 0.25);
}

</style>
