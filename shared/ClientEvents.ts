export enum ClientEvents
{
  // General
  Ping = 'client.ping',

  // Lobby
  LobbyCreate = 'client.lobby.create',
  LobbyJoin = 'client.lobby.join',
  LobbyLeave = 'client.lobby.leave',

  // Game
  GameStart = 'client.game.start',
  GameVote = 'client.game.vote',
}
