import { IsInt, IsNumber, IsString, Max, Min } from 'class-validator';

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

export class GameVoteDto
{
  // @IsString()
  // lobbyId: string;

  @IsString()
  voterPlayerId: string;  

  @IsString()
  targetPlayerId: string;  
}

