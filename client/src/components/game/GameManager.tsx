import { useState, useEffect } from 'react';
import { useSocketManager } from '../../hooks/useSocketManager';
import { ServerEvents } from '@shared/ServerEvents';
import type { ServerPayloads } from '@shared/ServerPayloads';
import { ClientEvents } from '@shared/ClientEvents';
import { useRecoilState } from 'recoil';
import { CurrentLobbyState } from './states';
import MenuScreen from './MenuScreen';
import LobbyScreen from './LobbyScreen';

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
      console.log("onLobbyState", data);
      setLobbyState(data);
    };

    const onUserState = async (data: ServerPayloads[ServerEvents.UserState]) => {
      localStorage.setItem('spyfall_myId', data.id); // SAVE USER ID TO LOCAL STORAGE
    }

    const onGameMessage = ({ color, message }: { color: string; message: string }) => {
      // TO DO - Implement game message handling
      console.log(message); 
    };

    sm.registerListener(ServerEvents.LobbyState, onLobbyState);
    sm.registerListener(ServerEvents.UserState, onUserState);
    sm.registerListener(ServerEvents.GameMessage, onGameMessage);

    return () => {
      sm.removeListener(ServerEvents.LobbyState, onLobbyState);
      sm.removeListener(ServerEvents.UserState, onUserState);
      sm.removeListener(ServerEvents.GameMessage, onGameMessage);
    };
  }, [sm, setLobbyState]);


  const [currentScreen, setCurrentScreen] = useState('menu'); 
  useEffect(() => {
    if (lobbyState !== null && currentScreen === 'menu') {
      setCurrentScreen('lobby');
    }
  }, [lobbyState]);

  console.log("currentScreen", currentScreen);
  if (currentScreen === 'menu') {
    return <MenuScreen sm={sm} />;
  }
  if (currentScreen === 'lobby' && lobbyState !== null) {
    return <LobbyScreen sm={sm} lobbyState={lobbyState} returnToMenu={() => setCurrentScreen('menu')}/>;
  }
}
