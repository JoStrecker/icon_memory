<script setup lang="ts">
import {type MemoryCard, MemoryCardType, useMemoryCard} from "~/composables/useMemoryCard";
import type {Ref} from "vue";

const memoryCardHook = useMemoryCard()

const correctCards: Ref<MemoryCard[] | null> = ref(null)
const wrongCards: Ref<MemoryCard[] | null> = ref(null)
const currentStage: Ref<MemoryCardType> = ref(MemoryCardType.Text)

onMounted(() => {
  correctCards.value = memoryCardHook.getCorrectCards(5)
  wrongCards.value = memoryCardHook.getAllCards()
})

function nextStage() {
  switch (currentStage.value) {
    case MemoryCardType.Text:
      currentStage.value = MemoryCardType.Icon
      break
    case MemoryCardType.Icon:
      currentStage.value = MemoryCardType.TextIcon
      break
    case MemoryCardType.TextIcon:
      currentStage.value = MemoryCardType.Color
      break
    case MemoryCardType.Color:
      currentStage.value = MemoryCardType.Text
      break
  }
}
</script>

<template>
  <span class="headline4">Current Stage: {{ currentStage }}</span>
  <button @click="nextStage">next Stage</button>
  <br />

  <span class="headline">Correct Cards:</span>
  <div class="row">
    <MemoryCard v-for="card in correctCards" :key="card.cardId" :cardType="currentStage" :card="card"/>
  </div>
  <br />

  <span class="headline">Wrong Cards:</span>
  <div class="row">
    <MemoryCard v-for="card in wrongCards" :key="card.cardId" :cardType="currentStage" :card="card"/>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  padding: 0 6rem;
}
</style>