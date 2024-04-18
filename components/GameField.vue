<script setup lang="ts">
import {type MemoryCard, MemoryCardType} from "~/composables/useMemoryCard";

const props = defineProps<{
  cards: MemoryCard[],
  interactive: boolean,
  currentStage: MemoryCardType,
  clickedCards: MemoryCard[],
}>()
const emits = defineEmits(['onCardClick'])
</script>

<template>
  <div class="field">
    <div v-if="props.interactive" class="row">
      <div v-for="card in props.cards" :key="card.cardId" @click="emits('onCardClick', card)" style="cursor: pointer">
        <MemoryCard :cardType="currentStage" :card="card" :chosen="clickedCards.includes(card)"/>
      </div>
    </div>
    <div v-else class="row">
      <MemoryCard v-for="card in props.cards" :key="card.cardId" :cardType="currentStage" :card="card" :chosen="false"/>
    </div>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.field {
  width: 100%;
  height: 100%;
  align-content: center;
}
</style>