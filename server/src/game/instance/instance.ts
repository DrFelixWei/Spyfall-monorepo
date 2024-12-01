import { Lobby } from '@app/game/lobby/lobby';
import { Socket } from 'socket.io';
import { ServerPayloads } from '@shared/ServerPayloads';
import { ServerEvents } from '@shared/ServerEvents';
import { SocketExceptions } from '@shared/SocketExceptions';
import { ServerException } from '@app/game/server.exception';
import { Player } from '@shared/types';
import { locations_1, locations_2 } from '@shared/Locations';

export class Instance
{
  public players: Player[] = [];
  public hasStarted: boolean = false;
  public hasFinished: boolean = false;
  public timer: number = 600000; // 10 minutes
  public locations_type: number = 1;
  public locations: string[] = [];
  public location: string = '';
  public roles: string[] = [];

  constructor(
    private readonly lobby: Lobby, // circular dependency to use lobby for triggering dispatching state
  )
  {
    // this.initializeRound();
  }

  public triggerStart(minClients: number): void
  {
    if (this.hasStarted) {
      return;
    }

    if (this.players.length < minClients) {
      return;
      // throw new ServerException(SocketExceptions.NotEnoughPlayers);
    }

    this.initializeRound();
    this.hasStarted = true;

    this.lobby.dispatchToLobby<ServerPayloads[ServerEvents.GameMessage]>(ServerEvents.GameMessage, {
      color: 'blue',
      message: 'Game started !',
    });
  }

  public triggerFinish(): void
  {
    if (this.hasFinished || !this.hasStarted) {
      return;
    }

    this.hasFinished = true;

    this.lobby.dispatchToLobby<ServerPayloads[ServerEvents.GameMessage]>(ServerEvents.GameMessage, {
      color: 'blue',
      message: 'Game finished !',
    });
  }

  public initializeRound(): void {
    console.log('initializing round');
    // Assign location
    const locations = (() => {
      switch (this.locations_type) {
        case 1:
          return locations_1;
        case 2:
          return locations_2;
        default:
          return locations_1;
      }
    })();
    this.locations = locations.map(location => location.name);
    const location = locations[Math.floor(Math.random() * locations.length)];
    this.location = location.name;
    this.roles = location.roles;
  
    // Assign players roles including spy
    const rolesPlusSpy = [...this.roles];
    const spyIndex = Math.floor(Math.random() * this.players.length);
    this.players.forEach((player, index) => {
      if (index === spyIndex) {
        player.role = 'spy';
      } else {
        // Shuffle and assign the remaining roles
        const roleIndex = Math.floor(Math.random() * rolesPlusSpy.length);
        player.role = rolesPlusSpy.splice(roleIndex, 1)[0];
      }
    });
  }
  
  
}