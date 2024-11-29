import { v4 } from 'uuid';
import { Server, Socket } from 'socket.io';
import { ServerEvents } from '@shared/ServerEvents';
import { AuthenticatedSocket } from '@app/game/types';
import { Instance } from '@app/game/instance/instance';
import { ServerPayloads } from '@shared/ServerPayloads';

export class Lobby
{

  public readonly createdAt: Date = new Date();

  public readonly clients: Map<Socket['id'], AuthenticatedSocket> = new Map<Socket['id'], AuthenticatedSocket>();

  public readonly instance: Instance = new Instance(this);

  constructor(
    private readonly server: Server,
    public readonly maxClients: number,
    public readonly id: string,
  )
  {
  }

  public addClient(client: AuthenticatedSocket, username: string): void
  {
    this.clients.set(client.id, client);
    client.join(this.id);
    client.data.lobby = this;

    this.instance.players.push({ id: client.id, username });

    this.dispatchLobbyState();
  }

  public removeClient(client: AuthenticatedSocket): void
  {
    let usernameRemoved = this.instance.players.find(player => player.id === client.id)?.username;

    this.clients.delete(client.id);
    client.leave(this.id);
    client.data.lobby = null;

    // Update players list in instance
    this.instance.players = this.instance.players.filter(player => player.id !== client.id);

    // Alert the remaining player that client left lobby
    this.dispatchToLobby<ServerPayloads[ServerEvents.GameMessage]>(ServerEvents.GameMessage, {
      color: 'blue',
      message: `${usernameRemoved} left the game!`,
    });

    this.dispatchLobbyState();
  }

  public dispatchLobbyState(): void
  {
    // console.log("this.clients:", this.clients)
    const payload: ServerPayloads[ServerEvents.LobbyState] = {
      lobbyId: this.id,
      players: this.instance.players,
      // turn: this.instance.turn,
      // board: this.instance.board,
      // mode: this.maxClients === 1 ? 'solo' : 'duo',
      // delayBetweenRounds: this.instance.delayBetweenRounds,
      // hasStarted: this.instance.hasStarted,
      // hasFinished: this.instance.hasFinished,
      // currentRound: this.instance.currentRound,
      // playersCount: this.clients.size,
      // cards: this.instance.cards.map(card => card.toDefinition()),
      // isSuspended: this.instance.isSuspended,
      // scores: this.instance.scores,
    };

    this.dispatchToLobby(ServerEvents.LobbyState, payload);
  }

  public dispatchToLobby<T>(event: ServerEvents, payload: T): void
  {
    this.server.to(this.id).emit(event, payload);
  }
}