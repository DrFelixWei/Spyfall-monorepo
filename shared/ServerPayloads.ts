import { ServerEvents } from './ServerEvents'
import { Player } from './types'

export type ServerPayloads = {
  [ServerEvents.LobbyState]: {
    lobbyId: string
    players: Player[]
  }

  [ServerEvents.GameMessage]: {
    message: string
    color?: 'green' | 'red' | 'blue' | 'orange'
  }

  [ServerEvents.TimerUpdate]: {
    time: number
  }
}