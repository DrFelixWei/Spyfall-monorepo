import React, { useState, useEffect } from "react";
import { useSocketManager } from '../../hooks/useSocketManager';
import type { ServerPayloads } from "@shared/ServerPayloads";
import { ServerEvents } from "@shared/ServerEvents";
import { ClientEvents } from '@shared/ClientEvents';
import { Box, Card, CardContent, Typography, Button, Modal } from "@mui/material";
import Grid from "@mui/material/Grid2";

interface GameScreenProps {
  sm: ReturnType<typeof useSocketManager>['sm']; 
  lobbyState: ServerPayloads[ServerEvents.LobbyState];
  setCurrentScreen: (screen: string) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ sm, lobbyState, setCurrentScreen }) => {
  const locations = lobbyState.locations; // a string array
  const location = lobbyState.location; // a string
  const roles = lobbyState.roles; // a string array
  const myId = localStorage.getItem("spyfall_myId"); // a string
  const myRole = lobbyState.players.find((player) => player.id === myId)?.role; // a string
  const players = lobbyState.players.map((player) => player.username); // a string array
  const time = lobbyState.time; // a number, milliseconds

  const host = lobbyState.players[0];
  const isHost = host.id === localStorage.getItem('spyfall_myId');

  const [spy, setSpy] = useState<string | null>(null);
  useEffect(() => {
    const spy = lobbyState.players.find(player => player.role === 'spy')?.username || null;
    setSpy(spy);
  }, [lobbyState.gameStarted]);

  const [openGameOverModal, setOpenGameOverModal] = useState(false);
  useEffect(() => {
    if (lobbyState.gameOver) {
      setOpenGameOverModal(true);
    }
  }, [lobbyState.gameOver]);

  const handleCloseModal = () => {
    setOpenGameOverModal(false);
  };

  const endGame = () => {
    sm.emit({
      event: ClientEvents.GameEnd,
    });
  }

  const returnToLobby = () => {
    sm.emit({
      event: ClientEvents.GameReturnToLobby,
    });
  }

  useEffect(() => {
    if (!lobbyState.gameStarted) {
      setCurrentScreen('lobby');
    }
  }, [lobbyState.gameStarted]);


  const handleLocationClick = () => {
    // TODO: toggle strikethrough font style
  };

  const handleVoteClick = () => {
    // TODO: implement voting who is spy logic
  };


  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column', // Stacks items vertically
    justifyContent: 'center', // Centers vertically
    alignItems: 'center', // Centers horizontally
    // height: '100vh',
    maxWidth: '60vw',
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };



  return (
    <div style={containerStyle}>

      {/* Game Over Modal */}
      <Modal
        open={openGameOverModal} 
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

          { isHost && 
            <Button variant="contained" color="primary" sx={{ marginTop: 2 }}
                    onClick={() => {
                      handleCloseModal();
                      returnToLobby();
                    }}
            >
              Return To Lobby
            </Button>
          }
        </Box>
      </Modal>

      <Box sx={{ p: 3, backgroundColor: "background.default", color: "text.primary" }}>
        {/* Location display */}
        <Box textAlign="center" mb={2}>
          <Typography variant="h4" fontWeight="bold">
            {myRole === "spy" ? "???" : location}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Your Role: {myRole || "N/A"}
          </Typography>
        </Box>

        {/* Timer display */}
        <Box textAlign="center" mb={2}>
          <Typography variant="h6" fontWeight="bold">
            Time Left: {formatTime(time!!)}
          </Typography>
        </Box>

          {/* Players voting panel */}
          <Box>
          <Typography variant="h6" mb={1}>
            Players
          </Typography>
          <Grid container spacing={2}>
            {players.map((player, index) => (
                <Card
                  key={index}
                  onClick={handleVoteClick}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    p: 1,
                  }}
                >
                  <Typography variant="body1">{player}</Typography>
                </Card>
            ))}
          </Grid>
        </Box>

        {/* Grid of possible locations */}
        <Box mb={3}>
          <Typography variant="h6" mb={1}>
            Possible Locations
          </Typography>
          <Grid container spacing={2} columns={{ xs: 1, sm: 2, md: 3 }}>
            {locations!!.map((loc, index) => (
                <Card
                  key={index}
                  variant="outlined"
                  sx={{ cursor: "pointer", textAlign: "center", paddingTop: 0, paddingBottom: 0 }}
                  onClick={handleLocationClick}
                >
                  {/* <CardContent sx={{ paddingTop: 0, paddingBottom: 0 }}> */}
                    <Typography variant="body2" sx={{ padding: 0.5 }}>{loc}</Typography>
                  {/* </CardContent> */}
                </Card>
            ))}
          </Grid>
        </Box>

        {/* End Game Button */}
        { isHost && 
        <Button variant="contained" color="error" onClick={endGame}>
          End Game
        </Button>
        }


      </Box>
    </div>
  );
};

export default GameScreen;
