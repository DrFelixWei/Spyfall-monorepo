import React, { useState } from "react";
import { Box, Grid, Card, CardContent, Typography, Button } from "@mui/material";
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

  const handleLocationClick = () => {
    // Empty function for location card click
  };

  const handleVoteClick = () => {
    // Empty function for voting
  };


  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column', // Stacks items vertically
    justifyContent: 'center', // Centers vertically
    alignItems: 'center', // Centers horizontally
    // height: '100vh',
    maxWidth: '60vw',
  };

  return (
    <div style={containerStyle}>
    <Box sx={{ p: 3, backgroundColor: "background.default", color: "text.primary" }}>
      {/* Location display */}
      <Box textAlign="center" mb={2}>
        <Typography variant="h4" fontWeight="bold">
          {myRole === "Spy" ? "???" : location}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Your Role: {myRole || "N/A"}
        </Typography>
      </Box>

            {/* Players voting panel */}
            <Box>
        <Typography variant="h6" mb={1}>
          Vote for a Player
        </Typography>
        <Grid container spacing={2}>
          {players.map((player, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                onClick={handleVoteClick}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  p: 2,
                }}
              >
                <Typography variant="body1">{player}</Typography>
              </Card>
            </Grid>
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
            <Grid item xs={1} key={index}>
              <Card
                sx={{ cursor: "pointer", textAlign: "center" }}
                onClick={handleLocationClick}
              >
                <CardContent sx={{ paddingTop: 0, paddingBottom: 0 }}>
                  <Typography variant="body2">{loc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>


    </Box>
    </div>
  );
};

export default GameUI;
