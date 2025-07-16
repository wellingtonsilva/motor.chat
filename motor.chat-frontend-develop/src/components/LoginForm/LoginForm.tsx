import { useState } from 'react';
import './LoginForm.css';

type LoginFormProps = {
  onLogin: (username: string) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <h1>Motor.chat</h1>
      <div className="login-form">
        <input
          type="text"
          placeholder="Digite seu nome"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          className="login-input"
        />
        <button 
          onClick={handleLogin}
          className="login-button"
        >
          Entrar no Chat
        </button>
      </div>
    </div>
  );
}