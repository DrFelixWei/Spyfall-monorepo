import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WsResponse,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ClientEvents } from '@shared/ClientEvents';
import { ServerEvents } from '@shared/ServerEvents';
import { SocketExceptions } from '@shared/SocketExceptions';
import { ServerPayloads } from '@shared/ServerPayloads';
import { LobbyManager } from '@app/game/lobby/lobby.manager';
import { Logger, UsePipes } from '@nestjs/common';
import { AuthenticatedSocket } from '@app/game/types';
import { ServerException } from '@app/game/server.exception';
import { LobbyCreateDto, LobbyJoinDto, LobbyKickDto } from '@app/game/dtos';
import { WsValidationPipe } from '@app/websocket/ws.validation-pipe';

@UsePipes(new WsValidationPipe())
@WebSocketGateway()
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger: Logger = new Logger(GameGateway.name);

  constructor(
    private readonly lobbyManager: LobbyManager,
  )
  {
  }

  afterInit(server: Server): any
  {
    // Pass server instance to managers
    this.lobbyManager.server = server;

    this.logger.log('Game server initialized !');
  }

  async handleConnection(client: Socket, ...args: any[]): Promise<void>
  {
    // Call initializers to set up socket
    this.lobbyManager.initializeSocket(client as AuthenticatedSocket);
  }

  async handleDisconnect(client: AuthenticatedSocket): Promise<void>
  {
    // Handle termination of socket
    this.lobbyManager.terminateSocket(client);
  }

  @SubscribeMessage(ClientEvents.Ping)
  onPing(client: AuthenticatedSocket): void
  {
    client.emit(ServerEvents.Pong, {
      message: 'pong',
    });
  }

  private sendClientId(client: AuthenticatedSocket): void
  {
    client.emit(ServerEvents.UserState, {
      id: client.id,
    });
  }

  @SubscribeMessage(ClientEvents.LobbyCreate)
  onLobbyCreate(client: AuthenticatedSocket, data: LobbyCreateDto): WsResponse<ServerPayloads[ServerEvents.GameMessage]>
  {
    this.lobbyManager.createLobby(client, data);
    this.sendClientId(client);
    return {
      event: ServerEvents.GameMessage,
      data: {
        color: 'green',
        message: 'Lobby created!',
      },
    };
  }

  @SubscribeMessage(ClientEvents.LobbyJoin)
  onLobbyJoin(client: AuthenticatedSocket, data: LobbyJoinDto): WsResponse<ServerPayloads[ServerEvents.GameMessage]>
  {
    this.lobbyManager.joinLobby(client, data);
    let username = data.username;
    this.sendClientId(client);
    return {
      event: ServerEvents.GameMessage,
      data: {
        color: 'green',
        message: `${username} joined!`,
      },
    };
  }

  @SubscribeMessage(ClientEvents.LobbyLeave)
  onLobbyLeave(client: AuthenticatedSocket): void
  {
    // this.lobbyManager.leaveLobby(client);
    client.data.lobby?.removeClient(client);
  }

  @SubscribeMessage(ClientEvents.LobbyKick)
  onLobbyKick(client: AuthenticatedSocket, data: LobbyKickDto): void
  {
    client.data.lobby?.kickClient(data.playerId);
  }

  @SubscribeMessage(ClientEvents.GameStart)
  onGameStart(client: AuthenticatedSocket): void
  {
    client.data.lobby?.startGame();
  }

  @SubscribeMessage(ClientEvents.GameEnd)
  onGameEnd(client: AuthenticatedSocket): void
  {
    client.data.lobby?.endGame();
  }

  @SubscribeMessage(ClientEvents.GameReturnToLobby)
  onReturnToLobby(client: AuthenticatedSocket): void
  {
    client.data.lobby?.resetGame();
  }


}