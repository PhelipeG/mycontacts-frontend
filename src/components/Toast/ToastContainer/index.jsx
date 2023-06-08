import React, { useCallback, useEffect, useState } from 'react';

import ToastMessage from '../ToastMessage';
import { Container } from './styles';

import { toastEventManager } from '../../../utils/toast';

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleAddToast({ type, text, duration }) {
      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(), type, text, duration,
        },
      ]);
    }
    // chamando event
    toastEventManager.on('addtoast', handleAddToast);

    // removendo event listener
    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, []);

  const handleremoveMessage = useCallback((id) => {
    setMessages((prevState) => prevState.filter((message) => message.id !== id));
  }, []);

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
