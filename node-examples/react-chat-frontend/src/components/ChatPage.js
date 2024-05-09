import React, { useState, useEffect, useRef } from 'react';

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      ws.current = new WebSocket(`ws://localhost:3000?token=${token}`);

      ws.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setMessages(prev => [...prev, message]);
      };

      ws.current.onclose = (event) => {
        if (event.wasClean) {
          alert('Connection closed cleanly');
        } else {
          alert('Connection died');
        }
      };

      ws.current.onerror = (error) => {
        alert(`WebSocket error: ${error.message}`);
      };
    } else {
      console.error('No token available');
    }

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input && ws.current) {
      ws.current.send(JSON.stringify({ message: input }));
      setInput('');
    }
  };

  return (
    <div>
      <h1>Chat Room</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.message}</li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatPage;

