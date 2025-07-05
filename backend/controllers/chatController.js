import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsers,
  accessChat,
  fetchMessages,
  clearMessages,
} from '../redux/slices/chatSlice';
import socket from '../socket';

export default function ChatPage() {
  const dispatch = useDispatch();
  const { users, currentChat, messages } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const [text, setText] = useState([]);

  useEffect(() => {
    dispatch(fetchUsers());

    socket.on('receiveMessage', (msg) => {
      if (msg.chatId === currentChat?._id) {
        dispatch(fetchMessages(currentChat._id)); // можно оптимизировать
      }
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [currentChat]);

  const handleUserClick = async (otherUserId) => {
    const result = await dispatch(accessChat(otherUserId)).unwrap();
    dispatch(fetchMessages(result._id));
  };

  const sendMessage = async () => {
    await socket.emit('sendMessage', {
      chatId: currentChat._id,
      senderId: user._id,
      text,
    });
    dispatch(fetchMessages(currentChat._id));
    setText('');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/3 border-r p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Users</h2>
        {users.map((u) => (
          <div
            key={u._id}
            className="cursor-pointer hover:bg-gray-100 p-2 rounded"
            onClick={() => handleUserClick(u._id)}
          >
            {u.username}
          </div>
        ))}
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col p-4">
        <div className="flex-1 overflow-y-auto">
          {messages.map((m, i) => (
            <div key={i} className="mb-2">
              <b>{m.sender.username}:</b> {m.text}
            </div>
          ))}
        </div>
        {currentChat && (
          <div className="flex mt-4">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="border flex-1 p-2"
              placeholder="Type message"
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage} className="bg-blue-500 text-white p-2 ml-2">
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
