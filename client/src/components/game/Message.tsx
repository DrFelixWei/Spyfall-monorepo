import React, { useEffect } from 'react';

interface MessageProps {
  color: string;
  content: string;
  onClose: () => void;
}

const Message: React.FC<MessageProps> = ({ color, content, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Automatically close the message after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [onClose]);

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: color,
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
      }}
    >
      {content}
    </div>
  );
};

export default Message;
