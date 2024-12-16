export enum ClientEvents
{
  // General
  Ping = 'client.ping',

  // Lobby
  LobbyCreate = 'client.lobby.create',
  LobbyJoin = 'client.lobby.join',
  LobbyLeave = 'client.lobby.leave',
  LobbyKick = 'client.lobby.kick',

  // Game
  GameStart = 'client.game.start',
  GameEnd = 'client.game.finish',
  GameVote = 'client.game.vote',
}
