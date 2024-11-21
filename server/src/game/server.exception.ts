import { WsException } from '@nestjs/websockets';
import { SocketExceptions } from '@shared/SocketExceptions';
import { ServerExceptionResponse } from '@shared/types';

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
