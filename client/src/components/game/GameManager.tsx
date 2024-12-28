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
import { Container, Box, Typography, Tooltip, IconButton, Link, } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

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

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Box component="header" sx={{ padding: 2, flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4" fontWeight="bold">
          Spyfall
        </Typography>

        <Tooltip
          title={
            <Typography variant="body2" sx={{ maxWidth: 300 }}>
              Spyfall is a 3-8 player game where players take turns asking each other questions.
              One player is secretly a spy trying to figure out the location, without revealing their identity. 
              The other players' goal is to identify the spy by asking each other questions without revealing too much information that would allow the spy to figure out the location.
            </Typography>
          }
          arrow
        >
          <IconButton sx={{ color: 'white' }}>
            <HelpOutlineIcon fontSize="large"/>
          </IconButton>
        </Tooltip>
      </Box>

      {gameMessage.content && (
        <Box sx={{ marginBottom: 2 }}>
          <Message
            color={gameMessage.color}
            content={gameMessage.content}
            onClose={() => setGameMessage({ color: '', content: '' })}
          />
        </Box>
      )}

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {currentScreen === 'menu' && <MenuScreen sm={sm} />}
        {currentScreen === 'lobby' &&
          lobbyState !== null && (
            <LobbyScreen
              sm={sm}
              lobbyState={lobbyState}
              setCurrentScreen={setCurrentScreen}
            />
          )}
        {currentScreen === 'game' &&
          lobbyState !== null && (
            <GameScreen
              sm={sm}
              lobbyState={lobbyState}
              setCurrentScreen={setCurrentScreen}
            />
          )}
      </Box>

      <Box component="footer" sx={{ padding: 2 }}>
        <Typography variant="body2" color="white">
          Spyfall is originally a 3-8 player card game designed by Alexander Ushan
          and published by Hobby World. This project is a digital adaptation of
          the game.
          Source code available at{' '}
          <Link
            href="https://github.com/DrFelixWei/Spyfall-monorepo"
            target="_blank"
            rel="noreferrer"
            underline="hover"
          >
            github.com/DrFelixWei/Spyfall
          </Link>
        </Typography>
        <Typography variant="caption" color="warning">
          Disclaimer: I am hosting this on a free-tier so the server can take up to 1 minute to wake up from inactivity.
        </Typography>
      </Box>
    </Container>
  );
}
