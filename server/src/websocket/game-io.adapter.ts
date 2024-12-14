import { ServerOptions, Socket } from 'socket.io';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { CONNECTION_EVENT } from '@nestjs/websockets/constants';

export class GameIoAdapter extends IoAdapter
{
  private options = {
    cors: {
      origin: process.env.CORS_ALLOW_ORIGIN,
    },
    path: '/wsapi',
    transports: ['websocket'],
    serveClient: false,
    maxSocketListeners: 35,
  };

  createIOServer(port: number, options?: ServerOptions): any
  {

    return super.createIOServer(port, {...this.options, ...options});
  }

  public bindClientConnect(server: any, callback: Function)
  {
    server.on(CONNECTION_EVENT, (socket: Socket) => {
      console.log("New connection:", socket.id, ", from:", socket.handshake.headers.origin);
      socket.setMaxListeners(this.options.maxSocketListeners);
      callback(socket);
    });
  }

  // public bindClientConnect(server: any, callback: Function) {
  //   server.on(CONNECTION_EVENT, (socket: Socket) => {
  //     const origin = socket.handshake.headers.origin;
  
  //     // Allowed origins from environment variables
  //     const allowedOrigins = (process.env.CORS_ALLOW_ORIGIN || '').split(',');
  
  //     console.log('New connection:', socket.id, ', from:', origin);
  
  //     // Validate the origin
  //     if (!allowedOrigins.includes(origin)) {
  //       console.warn(`Connection from unauthorized origin: ${origin}`);
  //       socket.disconnect(true); // Forcefully disconnect the socket
  //       return;
  //     }
  
  //     socket.setMaxListeners(this.options.maxSocketListeners);
  //     callback(socket);
  //   });
  // }
}
