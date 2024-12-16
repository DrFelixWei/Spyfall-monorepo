import React, { useEffect, useState } from 'react';
import { useSocketManager } from '../../hooks/useSocketManager';
import { ServerEvents } from '@shared/ServerEvents';
import type { ServerPayloads } from '@shared/ServerPayloads';
import { ClientEvents } from '@shared/ClientEvents';
import { Box, Typography, Button, Grid, IconButton } from "@mui/material";
import KickIcon from '@mui/icons-material/Close'; 
import EditIcon from '@mui/icons-material/Edit';

interface LobbyScreenProps {
  sm: ReturnType<typeof useSocketManager>['sm']; 
  lobbyState: ServerPayloads[ServerEvents.LobbyState];
  setCurrentScreen: (screen: string) => void;
}

const LobbyScreen: React.FC<LobbyScreenProps> = ({ sm, lobbyState, setCurrentScreen }) => {

  const MIN_PLAYERS = 3;
  const MAX_PLAYERS = 8;

  const returnToMenu = () => {
    setCurrentScreen('menu');
  }

  const host = lobbyState.players[0];
  const isHost = host.id === localStorage.getItem('spyfall_myId');

  const handleKickPlayer = (playerId: string) => {
    if (!isHost) {
      console.log('Only the host can kick players');
      return;
    }
    sm.emit({
      event: ClientEvents.LobbyKick,
      data: {
        playerId,
      },
    });
    // expect the new lobby state dispatched to be missing this player in the players array -> todo make a callback
  };
  // Check if player has been kicked from the lobby
  useEffect(() => {
    if (lobbyState.players.find(player => player.id === localStorage.getItem('spyfall_myId')) === undefined) {
      console.log('You have been kicked from the lobby');
      returnToMenu(); // Redirect to menu screen
    }
  }, [lobbyState.players]);


  const onStartGame = () => {
    if (lobbyState.players.length < MIN_PLAYERS) {
      alert('Not enough players');
      return;
    }
    console.log('Starting game');
    sm.emit({
      event: ClientEvents.GameStart,
    });
  };
  if (lobbyState.gameStarted) { 
    setCurrentScreen('game');
  }


  const onLeaveLobby = () => {
    localStorage.removeItem('spyfall_myId'); //clear id from local storage
    returnToMenu();
  }


  const editUsername = (playerId: string) => {
    console.log('Editing username');
  };


  return (
    <div>
      <Typography variant="h6" mb={2} textAlign="center">
        Lobby Code: {lobbyState.lobbyId}
      </Typography>

      <Box mb={3}>
        <Typography variant="h6" mb={3}>Players</Typography>
        <Grid container spacing={2} justifyContent="center">
          {lobbyState.players.map((player, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 2,
                  backgroundColor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              >
                { player.id === host.id &&
                <div style={{ margin: '8px 8px 8px 4px', fontSize:'16px'}}>👑</div>
                }
                <Typography variant="body1">{player.username}</Typography>
                
                { isHost && player.id !== host.id &&
                <IconButton
                  onClick={() => handleKickPlayer(player.id)}
                  color="error"
                  aria-label="kick player"
                >
                  <KickIcon />
                </IconButton>
                }

                {/* { player.id === localStorage.getItem('spyfall_myId') &&
                <IconButton
                  onClick={() => editUsername(player.id)}
                  color="error"
                  aria-label="edit name"
                >
                  <EditIcon fontSize='small' style={{ fontSize: '1rem', color: 'black' }}/>
                </IconButton>
                } */}

              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box textAlign="center">
        <Button
          variant="contained"
          color="primary"
          onClick={onStartGame}
          disabled={lobbyState.players.length < MIN_PLAYERS}
          sx={{ fontSize: 16, padding: '10px 20px' }}
        >
          Start Game
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={onLeaveLobby}
          sx={{ fontSize: 16, padding: '10px 20px' }}
        >
          Leave
        </Button>
      </Box>
    </div>
  );
};

export default LobbyScreen;
