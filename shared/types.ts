export type Listener<T> = (data: T) => void;

import { SocketExceptions } from './SocketExceptions';

export type ServerExceptionResponse = {
  exception: SocketExceptions;
  message?: string | object;
};

export type Player = {
  id: string
  username: string;

  role?: string; 
  vote?: string; // the id of another player
}
