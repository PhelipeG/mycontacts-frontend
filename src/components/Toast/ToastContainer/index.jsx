import React, { useEffect, useState } from 'react';

import ToastMessage from '../ToastMessage';
import { Container } from './styles';

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleAddToast({ type, text }) {
      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), type, text },
      ]);
    }
    document.addEventListener('addtoast', handleAddToast);
    // removendo event listener
    return () => {
      document.removeEventListener('addtoast', handleAddToast);
    };
  }, []);

  function handleremoveMessage(id) {
    setMessages((prevState) => prevState.filter(
      (message) => message.id !== id,
    ));
  }

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleremoveMessage}
        />
      ))}
    </Container>
  );
}
