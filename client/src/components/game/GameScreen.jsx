import React, { useEffect, useState } from 'react'
import { useSocketManager } from '../../hooks/useSocketManager'
import { ClientEvents } from '@shared/ClientEvents'
import { useLocation } from 'react-router-dom' 
// import { emitEvent } from './utils/analytics'
import { Themes } from './Themes'

function GameScreen({
  lobbyState,
  handleMove,
  sm,
}) {

  const [selectedPiece, setSelectedPiece] = useState(null)

  // console.log("lobbyState", lobbyState)

  const [theme, setTheme] = useState(Themes.dark)

  const board = lobbyState?.board

  const movePiece = (piece, newPosition) => {
    handleMove(piece, newPosition)
  }
  

  const onTileClick = (x, y) => {

    if (selectedPiece) {
      movePiece(selectedPiece, { x: x, y: y });
    }
    setSelectedPiece(board.pieces.find(piece => piece.position.x === x && piece.position.y === y))
    
  }


  // Receive game state from server

  
  // Send game state to server


  // Render game state

  

  return (
    <div>
        GAMESCREEN

    </div>
  )
}

export default GameScreen
