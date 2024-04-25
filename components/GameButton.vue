<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <button class="button" :title=title>{{ title }}</button>
</template>

<style scoped>
.button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #333;
  max-width: 30rem;
  width: 100%;
  font-size: var(--standard-size);
  font-family: var(--font-medium);
  color: var(--light-color);
  border: none;
  border-radius: 12px;
  margin: 0 auto
}

.button:enabled {
  cursor: pointer;
}

.button:hover {
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.button, .button:hover {
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}
</style>
