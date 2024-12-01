import React, { useEffect, useState } from 'react';
import { useSocketManager } from '../../hooks/useSocketManager';
import { ServerEvents } from '@shared/ServerEvents';
import type { ServerPayloads } from '@shared/ServerPayloads';
import { ClientEvents } from '@shared/ClientEvents';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Button, Grid, IconButton } from "@mui/material";
import KickIcon from '@mui/icons-material/Close'; 
import GameUI from './GameUI';

interface GameScreenProps {
  sm: ReturnType<typeof useSocketManager>['sm']; 
  lobbyState: ServerPayloads[ServerEvents.LobbyState];
}

const GameScreen: React.FC<GameScreenProps> = ({ sm, lobbyState }) => {

  const MIN_PLAYERS = 3;
  const MAX_PLAYERS = 8;

  console.log("lobbyState", lobbyState);

  const onStartGame = () => {
    if (lobbyState.players.length < MIN_PLAYERS) {
      alert('Not enough players');
      return;
    }

    sm.emit({
      event: ClientEvents.GameStart,
    });
  };

  const handleKickPlayer = (playerId: string) => {
    // Implement player kicking logic
    console.log(`Kicking player: ${playerId}`);
  };

  if (lobbyState.hasStarted) {
    return (
      <div>
        <GameUI lobbyState={lobbyState} />
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h6" mb={2} textAlign="center">
        Lobby Code: {lobbyState.lobbyId}
      </Typography>

      <Box mb={3}>
        <Typography variant="h6" mb={2}>Players</Typography>
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
                <Typography variant="body1">{player.username}</Typography>
                <IconButton
                  onClick={() => handleKickPlayer(player.id)}
                  color="error"
                  aria-label="kick player"
                >
                  <KickIcon />
                </IconButton>
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
      </Box>
    </div>
  );
};

export default GameScreen;
