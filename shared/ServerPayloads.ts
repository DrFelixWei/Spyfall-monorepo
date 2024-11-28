import { ServerEvents } from './ServerEvents'

export type ServerPayloads = {
  [ServerEvents.LobbyState]: {
    lobbyId: string
    players: string[]
  }

  [ServerEvents.GameMessage]: {
    message: string
    color?: 'green' | 'red' | 'blue' | 'orange'
  }

  [ServerEvents.TimerUpdate]: {
    time: number
  }
}