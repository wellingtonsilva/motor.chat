import './ConnectionStatus.css';

type ConnectionStatusProps = {
  isConnected: boolean;
  username: string;
}

export default function ConnectionStatus({ isConnected, username }: ConnectionStatusProps) {
  return (
    <div className="connection-status">
      <span className={`status ${isConnected ? 'connected' : 'disconnected'}`}>
        {isConnected ? '🟢 Conectado' : '🔴 Desconectado'}
      </span>
      <span className="username">Usuário: {username}</span>
    </div>
  );
}