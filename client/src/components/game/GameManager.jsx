import { useEffect } from 'react'
import { useSocketManager } from '../../hooks/useSocketManager'
import { ServerEvents } from '../websocket/ServerEvents'
// import { ServerPayloads } from '../websocket/ServerPayloads'
import { useRecoilState } from 'recoil'
import { CurrentLobbyState } from './states'
import Menu from './Menu'
import GameScreen from './GameScreen'
import handleMove from './MoveHandler'
import { ClientEvents } from '../websocket/ClientEvents';

export default function GameManager() {
  const { sm } = useSocketManager()
  const [lobbyState, setLobbyState] = useRecoilState(CurrentLobbyState)

  useEffect(() => {
    sm.connect()

    const onLobbyState = async (data) => {
      setLobbyState(data)
      // Use history from react-router to navigate
      window.history.pushState({}, '', `/?lobby=${data.lobbyId}`)
    }

    const onGameMessage = ({ color, message }) => {
      console.log(message) 
    }

    sm.registerListener(ServerEvents.LobbyState, onLobbyState)
    sm.registerListener(ServerEvents.GameMessage, onGameMessage)

    return () => {
      sm.removeListener(ServerEvents.LobbyState, onLobbyState)
      sm.removeListener(ServerEvents.GameMessage, onGameMessage)
    }
  }, [sm, setLobbyState])

  if (lobbyState === null) {
    return <Menu sm={sm} />
  }

  const handleMove = (piece, newPosition) => {
    console.log("handleMove", piece, newPosition)

    sm.emit({
      event: ClientEvents.GameMovePiece,
      data: {
        lobbyId: lobbyState.lobbyId,
        piece: piece,
        newPos: newPosition,
      },
    });
  }

  return <GameScreen lobbyState={lobbyState} handleMove={handleMove} sm={sm}/>
}
