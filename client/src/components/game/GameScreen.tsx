import React, { useEffect, useState } from 'react'
import { useSocketManager } from '../../hooks/useSocketManager'
import { ServerEvents } from '@shared/ServerEvents'
import type { ServerPayloads } from '@shared/ServerPayloads'
import { ClientEvents } from '@shared/ClientEvents'
import { useLocation } from 'react-router-dom' 
// import { emitEvent } from './utils/analytics'
import { Themes } from './themes'


interface GameScreenProps {
  sm: ReturnType<typeof useSocketManager>['sm']; 
  lobbyState: ServerPayloads[ServerEvents.LobbyState];
}

const GameScreen: React.FC<GameScreenProps> = ({ 
  sm,
  lobbyState 
}) => {

  
  // console.log("lobbyState", lobbyState)

  const [theme, setTheme] = useState(Themes.dark)

  // const board = lobbyState?.board


  
  // Receive game state from server

  
  // Send game state to server


  // Render game state

  

  return (
    <div>
        GAMESCREEN

        {lobbyState.lobbyId}
        {lobbyState.players.map((player) => (
          <div key={player}>{player}</div>
        ))}

    </div>
  )
}

export default GameScreen
