import { Lobby } from '@app/game/lobby/lobby';
import { Socket } from 'socket.io';
import { ServerPayloads } from '@shared/ServerPayloads';
import { ServerEvents } from '@shared/ServerEvents';
import { SocketExceptions } from '@shared/SocketExceptions';
import { ServerException } from '@app/game/server.exception';
import { Player } from '@shared/types';

export class Instance
{
  public hasStarted: boolean = false;

  public hasFinished: boolean = false;

  public isSuspended: boolean = false;

  // public scores: Record<Socket['id'], number> = {};
  // private cardsRevealedForCurrentRound: Record<number, Socket['id']> = {};

  public players: Player[] = [];

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