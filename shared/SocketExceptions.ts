export enum SocketExceptions
{
  // General
  UnexpectedError = 'exception.unexpected_error',
  UnexpectedPayload = 'exception.unexpected_payload',

  // Lobby
  LobbyError = 'exception.lobby.error',

  // Game
  GameError = 'exception.game.error',
}

export type ServerExceptionResponse = {
  exception: SocketExceptions
  message?: string | object
}