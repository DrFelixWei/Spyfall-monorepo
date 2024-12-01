import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import type { ServerPayloads } from "@shared/ServerPayloads";
import { ServerEvents } from "@shared/ServerEvents";

interface GameUIProps {
  lobbyState: ServerPayloads[ServerEvents.LobbyState];
}

const GameUI: React.FC<GameUIProps> = ({ lobbyState }) => {
  const locations = lobbyState.locations; // a string array
  const location = lobbyState.location; // a string
  const roles = lobbyState.roles; // a string array
  const myId = localStorage.getItem("spyfall_myId"); // a string
  const myRole = lobbyState.players.find((player) => player.id === myId)?.role; // a string
  const players = lobbyState.players.map((player) => player.username); // a string array
  const time = lobbyState.time; // a number, milliseconds

  const handleLocationClick = () => {
    // to do - toggle strikethrough font style
  };

  const handleVoteClick = () => {
    // to do - implement voting logic
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
  }

  return (
    <div style={containerStyle}>
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


    </Box>
    </div>
  );
};

export default GameUI;
