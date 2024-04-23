<script setup lang="ts">
defineProps<{ title: String }>()
</script>

<template>
  <button class="button" title=title>{{ title }}</button>
</template>

<style scoped>
.button {
  background-color: var(--primary-color);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  max-width: 30rem;
  width: 100%;
  height: 3.75rem;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.63rem 1.25rem;
  box-sizing: border-box;
  text-align: center;
  font-size: var(--standard-size);
  color: var(--light-color);
  font-family: var(--font-medium);
  margin: 0 auto
}

.button:enabled {
  cursor: pointer;
}

.button:hover {
  background-color: var(--primary-color);
  box-shadow: inset 0 4px 4px rgba(255, 255, 255, 0.25);
}

.button:disabled {
  background-color: var(--tertiary-color);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  font-family: var(--font);
}
</style>
