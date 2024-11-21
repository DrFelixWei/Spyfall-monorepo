import { Lobby } from '@app/game/lobby/lobby';
import { Socket } from 'socket.io';
import { ServerPayloads } from '@app/websocket/ServerPayloads';
import { ServerEvents } from '@app/websocket/ServerEvents';
import { Board } from '@app/game/Board';
import { Piece, Position } from '@app/game/pieces/Piece';
import { ServerException } from '@app/game/server.exception';
import { SocketExceptions } from '@app/websocket/SocketExceptions';

export class Instance
{
  public hasStarted: boolean = false;

  public hasFinished: boolean = false;

  public isSuspended: boolean = false;

  public players: string[] = [];

  // public board: Board = new Board();

  constructor(
    private readonly lobby: Lobby,
  )
  {
    // this.initializeBoard();
  }

  public triggerStart(): void
  {
    if (this.hasStarted) {
      return;
    }

    this.hasStarted = true;

    this.lobby.dispatchToLobby<ServerPayloads[ServerEvents.GameMessage]>(ServerEvents.GameMessage, {
      color: 'blue',
      message: 'Game started !',
    });
  }

  public triggerFinish(): void
  {
    if (this.hasFinished || !this.hasStarted) {
      return;
    }

    this.hasFinished = true;

    this.lobby.dispatchToLobby<ServerPayloads[ServerEvents.GameMessage]>(ServerEvents.GameMessage, {
      color: 'blue',
      message: 'Game finished !',
    });
  }




  
}