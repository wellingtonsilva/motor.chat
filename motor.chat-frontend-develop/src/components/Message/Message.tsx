import './Message.css';

type MessageProps = {
  id: number;
  message: string;
  user: string;
  timestamp: string;
  isOwnMessage: boolean;
}

export default function Message({ message, user, timestamp, isOwnMessage }: MessageProps) {
  return (
    <div className={`message ${isOwnMessage ? 'own-message' : 'other-message'}`}>
      <div className="message-header">
        <span className="message-user">{user}</span>
        <span className="message-time">{timestamp}</span>
      </div>
      <div className="message-content">{message}</div>
    </div>
  );
}