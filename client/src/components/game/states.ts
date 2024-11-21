import { atom } from 'recoil';
import { ServerEvents } from '../websocket/ServerEvents';
import { ServerPayloads } from '../websocket/ServerPayloads';

export const CurrentLobbyState = atom<ServerPayloads[ServerEvents.LobbyState] | null>({
  key: 'CurrentLobbyState',
  default: null,
});