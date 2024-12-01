import { Lobby } from '@app/game/lobby/lobby';
import { Server } from 'socket.io';
import { AuthenticatedSocket } from '@app/game/types';
import { ServerException } from '@app/game/server.exception';
import { SocketExceptions } from '@shared/SocketExceptions';
import { ServerEvents } from '@shared/ServerEvents';
import { ServerPayloads } from '@shared/ServerPayloads';
import { LOBBY_MAX_LIFETIME } from '@app/game/constants';
import { LobbyCreateDto, LobbyJoinDto } from '../dtos';
// import { Cron } from '@nestjs/schedule';

export class LobbyManager
{
  public server: Server;

  private readonly lobbies: Map<Lobby['id'], Lobby> = new Map<Lobby['id'], Lobby>();

  public initializeSocket(client: AuthenticatedSocket): void
  {
    client.data.lobby = null;
  }

  public terminateSocket(client: AuthenticatedSocket): void
  {
    console.log("disconnecting ", client.id)
    client.data.lobby?.removeClient(client);
  }

  private generateUniqueLobbyId(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const idLength = 5;

    let id: string;
    do {
      id = Array.from({ length: idLength }, () => 
        characters[Math.floor(Math.random() * characters.length)]
      ).join('');
    } while (this.lobbies.has(id)); // Ensure the ID is unique

    return id;
  }

  public createLobby(client: AuthenticatedSocket, data: LobbyCreateDto): void
  {
    const lobby = new Lobby(this.server, this.generateUniqueLobbyId());

    this.lobbies.set(lobby.id, lobby);

    lobby.addClient(client, data.username);
  }

  public getLobby(lobbyId: string) {
    return this.lobbies.get(lobbyId.trim().toUpperCase());
  }

  public joinLobby(client: AuthenticatedSocket, data: LobbyJoinDto): void
  {
    const lobbyId = data.lobbyId;
    const lobby = this.getLobby(lobbyId);

    if (!lobby) {
      throw new ServerException(SocketExceptions.LobbyError, 'Lobby not found');
    }

    if (lobby.clients.size >= lobby.maxClients) {
      throw new ServerException(SocketExceptions.LobbyError, 'Lobby already full');
    }

    if (lobby.instance.hasStarted) {
      throw new ServerException(SocketExceptions.LobbyError, 'Game already started');
    }

    lobby.addClient(client, data.username);
  }
}