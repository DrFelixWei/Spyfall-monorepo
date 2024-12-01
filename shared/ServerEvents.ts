export enum ServerEvents
{
  // General
  Pong = 'server.pong',

  // Lobby
  LobbyState = 'server.lobby.state',
  UserState = 'server.user.state',

  // Game
  GameMessage = 'server.game.message',
  TimerUpdate = 'server.game.timer',
}
