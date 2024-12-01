import { ServerEvents } from './ServerEvents'
import { Player } from './types'

export type ServerPayloads = {
  [ServerEvents.LobbyState]: {
    lobbyId: string
    players: Player[]
    hasStarted: boolean;
    hasFinished: boolean;
    location?: string;
    locations?: string[];
    roles?: string[];
    time?: number; // time left in seconds
  }

  [ServerEvents.UserState]: {
    id: string
  }

  [ServerEvents.GameMessage]: {
    message: string
    color?: 'green' | 'red' | 'blue' | 'orange'
  }

  // Moving time into lobbystate to maintain a single source of truth
  // [ServerEvents.TimerUpdate]: {
  //   time: number // time left in seconds
  // }
}