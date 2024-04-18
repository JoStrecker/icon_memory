<script setup lang="ts">
import {type MemoryCard, type MemoryCardType} from "~/composables/useMemoryCard";

const props = defineProps<{ cardType: MemoryCardType, card: MemoryCard, chosen: boolean }>()
</script>

<template>
  <div :class="props.chosen ? 'card chosen' : 'card'" v-if="props.cardType === MemoryCardType.Text">
    <span class="text">{{ props.card.name }}</span>
  </div>
  <div :class="props.chosen ? 'card chosen' : 'card'" v-if="props.cardType === MemoryCardType.Icon">
    <span class="material-icons md-48">{{ props.card.icon }}</span>
  </div>
  <div :class="props.chosen ? 'card chosen' : 'card'" v-if="props.cardType === MemoryCardType.TextIcon">
    <span class="material-icons md-36" style="grid-row: 1">{{ props.card.icon }}</span>
    <span class="text" style="grid-row: 2">{{ props.card.name }}</span>
  </div>
  <div :class="props.chosen ? 'card chosen' : 'card'" v-if="props.cardType === MemoryCardType.TextColor">
    <span class="text" :style="`color: ${props.card.color}`">{{ props.card.name }}</span>
  </div>
  <div :class="props.chosen ? 'card chosen' : 'card'" v-if="props.cardType === MemoryCardType.IconColor">
    <span class="material-icons md-36" :style="`color: ${props.card.color}`">{{ props.card.icon }}</span>
  </div>
  <div :class="props.chosen ? 'card chosen' : 'card'" v-if="props.cardType === MemoryCardType.TextIconColor">
    <span class="material-icons md-36" :style="`color: ${props.card.color}; grid-row: 1`">{{ props.card.icon }}</span>
    <span class="text" :style="`color: ${props.card.color}; grid-row: 2`">{{ props.card.name }}</span>
  </div>
</template>

<style scoped>
.card {
  border-radius: 12px;
  width: 120px;
  height: 120px;
  display: grid;
  grid-gap: 4px;
  justify-items: center;
  align-items: center;
  text-align: center;
  background-color: var(--light-color);
  padding: 12px;
}

.card.chosen {
  background-color: var(--background-color);
}
</style>
