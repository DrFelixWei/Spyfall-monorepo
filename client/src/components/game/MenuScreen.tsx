// Menu.tsx
import React, { useState, useEffect } from 'react';
import { ClientEvents } from '@shared/ClientEvents';
import { useSocketManager } from '../../hooks/useSocketManager';


// Define the types for Menu props
interface MenuProps {
  sm: ReturnType<typeof useSocketManager>['sm']; 
}

const MenuScreen: React.FC<MenuProps> = ({ 
  sm 
}) => {

  const [username, setUsername] = useState('');
  const [startOrJoin, setStartOrJoin] = useState('');
  const [lobbyCode, setLobbyCode] = useState('');

  const onCreateGame = () => {
    setStartOrJoin('create');
  };

  const onJoinGame = () => {
    setStartOrJoin('join');
  };

  const onCreateLobby = () => {
    sm.emit({
      event: ClientEvents.LobbyCreate,
      data: { username},
    });
  };
  
  const onJoinLobby = () => {
    if (lobbyCode.trim()) {
      sm.emit({
        event: ClientEvents.LobbyJoin,
        data: {
          lobbyId: lobbyCode,
        },
      });
    } else {
      alert('Please enter a valid lobby code.');
    }
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column', // Stacks items vertically
    justifyContent: 'center', // Centers vertically
    alignItems: 'center', // Centers horizontally
    height: '100vh', // Full viewport height (optional)
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update username while ensuring it doesn't exceed 10 characters
    if (e.target.value.length <= 10) {
      setUsername(e.target.value);
    }
  };

  if (startOrJoin === 'create') {
    return (
      <div style={containerStyle}>
        <input
          type="text"
          placeholder="Enter name"
          value={username}
          onChange={handleUsernameChange}
          maxLength={10} // Limits input to 10 characters
        />
        <button onClick={onCreateLobby}>Create Game</button>
      </div>
    );
  }

  if (startOrJoin === 'join') {
    return (
      <div style={containerStyle}>
        <input
          type="text"
          placeholder="Enter name"
          value={username}
          onChange={handleUsernameChange}
          maxLength={10} // Limits input to 10 characters
        />
        <input
          type="text"
          placeholder="Enter lobby code"
          onChange={(e) => setLobbyCode(e.target.value)}  
        />
        <button onClick={onJoinLobby}>Join Game</button>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <button onClick={onCreateGame}>Create Game</button>
      <button onClick={onJoinGame}>Join Game</button>
    </div>
  );
};


export default MenuScreen;


  // useEffect(() => {
  //   const queryParams = new URLSearchParams(location.search);
  //   const lobbyId = queryParams.get('lobby');

  //   if (lobbyId) {
  //     sm.emit({
  //       event: ClientEvents.LobbyJoin,
  //       data: {
  //         lobbyId: lobbyId,
  //       },
  //     });
  //   }
  // }, [location, sm]);


