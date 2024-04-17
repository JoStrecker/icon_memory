<script setup lang="ts">
import {type MemoryCard, MemoryCardType, useMemoryCard} from "~/composables/useMemoryCard";
import type {Ref} from "vue";
import {Duration} from "luxon";
import type {integer} from "vscode-languageserver-types";

const memoryCardHook = useMemoryCard()

const correctCards: Ref<MemoryCard[]> = ref([])
const allCards: Ref<MemoryCard[]> = ref([])
const field: Ref<MemoryCard[]> = ref([])
const clickedCards: Ref<MemoryCard[]> = ref([])

const currentStage: Ref<MemoryCardType> = ref(MemoryCardType.Text)
const interactive: Ref<boolean> = ref(false)
const countdown: Ref<Duration> = ref(Duration.fromMillis(5000))
const started: Ref<boolean> = ref(false)
const scores: Ref<string[]> = ref([])
const finished: Ref<boolean> = ref(false)
const interval: Ref<NodeJS.Timeout | null> = ref(null)

function startCountdown(seconds: integer): void {
  const timeout: integer = Date.now() + (seconds * 1000)

  interval.value = setInterval(() => {
    const newTimeout = timeout - Date.now()
    countdown.value = Duration.fromMillis(newTimeout)
    if (newTimeout < 1) {
      finishRound()
    }
  }, 1000)
}

function stopCountdown() {
  if (interval.value != null) {
    clearInterval(interval.value)
  }
}

function startGame() {
  resetGame()

  correctCards.value = memoryCardHook.getCorrectCards(5)
  allCards.value = memoryCardHook.getAllCards()
  field.value = correctCards.value

  started.value = true
  startCountdown(5)
  console.log("--- Start Game ---")
  console.log(`Correct Cards: ${correctCards.value.map(card => {
    return card.name
  })}`)
}

function nextStage() {
  if (interactive.value) {
    console.log("Reset Correct Cards")
    correctCards.value = memoryCardHook.getCorrectCards(5)
    console.log(`Correct Cards: ${correctCards.value.map(card => {
      return card.name
    })}`)
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
        finished.value = true
        started.value = false
        return
    }
    startCountdown(5)
    field.value = correctCards.value
  } else {
    startCountdown(30)
    field.value = shuffle(allCards.value)
  }
  interactive.value = !interactive.value
}

function finishRound() {
  stopCountdown()

  if (interactive.value) {
    console.log("--- Finish Round ---")
    console.log(`Chosen Cards: ${clickedCards.value.map(card => {
      return card.name
    })}`)
    console.log(`Correct Cards: ${correctCards.value.map(card => {
      return card.name
    })}`)

    let counter = 0
    for (let card in clickedCards.value) {
      if (correctCards.value.includes(clickedCards.value[card])) {
        counter++
      }
    }

    scores.value.push(`${counter}/5`)
    console.log(`Roundscore: ${counter}/5`)

    clickedCards.value = []
  }

  nextStage()
}

function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function resetGame() {
  correctCards.value = []
  allCards.value = []
  field.value = []
  clickedCards.value = []

  currentStage.value = MemoryCardType.Text
  interactive.value = false
  countdown.value = Duration.fromMillis(5000)
  started.value = false
  scores.value = []
  finished.value = false
  interval.value = null
}

function onCardClick(card: MemoryCard) {
  console.log(`Clicked Card: ${card.name}`)

  if (clickedCards.value.includes(card)) {
    clickedCards.value.splice(clickedCards.value.indexOf(card), 1)
  } else {
    clickedCards.value.push(card)
  }

  if (clickedCards.value.length === 5) {
    finishRound()
  }
}
</script>

<template>
  <div class="row">
    <span v-if="finished" v-for="score in scores" class="text">{{ score }}</span>
    <span v-else class="text">{{ countdown.toFormat('mm:ss') }}</span>
  </div>

  <div v-if="started" class="row">
    <span v-if="interactive" class="headline3">Wähle die 5 korrekten Karten</span>
    <span v-else class="headline3">Merke dir diese 5 Karten</span>
  </div>

  <div class="gameContainer">
    <button v-if="!started" @click="startGame" class="text small">Start Game</button>
    <GameField v-else :cards="field" :interactive="interactive" :currentStage="currentStage"
               :clickedCards="clickedCards" @onCardClick="onCardClick"/>
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

.gameContainer {
  align-content: center;
  padding: 1rem;
}
</style>