import { IsInt, IsNumber, IsString, Max, Min } from 'class-validator';
import { Piece, Position } from '@app/game/pieces/Piece';

export class LobbyCreateDto
{

}

export class LobbyJoinDto
{
  @IsString()
  lobbyId: string;
}

// export class GameMovePieceDto
// {
//   lobbyId: string;
//   piece: Piece;
//   newPos: Position;
// }