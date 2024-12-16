import { Lobby } from '@app/game/lobby/lobby';
import { Socket } from 'socket.io';
import { ServerPayloads } from '@shared/ServerPayloads';
import { ServerEvents } from '@shared/ServerEvents';
import { SocketExceptions } from '@shared/SocketExceptions';
import { ServerException } from '@app/game/server.exception';
import { Player } from '@shared/types';
import { locations_1, locations_2 } from '@shared/locations';

export class Instance {
  public players: Player[] = [];
  public gameStarted: boolean = false;
  public gameOver: boolean = false;
  public timer: number = 600000; // 10 minutes in milliseconds
  private timerInterval: NodeJS.Timeout | null = null; // To hold the interval ID

  public locations_type: number = 1;
  public locations: string[] = [];
  public location: string = '';
  public roles: string[] = [];

  constructor(private readonly lobby: Lobby) {
    console.log("Instance created");
  }

  public resetGame(): void {
    this.players.forEach(player => {
      player.role = '';
      player.vote = '';
    });
    this.gameStarted = false;
    this.gameOver = false;
    this.timer = 600000;
    this.location = '';
    this.roles = [];

    this.lobby.dispatchLobbyState();
  }
  

  public triggerStart(minClients: number): void {
    if (this.gameStarted) {
      return;
    }

    if (this.players.length < minClients) {
      throw new ServerException(SocketExceptions.GameError, 'Not enough players to start the game');
    }

    this.initializeGame();
    this.gameStarted = true;

    // Start the timer
    this.startTimer();

    this.lobby.dispatchToLobby<ServerPayloads[ServerEvents.GameMessage]>(ServerEvents.GameMessage, {
      color: 'blue',
      message: 'Game started!',
    });
  }

  public triggerGameOver(): void {
    if (this.gameOver || !this.gameStarted) {return;}
    this.gameOver = true;

    // Stop the timer
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    this.lobby.dispatchLobbyState();
    this.lobby.dispatchToLobby<ServerPayloads[ServerEvents.GameMessage]>(ServerEvents.GameMessage, {
      color: 'blue',
      message: 'Game finished!',
    });
  }

  private startTimer(): void {
    this.timerInterval = setInterval(() => {
      if (this.timer > 0) {
        this.timer -= 1000; // Decrease by 1 second
        this.lobby.dispatchLobbyState();
      } else {
        this.triggerGameOver();
      }
    }, 1000);
  }

  public initializeGame(): void {
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
