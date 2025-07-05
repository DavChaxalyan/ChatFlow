import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  fetchUsers,
  accessChat,
  fetchMessages,
  sendMessages,
} from '../redux/slices/chatSlice';
import { logout } from '../redux/slices/authSlice';
import { FiMenu, FiLogOut, FiUser, FiSettings, FiMessageSquare } from 'react-icons/fi';
import socket from '../socket';

export default function ChatPage() {
  const dispatch = useDispatch();
  const { users, currentChat, messages } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);  
  const [text, setText] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  
  const chatPartner = currentChat?.members?.find(
      (m) => m._id !== user._id
  );

  useEffect(() => {
    dispatch(fetchUsers());
    socket.on('receiveMessage', () => {
      if (currentChat) dispatch(fetchMessages(currentChat._id));
    });
    return () => socket.off('receiveMessage');
  }, [currentChat, dispatch]);

  const handleUserClick = async (userId) => {
    const res = await dispatch(accessChat(userId)).unwrap();    
    dispatch(fetchMessages(res._id));
  };

  const sendMessage = () => {
    if (!text.trim()) return;
    const sendForm = {chatId: currentChat._id, senderId: user._id, text}
    dispatch(sendMessages(sendForm));
    setText('');
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/login';
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      {/* Sidebar */}
      <div className="w-1/4 border-r border-gray-700 flex flex-col">
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          {user && (
            <div className="flex items-center gap-2">
                <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold uppercase">
                {user.username[0]}
                </div>
            </div>
          )}
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <FiMenu size={22} />
          </button>
        </div>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="bg-gray-800 text-sm px-4 py-2 border-b border-gray-700 space-y-2">
            <div className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
              <FiUser /> Profile
            </div>
            <div className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
              <FiSettings /> Settings
            </div>
            <div
              onClick={handleLogout}
              className="flex items-center gap-2 hover:text-red-400 cursor-pointer"
            >
              <FiLogOut /> Logout
            </div>
          </div>
        )}

        {/* Users */}
        <div className="flex-1 overflow-y-auto p-4">
          <h2 className="text-lg font-bold mb-3">Chats</h2>
          {users.length === 0 ? (
            <div className="text-gray-400 mt-10 text-center">
              <FiMessageSquare className="mx-auto mb-2" size={32} />
              No users available
            </div>
          ) : (
            users.map((u) => (
              <div
                key={u._id}
                onClick={() => handleUserClick(u._id)}
                className={`p-2 rounded-lg hover:bg-gray-700 cursor-pointer transition ${chatPartner?._id === u?._id ? "bg-[#07265a] hover:bg-[#07265a]" : ""}`}
              >
                {u.username}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col p-6">
        <div className="flex-1 overflow-y-auto mb-4">
          {!currentChat ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <FiMessageSquare size={48} className="mb-4" />
              <p className="text-lg">Select a user to start chatting</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center text-gray-400 mt-20">
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages.map((m, i) => (
              <div key={i} className="mb-3">
                <span className="font-semibold text-blue-400">{m.sender.username}:</span>{' '}
                <span>{m.text}</span>
              </div>
            ))
          )}
        </div>

        {currentChat && (
          <div className="flex">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1 p-3 rounded-l-lg bg-gray-700 border border-gray-600 text-white outline-none"
              placeholder="Type your message..."
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 px-6 text-white rounded-r-lg transition"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
