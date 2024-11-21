import { useEffect } from 'react';
import { useSocketManager } from '../../hooks/useSocketManager';
import { ServerEvents } from '@shared/ServerEvents';
import type { ServerPayloads } from '@shared/ServerPayloads';
import { ClientEvents } from '@shared/ClientEvents';
import { useRecoilState } from 'recoil';
import { CurrentLobbyState } from './states';
import Menu from './Menu';
import GameScreen from './GameScreen';

// Define the types for GameManager props
interface GameManagerProps {
  sm: ReturnType<typeof useSocketManager>['sm']; // Infer the type of sm from useSocketManager
  lobbyState: ServerPayloads[ServerEvents.LobbyState] | null;
}

export default function GameManager() {
  const { sm } = useSocketManager();
  const [lobbyState, setLobbyState] = useRecoilState(CurrentLobbyState);

  useEffect(() => {
    sm.connect();

    const onLobbyState = async (data: ServerPayloads[ServerEvents.LobbyState]) => {
      setLobbyState(data);
      // Use history from react-router to navigate
      window.history.pushState({}, '', `/?lobby=${data.lobbyId}`);
    };

    const onGameMessage = ({ color, message }: { color: string; message: string }) => {
      console.log(message);
    };

    sm.registerListener(ServerEvents.LobbyState, onLobbyState);
    sm.registerListener(ServerEvents.GameMessage, onGameMessage);

    return () => {
      sm.removeListener(ServerEvents.LobbyState, onLobbyState);
      sm.removeListener(ServerEvents.GameMessage, onGameMessage);
    };
  }, [sm, setLobbyState]);

  if (lobbyState === null) {
    return <Menu sm={sm} />;
  }

  return <GameScreen lobbyState={lobbyState} />;
}
