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
    client.data.lobby?.removeClient(client);
  }

  public createLobby(client: AuthenticatedSocket, data: LobbyCreateDto): void
  {
    let maxClients = 8;

    const lobby = new Lobby(this.server, maxClients);

    this.lobbies.set(lobby.id, lobby);

    lobby.addClient(client, data.username);
  }

  public getLobby(lobbyId: string) {
    return this.lobbies.get(lobbyId);
  }

  public joinLobby(client: AuthenticatedSocket, data: LobbyJoinDto): void
  {
    const lobbyId = data.lobbyId;
    const lobby = this.lobbies.get(lobbyId);

    if (!lobby) {
      throw new ServerException(SocketExceptions.LobbyError, 'Lobby not found');
    }

    if (lobby.clients.size >= lobby.maxClients) {
      throw new ServerException(SocketExceptions.LobbyError, 'Lobby already full');
    }

    lobby.addClient(client, data.username);
  }

  // Periodically clean up lobbies
  // @Cron('*/5 * * * *')
  // private lobbiesCleaner(): void
  // {
  //   for (const [lobbyId, lobby] of this.lobbies) {
  //     const now = (new Date()).getTime();
  //     const lobbyCreatedAt = lobby.createdAt.getTime();
  //     const lobbyLifetime = now - lobbyCreatedAt;

  //     if (lobbyLifetime > LOBBY_MAX_LIFETIME) {
  //       lobby.dispatchToLobby<ServerPayloads[ServerEvents.GameMessage]>(ServerEvents.GameMessage, {
  //         color: 'blue',
  //         message: 'Game timed out',
  //       });

  //       lobby.instance.triggerFinish();

  //       this.lobbies.delete(lobby.id);
  //     }
  //   }
  // }
}