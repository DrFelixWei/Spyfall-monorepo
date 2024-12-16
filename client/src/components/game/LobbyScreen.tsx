import React, { useEffect, useState } from 'react';
import { useSocketManager } from '../../hooks/useSocketManager';
import { ServerEvents } from '@shared/ServerEvents';
import type { ServerPayloads } from '@shared/ServerPayloads';
import { ClientEvents } from '@shared/ClientEvents';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Button, Grid, IconButton, Modal } from "@mui/material";
import KickIcon from '@mui/icons-material/Close'; 
import EditIcon from '@mui/icons-material/Edit';
import GameScreen from './GameScreen';

interface LobbyScreenProps {
  sm: ReturnType<typeof useSocketManager>['sm']; 
  lobbyState: ServerPayloads[ServerEvents.LobbyState];
  returnToMenu: () => void;
}

const LobbyScreen: React.FC<LobbyScreenProps> = ({ sm, lobbyState, returnToMenu }) => {

  const MIN_PLAYERS = 3;
  const MAX_PLAYERS = 8;

  console.log("lobbyState", lobbyState);

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

  const onEndGame = () => {
    console.log('Ending game');
    sm.emit({
      event: ClientEvents.GameEnd,
    });
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
    // expect the new lobby state dispatched to be missing this player in the players array -> todo make a callback, for now check if playerId still in players array
  };

  useEffect(() => {
    if (lobbyState.players.find(player => player.id === localStorage.getItem('spyfall_myId')) === undefined) {
      console.log('You have been kicked from the lobby');
      // Redirect to menu screen
      returnToMenu();
    }
  }, [lobbyState.players]);

  const editUsername = (playerId: string) => {
    console.log('Editing username');
  };

  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    if (lobbyState.hasFinished) {
      setOpenModal(true);
    }
  }, [lobbyState.hasFinished]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [spy, setSpy] = useState<string | null>(null);
  useEffect(() => {
    const spy = lobbyState.players.find(player => player.role === 'spy')?.username || null;
    setSpy(spy);
  }, [lobbyState.hasStarted]);


  const onLeaveLobby = () => {
    //clear id from local storage
    localStorage.removeItem('spyfall_myId');
    returnToMenu();
  }

  if (lobbyState.hasStarted) {
    return (
      <div>
        <Modal
          open={openModal} // Control modal visibility with state
          onClose={handleCloseModal}
          aria-labelledby="game-over-title"
          aria-describedby="game-over-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              padding: 4,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography variant="h3" textAlign="center">Game Over</Typography>

            <Typography variant="h6" textAlign="center">{spy} was the Spy!</Typography>

            <Button variant="contained" color="primary" sx={{ marginTop: 2 }}
                    onClick={() => {
                      handleCloseModal();
                      onEndGame();
                    }}
            >
              Start New Game
            </Button>
          </Box>
        </Modal>

        <GameScreen lobbyState={lobbyState} />
      </div>
    );
  }

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
