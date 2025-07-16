import { useState, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import LoginForm from './components/LoginForm/LoginForm';
import MessageInput from './components/MessageInput/MessageInput';
import Message from './components/Message/Message';
import './App.css';
import ConnectionStatus from './components/ConnectionStatus/ConnectionStatus';

type Message = {
  id: number;
  message: string;
  user: string;
  timestamp: string;
}

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setIsConnected(true);
    });

    newSocket.on('receive_message', (data: Message) => {
      setMessages(prev => [...prev, data]);
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleLogin = (name: string) => {
    setUsername(name);
  };

  const handleSendMessage = (message: string) => {
    if (socket && username.trim()) {
      socket.emit('send_message', {
        message,
        user: username
      });
    }
  };

  if (!username) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>chat</h1>
        <ConnectionStatus isConnected={isConnected} username={username} />
      </div>

      <div className="messages-container">
        {messages.map((msg) => (
          <Message
            key={msg.id}
            id={msg.id}
            message={msg.message}
            user={msg.user}
            timestamp={msg.timestamp}
            isOwnMessage={msg.user === username}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput 
        onSendMessage={handleSendMessage}
        disabled={!isConnected}
      />
    </div>
  );
}

export default App;


