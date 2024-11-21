import { atom } from 'recoil';
import { ServerEvents } from '@shared/ServerEvents';
import { ServerPayloads } from '@shared/ServerPayloads';

export const CurrentLobbyState = atom<ServerPayloads[ServerEvents.LobbyState] | null>({
  key: 'CurrentLobbyState',
  default: null,
});