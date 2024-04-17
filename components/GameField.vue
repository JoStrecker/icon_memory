<script setup lang="ts">
import {type MemoryCard, MemoryCardType} from "~/composables/useMemoryCard";
import type {Ref} from "vue";

const props = defineProps<{ cards: MemoryCard[], interactive: boolean, currentStage: MemoryCardType }>()
const emits = defineEmits(['onFinish'])

const clickedCards: Ref<MemoryCard[]> = ref([])

function onCardClick(card: MemoryCard) {
  console.log(`Clicked Card: ${card.name}`)

  if (clickedCards.value.includes(card)) {
    clickedCards.value.splice(clickedCards.value.indexOf(card), 1)
  } else {
    clickedCards.value.push(card)
  }

  if (clickedCards.value.length === 5) {
    console.log("Clicked 5 Cards")
    emits('onFinish', clickedCards.value)

    clickedCards.value = []
  }
}
</script>

<template>
  <div class="field">
    <div v-if="props.interactive" class="row">
      <div v-for="card in props.cards" :key="card.cardId" @click="onCardClick(card)">
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
  padding: 0 6rem;
}

.field {
  width: 100%;
  height: 100%;
  align-content: center;
}
</style>