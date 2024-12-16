import { useState, useEffect } from 'react';
import { useSocketManager } from '../../hooks/useSocketManager';
import { ServerEvents } from '@shared/ServerEvents';
import type { ServerPayloads } from '@shared/ServerPayloads';
import { ClientEvents } from '@shared/ClientEvents';
import { useRecoilState } from 'recoil';
import { CurrentLobbyState } from './states';
import MenuScreen from './MenuScreen';
import LobbyScreen from './LobbyScreen';
import Message from './Message';
import GameScreen from './GameScreen';

// Define the types for GameManager props
interface GameManagerProps {
  sm: ReturnType<typeof useSocketManager>['sm']; // Infer the type of sm from useSocketManager
  lobbyState: ServerPayloads[ServerEvents.LobbyState] | null;
}

export default function GameManager() {
  const { sm } = useSocketManager();
  const [lobbyState, setLobbyState] = useRecoilState(CurrentLobbyState);

  const [gameMessage, setGameMessage] = useState({ color: '', content: '' });

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
      console.log(message); 
      setGameMessage({ color, content: message });
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

  return(
    <>
        {gameMessage && (
        <Message
          color={gameMessage.color}
          content={gameMessage.content}
          onClose={() => setGameMessage({ color: '', content: '' })} 
        />
      )}

      {currentScreen === 'menu' && <MenuScreen sm={sm} />}
      {currentScreen === 'lobby' && lobbyState !== null && <LobbyScreen sm={sm} lobbyState={lobbyState} setCurrentScreen={setCurrentScreen} />}
      {/* {currentScreen === 'game' && lobbyState !==null && <GameScreen lobbyState={lobbyState} />} */}  {/* TODO: refactor so that gamescreen is navigated to from game manager instead of contained in lobbyscreen */}
    </>
  )
}
