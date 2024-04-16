<script setup lang="ts">
import {type MemoryCard, useMemoryCard} from "~/composables/useMemoryCard";
import type {Ref} from "vue";

const memoryCardHook = useMemoryCard()

const correctCards: Ref<MemoryCard[] | null> = ref(null)
const allCards: Ref<MemoryCard[] | null> = ref(null)

onMounted(() => {
  correctCards.value = memoryCardHook.getCorrectCards(5)
  allCards.value = memoryCardHook.getAllCards()
})
</script>

<template>
  <div v-for="card in correctCards" :key="card.cardId" class="row">
    <MemoryCard :cardType="MemoryCardType.TextIcon" :card="card"/>
  </div>
  <div v-for="card in allCards" :key="card.cardId" class="row">
    <MemoryCard :cardType="MemoryCardType.TextIcon" :card="card"/>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
}
</style>