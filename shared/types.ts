export type Listener<T> = (data: T) => void;

import { SocketExceptions } from './SocketExceptions';

export type ServerExceptionResponse = {
  exception: SocketExceptions;
  message?: string | object;
};