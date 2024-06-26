<script setup lang="ts">
import {type MemoryCard, MemoryCardType, type Score, useMemoryCard} from "~/composables/useMemoryCard";
import type {Ref} from "vue";
import {Duration} from "luxon";
import type {integer} from "vscode-languageserver-types";
import ScoreBoard from "~/components/ScoreBoard.vue";

const memoryCardHook = useMemoryCard()

const correctCards: Ref<MemoryCard[]> = ref([])
const allCards: Ref<MemoryCard[]> = ref([])
const field: Ref<MemoryCard[]> = ref([])
const clickedCards: Ref<MemoryCard[]> = ref([])

const currentStage: Ref<MemoryCardType> = ref(MemoryCardType.Text)
const currentAmount: Ref<integer> = ref(3)
const interactive: Ref<boolean> = ref(false)
const countdown: Ref<Duration> = ref(Duration.fromMillis(5000))
const started: Ref<boolean> = ref(false)
const scores: Ref<Score[]> = ref([])
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
  }, 100)
}

function stopCountdown() {
  if (interval.value != null) {
    clearInterval(interval.value)
  }
}

function startGame() {
  resetGame()

  correctCards.value = memoryCardHook.getCorrectCards(currentAmount.value)
  allCards.value = memoryCardHook.getAllCards(currentAmount.value)
  field.value = correctCards.value

  started.value = true
  startCountdown(currentAmount.value * 1.5)
  printDebug("--- Start Game ---")
  printDebug(`Correct Cards: ${correctCards.value.map(card => {
    return card.name
  })}`)
}

function nextStage() {
  if (interactive.value) {
    switch (currentStage.value) {
      case MemoryCardType.Text:
        currentStage.value = MemoryCardType.Icon
        break
      case MemoryCardType.Icon:
        currentStage.value = MemoryCardType.TextIcon
        break
      case MemoryCardType.TextIcon:
        currentStage.value = MemoryCardType.TextColor
        break
      case MemoryCardType.TextColor:
        currentStage.value = MemoryCardType.IconColor
        break
      case MemoryCardType.IconColor:
        currentStage.value = MemoryCardType.TextIconColor
        break
      case MemoryCardType.TextIconColor:
        if (currentAmount.value === 3) {
          currentAmount.value = 6
          currentStage.value = MemoryCardType.Text
        } else {
          finished.value = true
          started.value = false
          return
        }
    }
    printDebug("Reset Correct Cards")
    correctCards.value = memoryCardHook.getCorrectCards(currentAmount.value)
    allCards.value = memoryCardHook.getAllCards(currentAmount.value)
    printDebug(`Correct Cards: ${correctCards.value.map(card => {
      return card.name
    })}`)
    startCountdown(currentAmount.value * 1.5)
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
    printDebug("--- Finish Round ---")
    printDebug(`Chosen Cards: ${clickedCards.value.map(card => {
      return card.name
    })}`)
    printDebug(`Correct Cards: ${correctCards.value.map(card => {
      return card.name
    })}`)

    let counter = 0
    for (let card in clickedCards.value) {
      if (correctCards.value.includes(clickedCards.value[card])) {
        counter++
      }
    }

    scores.value.push(
        <Score>{
          round: currentStage.value,
          score: `${counter}/${currentAmount.value}`,
          time: `${(Duration.fromMillis(30000).minus(countdown.value)).toFormat('mm:ss')}`,
        }
    )
    printDebug(`Roundscore: ${counter}/${currentAmount.value}`)

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
  currentAmount.value = 3
  interactive.value = false
  countdown.value = Duration.fromMillis(5000)
  started.value = false
  scores.value = []
  finished.value = false
  interval.value = null
}

function onCardClick(card: MemoryCard) {
  printDebug(`Clicked Card: ${card.name}`)

  if (clickedCards.value.includes(card)) {
    clickedCards.value.splice(clickedCards.value.indexOf(card), 1)
  } else {
    clickedCards.value.push(card)
  }

  if (clickedCards.value.length === currentAmount.value) {
    finishRound()
  }
}

function printDebug(message: String) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(message)
  }
}
</script>

<template>
  <div style="display: flex; height: 100vh; flex-direction: column">
    <div class="row">
      <ScoreBoard v-if="finished" :scores="scores"/>
      <span v-else-if="started" class="text">{{ countdown.toFormat('mm:ss') }}</span>
    </div>

    <div v-if="started" class="row">
      <span v-if="interactive" class="headline3">Wähle die {{ currentAmount }} korrekten Karten</span>
      <span v-else class="headline3">Merke dir diese {{ currentAmount }} Karten</span>
    </div>

    <div class="gameContainer">
      <div v-if="!started" class="row">
        <GameButton @click="startGame" :title="finished ? 'Test neustarten' : 'Test starten'"/>
      </div>
      <GameField v-else :cards="field" :interactive="interactive" :currentStage="currentStage"
                 :clickedCards="clickedCards" @onCardClick="onCardClick"/>
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

.gameContainer {
  flex-grow: 1;
  align-content: center;
  align-items: center;
  justify-items: center;
  justify-content: center;
  padding: 0 6rem;
}
</style>
