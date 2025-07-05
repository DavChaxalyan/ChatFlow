import { useEffect, useState } from 'react';
import socket from '../socket';
import { useSelector } from 'react-redux';

export default function ChatPage() {
  const { user } = useSelector((state) => state.auth);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receiveMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => socket.off('receiveMessage');
  }, []);

  const sendMessage = () => {
    const msg = { text: message, senderId: user._id };
    socket.emit('sendMessage', msg);
    setMessages((prev) => [...prev, msg]);
    setMessage('');
  };

  return (
    <div className="p-4">
      <div className="border p-4 h-80 overflow-y-auto mb-4">
        {messages.map((m, i) => (
          <div key={i}>{m.text}</div>
        ))}
      </div>
      <input
        type="text"
        className="border p-2 w-full"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
    </div>
  );
}
