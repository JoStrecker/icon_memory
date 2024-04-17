import type {integer} from "vscode-languageserver-types";
import MemoryCard from "~/components/MemoryCard.vue";

export const useMemoryCard = () => {
  const possibleCards: MemoryCard[] = [
    <MemoryCard>{cardId: 0, name: "Landscape", icon: "landscape", color: MemoryCardColor.Green},
    <MemoryCard>{cardId: 1, name: "Home", icon: "home", color: MemoryCardColor.Blue},
    <MemoryCard>{cardId: 2, name: "Favorite", icon: "favorite", color: MemoryCardColor.Yellow},
    <MemoryCard>{cardId: 3, name: "Delete", icon: "delete", color: MemoryCardColor.Red},
    <MemoryCard>{cardId: 4, name: "Logout", icon: "logout", color: MemoryCardColor.Teal},
    <MemoryCard>{cardId: 5, name: "Login", icon: "login", color: MemoryCardColor.Green},
    <MemoryCard>{cardId: 6, name: "Bolt", icon: "bolt", color: MemoryCardColor.Yellow},
    <MemoryCard>{cardId: 7, name: "Key", icon: "key", color: MemoryCardColor.Yellow},
    <MemoryCard>{cardId: 8, name: "Done All", icon: "done_all", color: MemoryCardColor.Blue},
    <MemoryCard>{cardId: 9, name: "Javascript", icon: "javascript", color: MemoryCardColor.Yellow},
    <MemoryCard>{cardId: 10, name: "Person", icon: "person", color: MemoryCardColor.Teal},
    <MemoryCard>{cardId: 11, name: "Rocket Launch", icon: "rocket_launch", color: MemoryCardColor.Teal},
    <MemoryCard>{cardId: 12, name: "Diamond", icon: "diamond", color: MemoryCardColor.Blue},
    <MemoryCard>{cardId: 13, name: "Forest", icon: "forest", color: MemoryCardColor.Green},
    <MemoryCard>{cardId: 14, name: "Public", icon: "public", color: MemoryCardColor.Blue},
    <MemoryCard>{cardId: 15, name: "Tsunami", icon: "tsunami", color: MemoryCardColor.Teal},
    <MemoryCard>{cardId: 16, name: "Language", icon: "language", color: MemoryCardColor.Teal},
    <MemoryCard>{cardId: 17, name: "Verified", icon: "verified", color: MemoryCardColor.Yellow},
    <MemoryCard>{cardId: 18, name: "Flutter Dash", icon: "flutter_dash", color: MemoryCardColor.Blue},
    <MemoryCard>{cardId: 19, name: "Gesture", icon: "gesture", color: MemoryCardColor.Green},
  ]

  const getCorrectCards = (length: number): MemoryCard[] => {
    const range: number[] = Array.from({length: length}, (value, key) => key)
    const startArr: MemoryCard[] = [...possibleCards]
    const endArr: MemoryCard[] = []

    for (let i in range) {
      const ind: number = Math.floor(Math.random() * startArr.length)
      const result: MemoryCard[] = startArr.splice(ind, 1)
      endArr.push(...result)
    }

    return endArr
  }

  const getAllCards = (): MemoryCard[] => {
    return possibleCards
  }

  return {
    getCorrectCards,
    getAllCards,
  }
}

export interface MemoryCard {
  cardId: integer,
  name: string,
  icon: string,
  color: MemoryCardColor,
}

export enum MemoryCardType {
  Text,
  Icon,
  TextIcon,
  Color,
}

export enum MemoryCardColor {
  Green = '#05a302',
  Teal = '#027355',
  Blue = '#03468f',
  Red = '#d10000',
  Yellow = '#ffd301',
}
