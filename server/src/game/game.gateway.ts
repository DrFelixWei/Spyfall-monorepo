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
import { LobbyCreateDto, LobbyJoinDto } from '@app/game/dtos';
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

  @SubscribeMessage(ClientEvents.LobbyCreate)
  onLobbyCreate(client: AuthenticatedSocket, data: LobbyCreateDto): WsResponse<ServerPayloads[ServerEvents.GameMessage]>
  {
    const lobby = this.lobbyManager.createLobby();
    lobby.addClient(client);

    return {
      event: ServerEvents.GameMessage,
      data: {
        color: 'green',
        message: 'Lobby created',
      },
    };
  }

  @SubscribeMessage(ClientEvents.LobbyJoin)
  onLobbyJoin(client: AuthenticatedSocket, data: LobbyJoinDto): void
  {
    this.lobbyManager.joinLobby(data.lobbyId, client);
  }

  @SubscribeMessage(ClientEvents.LobbyLeave)
  onLobbyLeave(client: AuthenticatedSocket): void
  {
    client.data.lobby?.removeClient(client);
  }


  // @SubscribeMessage(ClientEvents.GameMovePiece)
  // onGameMovePiece(
  //   client: AuthenticatedSocket,
  //   data: GameMovePieceDto,
  // ): void 
  // {
  //   try {
  //     const lobby = this.lobbyManager.getLobby(data.lobbyId);
  //     if (!lobby) {
  //       throw new ServerException(SocketExceptions.LobbyError);
  //     }
  
  //     lobby.instance.handleMovePiece(data);
  //   } catch (error) {
  //     if (error instanceof ServerException) {
  //       // notify client about lost connection
  //     }
  //   }

  // }


}