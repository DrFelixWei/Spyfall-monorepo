import React, { useEffect, useState } from 'react'
import { useSocketManager } from '../../hooks/useSocketManager'
import { ServerEvents } from '@shared/ServerEvents'
import type { ServerPayloads } from '@shared/ServerPayloads'
import { ClientEvents } from '@shared/ClientEvents'
import { useLocation } from 'react-router-dom' 
// import { emitEvent } from './utils/analytics'
import { Themes } from './themes'
import { Player } from '@shared/types'

interface GameScreenProps {
  sm: ReturnType<typeof useSocketManager>['sm']; 
  lobbyState: ServerPayloads[ServerEvents.LobbyState];
}

const GameScreen: React.FC<GameScreenProps> = ({ 
  sm,
  lobbyState 
}) => {

  const MIN_PLAYERS = 3
  const MAX_PLAYERS = 8

  
  console.log("lobbyState", lobbyState)

  const [theme, setTheme] = useState(Themes.dark)

  const onStartGame = () => {

    // if (lobbyState.players.length < MIN_PLAYERS) {
    //   alert('Not enough players');
    //   return;
    // }

    sm.emit({
      event: ClientEvents.GameStart,
    });
  };

  // const board = lobbyState?.board


  
  // Receive game state from server

  
  // Send game state to server


  // Render game state

  

  return (
    <div>
        GAMESCREEN
        <br />
        {lobbyState.lobbyId}
        {lobbyState.players.map((player) => (
          <div key={player.id}>{player.username}</div>
        ))}


        <button onClick={onStartGame}>Start</button>


    </div>
  )
}

export default GameScreen
