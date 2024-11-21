// Menu.tsx
import React, { useState, useEffect } from 'react';
import { ClientEvents } from '@shared/ClientEvents';
import { useLocation } from 'react-router-dom';
import { useSocketManager } from '../../hooks/useSocketManager';


// Define the types for Menu props
interface MenuProps {
  sm: ReturnType<typeof useSocketManager>['sm']; 
}

const Menu: React.FC<MenuProps> = ({ sm }) => {
  const location = useLocation();

  const [lobbyCode, setLobbyCode] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const lobbyId = queryParams.get('lobby');

    if (lobbyId) {
      sm.emit({
        event: ClientEvents.LobbyJoin,
        data: {
          lobbyId: lobbyId,
        },
      });
    }
  }, [location, sm]);

  const onPlay = () => {
    // Search for an open lobby, if none found, create a new one
  };

  const onCreateLobby = () => {
    sm.emit({
      event: ClientEvents.LobbyCreate,
      data: {},
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

  return (
    <div>
      <button onClick={onPlay}>Play</button>
      <button onClick={onCreateLobby}>Create Lobby</button>
      <button onClick={onJoinLobby}>Join Lobby</button>
      <input
        type="text"
        placeholder="Enter lobby code"
        value={lobbyCode}
        onChange={(e) => setLobbyCode(e.target.value)}
      ></input>
    </div>
  );
};

export default Menu;
