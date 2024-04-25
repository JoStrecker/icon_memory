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
      <div v-for="card in props.cards" :key="card.cardId" @click="emits('onCardClick', card)"
           class="enabledCardContainer">
        <MemoryCard :cardType="currentStage" :card="card" :chosen="clickedCards.includes(card)"/>
      </div>
    </div>
    <div v-else class="row">
      <div v-for="card in props.cards" :key="card.cardId" class="disabledCardContainer">
        <MemoryCard :cardType="currentStage" :card="card" :chosen="false"/>
      </div>
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

.enabledCardContainer {
  cursor: pointer;
  border-radius: 12px;
}

.disabledCardContainer {
  cursor: not-allowed;
}

.enabledCardContainer:hover {
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.enabledCardContainer, .enabledCardContainer:active, .enabledCardContainer:hover {
  transition: box-shadow 0.2s ease;
}
</style>
