import { WsException } from '@nestjs/websockets';
import { SocketExceptions } from '@app/websocket/SocketExceptions';
import { ServerExceptionResponse } from '@app/websocket/types';

export class ServerException extends WsException
{
  constructor(type: SocketExceptions, message?: string | object)
  {
    const serverExceptionResponse: ServerExceptionResponse = {
      exception: type,
      message: message,
    };

    super(serverExceptionResponse);
  }
}
