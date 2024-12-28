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
    if (!username.trim()) {
      alert('Enter a valid username');
      return;
    }
    sm.emit({
      event: ClientEvents.LobbyCreate,
      data: { 
        username: username,
      },
    });
  };
  
  const onJoinLobby = () => {
    if (!lobbyCode.trim()) {
      alert('Enter a valid lobby code');
      return;
    }
    if (!username.trim()) {
      alert('Enter a valid username');
      return;
    }
    sm.emit({
      event: ClientEvents.LobbyJoin,
      data: {
        lobbyId: lobbyCode,
        username: username,
      },
    });
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column', // Stacks items vertically
    justifyContent: 'center', // Centers vertically
    alignItems: 'center', // Centers horizontally
  };
  const buttonStyle: React.CSSProperties = {
    margin: '5px',
    padding: '20px 30px', 
    fontSize: '24px',
    borderRadius: '8px', 
  };
  const inputStyle: React.CSSProperties = {
    padding: '10px', 
    fontSize: '20px',
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 10) {
      setUsername(e.target.value);
    }
  };

  const onNavBack = () => {
    setStartOrJoin('');
  };

  if (startOrJoin === 'create') {
    return (
      <div style={containerStyle}>
        <input
          type="text"
          placeholder="Enter name"
          value={username}
          onChange={handleUsernameChange}
          maxLength={10} 
          style={inputStyle}
        />
        <button onClick={onCreateLobby} style={buttonStyle}>Create Game</button>
        <button onClick={onNavBack} style={buttonStyle}>Back</button>
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
          maxLength={10}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Enter lobby code"
          onChange={(e) => setLobbyCode(e.target.value)}  
          style={inputStyle}
        />
        <button onClick={onJoinLobby} style={buttonStyle}>Join Game</button>

        <button onClick={onNavBack} style={buttonStyle}>Back</button>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <button onClick={onCreateGame} style={buttonStyle}>Create Game</button>
      <button onClick={onJoinGame} style={buttonStyle}>Join Game</button>
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


