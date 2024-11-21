import { Socket } from 'socket.io';
import { Lobby } from '@app/game/lobby/lobby';
import { ServerEvents } from '@app/websocket/ServerEvents';

export type AuthenticatedSocket = Socket & {
  data: {
    lobby: null | Lobby;
  };

  emit: <T>(ev: ServerEvents, data: T) => boolean;
};