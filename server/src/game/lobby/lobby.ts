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

  public readonly minClients: number = 3;
  public readonly maxClients: number = 8;

  constructor(
    private readonly server: Server,
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

  public kickClient(playerId: string, client: AuthenticatedSocket): void
  {
    let usernameKicked = this.instance.players.find(player => player.id === playerId)?.username;
    console.log('Kicking player', usernameKicked);

    this.clients.delete(playerId);
    // client.leave(this.id);
    // client.data.lobby = null;

    // Update players list in instance
    this.instance.players = this.instance.players.filter(player => player.id !== playerId);

    // Alert the remaining player that client left lobby
    this.dispatchToLobby<ServerPayloads[ServerEvents.GameMessage]>(ServerEvents.GameMessage, {
      color: 'blue',
      message: `Host kicked ${usernameKicked}!`,
    });

    this.dispatchLobbyState();
  }

  public startGame(): void
  {
    this.instance.triggerStart(this.minClients);
    this.dispatchLobbyState();
  }

  public endGame(): void
  {
    this.instance.triggerGameOver();
  }

  public resetGame(): void
  {
    this.instance.resetGame();
  }

  public dispatchLobbyState(): void
  {
    const payload: ServerPayloads[ServerEvents.LobbyState] = {
      lobbyId: this.id,
      players: this.instance.players,
      gameStarted: this.instance.gameStarted,
      gameOver: this.instance.gameOver,
      location: this.instance.location,
      locations: this.instance.locations,
      roles: this.instance.roles,
      time: this.instance.timer,
    };

    this.dispatchToLobby(ServerEvents.LobbyState, payload);
  }

  public dispatchToLobby<T>(event: ServerEvents, payload: T): void
  {
    this.server.to(this.id).emit(event, payload);
  }
}