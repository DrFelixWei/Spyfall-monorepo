import { IsInt, IsNumber, IsString, Max, Min } from 'class-validator';
// import { Piece, Position } from '@app/game/pieces/Piece';

export class LobbyCreateDto
{
  @IsString()
  username: string;
}

export class LobbyJoinDto
{
  @IsString()
  lobbyId: string;

  @IsString()
  username: string;
}

export class GameStartDto
{
  // @IsString()
  // lobbyId: string;
}

export class GameVoteDto
{
  // @IsString()
  // lobbyId: string;

  @IsString()
  voterPlayerId: string;  

  @IsString()
  targetPlayerId: string;  
}

// export class GameMovePieceDto
// {
//   lobbyId: string;
//   piece: Piece;
//   newPos: Position;
// }