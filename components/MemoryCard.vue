<script setup lang="ts">
import {type MemoryCard, type MemoryCardType} from "~/composables/useMemoryCard";

const props = defineProps<{ cardType: MemoryCardType, card: MemoryCard }>()
</script>

<template>
  <div class="card">
    <div v-if="props.cardType === MemoryCardType.Text">
      <span class="text">{{ props.card.name }}</span>
    </div>
    <div v-else-if="props.cardType === MemoryCardType.Icon">
      <span class="material-icons md-24">{{ props.card.icon }}</span>
    </div>
    <div v-else-if="props.cardType === MemoryCardType.TextIcon">
      <span class="material-icons md-24">{{ props.card.icon }}</span>
      <span class="text">{{ props.card.name }}</span>
    </div>
    <div v-else-if="props.cardType === MemoryCardType.Color">
      <span class="material-icons md-24">{{ props.card.icon }}</span>
      <span class="text">{{ props.card.name }}</span>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 12px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  width: 10rem;
  height: 10rem;
  display: grid;
  grid-gap: 0.6rem;
  justify-items: center;
  align-items: center;
  background-color: var(--light-color);
  padding: 2rem 3rem;
  margin: 2rem;
}
</style>
