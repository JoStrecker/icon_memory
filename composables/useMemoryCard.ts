import type {integer} from "vscode-languageserver-types";
import MemoryCard from "~/components/MemoryCard.vue";

export const useMemoryCard: () => {
  getCorrectCards: (length: number) => MemoryCard[];
  getAllCards: (length: number) => MemoryCard[]
} = () => {
  const possibleCards: MemoryCard[] = [
    <MemoryCard>{cardId: 0, name: "Landscape", icon: "landscape", color: MemoryCardColor.Green},
    <MemoryCard>{cardId: 1, name: "Home", icon: "home", color: MemoryCardColor.Blue},
    <MemoryCard>{cardId: 2, name: "Favorite", icon: "favorite", color: MemoryCardColor.Yellow},
    <MemoryCard>{cardId: 3, name: "Delete", icon: "delete", color: MemoryCardColor.Red},
    <MemoryCard>{cardId: 4, name: "Logout", icon: "logout", color: MemoryCardColor.Teal},
    <MemoryCard>{cardId: 5, name: "Login", icon: "login", color: MemoryCardColor.Pink},
    <MemoryCard>{cardId: 6, name: "Bolt", icon: "bolt", color: MemoryCardColor.Purple},
    <MemoryCard>{cardId: 7, name: "Key", icon: "key", color: MemoryCardColor.LightBlue},
    <MemoryCard>{cardId: 8, name: "Done All", icon: "done_all", color: MemoryCardColor.LightGreen},
    <MemoryCard>{cardId: 9, name: "Javascript", icon: "javascript", color: MemoryCardColor.Orange},

    <MemoryCard>{cardId: 10, name: "Person", icon: "person", color: MemoryCardColor.Yellow},
    <MemoryCard>{cardId: 11, name: "Rocket Launch", icon: "rocket_launch", color: MemoryCardColor.Teal},
    <MemoryCard>{cardId: 12, name: "Diamond", icon: "diamond", color: MemoryCardColor.Blue},
    <MemoryCard>{cardId: 13, name: "Forest", icon: "forest", color: MemoryCardColor.Green},
    <MemoryCard>{cardId: 14, name: "Public", icon: "public", color: MemoryCardColor.Red},
    <MemoryCard>{cardId: 15, name: "Tsunami", icon: "tsunami", color: MemoryCardColor.Pink},
    <MemoryCard>{cardId: 16, name: "Language", icon: "language", color: MemoryCardColor.Purple},
    <MemoryCard>{cardId: 17, name: "Verified", icon: "verified", color: MemoryCardColor.LightGreen},
    <MemoryCard>{cardId: 18, name: "Flutter Dash", icon: "flutter_dash", color: MemoryCardColor.LightBlue},
    <MemoryCard>{cardId: 19, name: "Gesture", icon: "gesture", color: MemoryCardColor.Orange},

    <MemoryCard>{cardId: 20, name: "Android", icon: "android", color: MemoryCardColor.Green},
    <MemoryCard>{cardId: 21, name: "Anchor", icon: "anchor", color: MemoryCardColor.Teal},
    <MemoryCard>{cardId: 22, name: "Chat", icon: "chat", color: MemoryCardColor.Blue},
    <MemoryCard>{cardId: 23, name: "Voicemail", icon: "voicemail", color: MemoryCardColor.LightBlue},
    <MemoryCard>{cardId: 24, name: "Emergency", icon: "emergency", color: MemoryCardColor.Red},
    <MemoryCard>{cardId: 25, name: "Local Shipping", icon: "local_shipping", color: MemoryCardColor.LightGreen},
    <MemoryCard>{cardId: 26, name: "QR Code", icon: "qr_code", color: MemoryCardColor.Purple},
    <MemoryCard>{cardId: 27, name: "Two Wheeler", icon: "two_wheeler", color: MemoryCardColor.Pink},
    <MemoryCard>{cardId: 28, name: "Medical Services", icon: "medical_services", color: MemoryCardColor.Orange},
    <MemoryCard>{cardId: 29, name: "Fastfood", icon: "fastfood", color: MemoryCardColor.Yellow},

    <MemoryCard>{cardId: 30, name: "Trending Up", icon: "trending_up", color: MemoryCardColor.Green},
    <MemoryCard>{cardId: 31, name: "Lightbulb", icon: "lightbulb", color: MemoryCardColor.Teal},
    <MemoryCard>{cardId: 32, name: "Sports Bar", icon: "sports_bar", color: MemoryCardColor.Blue},
    <MemoryCard>{cardId: 33, name: "Album", icon: "album", color: MemoryCardColor.LightBlue},
    <MemoryCard>{cardId: 34, name: "Trending Down", icon: "trending_down", color: MemoryCardColor.Red},
  ]

  const getCorrectCards = (length: number): MemoryCard[] => {
    const range: number[] = Array.from({length: length}, (value, key) => key)
    const startArr: MemoryCard[] = getAllCards(length)
    const endArr: MemoryCard[] = []

    for (let i in range) {
      const ind: number = Math.floor(Math.random() * startArr.length)
      const result: MemoryCard[] = startArr.splice(ind, 1)
      endArr.push(...result)
    }

    return endArr
  }

  const getAllCards = (length: number): MemoryCard[] => {
    return [...possibleCards].slice(0, length * 6 - 1)
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
  Text = 'Text',
  Icon = 'Icon',
  TextIcon = 'Text mit Icon',
  TextColor = 'Farbiger Text',
  IconColor = 'Farbiges Icon',
  TextIconColor = 'Farbiger Text mit Icon',
}

export enum MemoryCardColor {
  Green = '#05a302',
  Teal = '#027355',
  Blue = '#03468f',
  Red = '#d10000',
  Yellow = '#ffd301',
  Pink = '#f89a94',
  Purple = '#791d7f',
  LightBlue = '#0775f6',
  LightGreen = '#81c13a',
  Orange = '#f39926',
}

export interface Score {
  round: MemoryCardType,
  score: string,
  time: string,
}
