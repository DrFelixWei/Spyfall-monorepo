import { ServerEvents } from './ServerEvents'

export type ServerPayloads = {
  [ServerEvents.LobbyState]: {
    lobbyId: string
  }

  [ServerEvents.GameMessage]: {
    message: string
    color?: 'green' | 'red' | 'blue' | 'orange'
  }
}