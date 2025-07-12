import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ProfilePanel from '../components/ProfilePanel';
import ChatInput from '../components/ChatInput';
import {
  fetchUsers,
  accessChat,
  fetchMessages,
  sendMessageWithFile,
  fetchUnreadCounts,
  fetchUserChats,
} from '../redux/slices/chatSlice';
import { logout } from '../redux/slices/authSlice';
import { FiMenu, FiLogOut, FiUser, FiSettings, FiMessageSquare } from 'react-icons/fi';
import socket from '../socket';

export default function ChatPage() {
  const dispatch = useDispatch();
  const { users, currentChat, messages, unreadCounts, chats } = useSelector((state) => state.chat);
  const backgrounds = useSelector((state) => state.ui.backgrounds);
  const backgroundUrl = currentChat ? backgrounds[currentChat._id] || currentChat.backgroundUrl : null;
  const { user } = useSelector((state) => state.auth); 
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const chatPartner = currentChat?.members?.find(
      (m) => m._id !== user._id
  );

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchUserChats());
    dispatch(fetchUnreadCounts());
  
    socket.on('receiveMessage', () => {
      if (currentChat) dispatch(fetchMessages(currentChat._id));
      dispatch(fetchUnreadCounts());
    });
  
    return () => socket.off('receiveMessage');
  }, [currentChat, dispatch]);

  useEffect(() => {
    dispatch(fetchUsers());
    socket.on('receiveMessage', () => {
      if (currentChat) dispatch(fetchMessages(currentChat._id));
    });
    return () => socket.off('receiveMessage');
  }, [currentChat, dispatch]);

  useEffect(() => {
    if (user?._id) {
      socket.emit('register', user._id);
    }
  }, [user?._id]);

  useEffect(() => {
    if (currentChat) {
      socket.emit('markAsRead', {
        chatId: currentChat._id,
        readerId: user._id,
      });
    }
  }, [currentChat, user]);

  useEffect(() => {
    socket.on('messagesRead', ({ chatId, readerId }) => {
      dispatch(fetchMessages(chatId)); 
    });
  
    return () => {
      socket.off('messagesRead');
    };
  }, [dispatch]);

  const handleUserClick = async (userId) => {
    const res = await dispatch(accessChat(userId)).unwrap();    
    dispatch(fetchMessages(res._id));
  };

  const sendMessage = ({ text, file }) => {
    dispatch(sendMessageWithFile({
      chatId: currentChat._id,
      senderId: user._id,
      text,
      file,
      token: user.token,
    }));
  };
  

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/login';
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      {/* Sidebar */}
      <div className="w-[320px] border-r border-gray-700 flex flex-col">
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          {user && (
            <div className="flex items-center gap-2">
              <img
                src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}&background=0D8ABC&color=fff`}
                alt="avatar"
                className="w-[100px] h-[100px] rounded-full border-2 border-white-100 object-cover"
              />
            </div>
          )}
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <FiMenu size={22} />
          </button>
        </div>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="bg-gray-800 text-sm px-4 py-2 border-b border-gray-700 space-y-2">
            <div className="flex items-center gap-2 hover:text-blue-400 cursor-pointer" onClick={() => setProfileOpen(true)}>
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
            users.map((u) => {
              const chat = chats.find(
                (c) => c.members.some((m) => m._id === u._id) && !c.isGroup
              );
            
              const unreadCount = chat ? unreadCounts[chat._id] : 0;
            
              return (
                <div
                  key={u._id}
                  onClick={() => handleUserClick(u._id)}
                  className={`p-2 rounded-lg hover:bg-gray-700 cursor-pointer transition flex justify-between items-center ${
                    chatPartner?._id === u?._id ? 'bg-[#07265a]' : ''
                  }`}
                >
                  <span>{u.username}</span>
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2">
                      {unreadCount}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col p-6" style={{
        backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
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
            messages.map((m, i) => {
              const isMine = m.sender._id === user._id;
            
              return (
                <div
                  key={i}
                  className={`mb-4 p-3 rounded-lg max-w-[70%] ${
                    isMine
                      ? 'ml-auto bg-[#48509b61] text-white'
                      : 'mr-auto bg-gray-700 text-white'
                  }`}
                >
                  {/* 💬 Text */}
                  {m.text && <div className="mb-2">{m.text}</div>}
            
                  {/* 🖼️ Image */}
                  {m.fileUrl && m.fileType?.startsWith('image/') && (
                    <img
                      src={m.fileUrl}
                      alt="sent"
                      className="mt-2 w-[200px] h-[200px] max-w-xs rounded-lg border border-gray-500"
                    />
                  )}
            
                  {/* 🎥 Video */}
                  {m.fileUrl && m.fileType?.startsWith('video/') && (
                    <video controls className="mt-2 max-w-xs rounded-lg border border-gray-500">
                      <source src={m.fileUrl} type={m.fileType} />
                    </video>
                  )}
            
                  {/* 🔊 Audio */}
                  {m.fileUrl && m.fileType?.startsWith('audio/') && (
                    <audio controls className="mt-2 w-full">
                      <source src={m.fileUrl} type={m.fileType} />
                    </audio>
                  )}
            
                  {/* 🕓 Time + ✓ Status */}
                  <div className="flex justify-end items-center mt-1 text-xs text-gray-300 gap-1">
                  <span>{new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {m.sender._id === user._id && (
                      <span className="flex items-center gap-1">
                        <span className={`${m.read ? 'text-white' : 'text-black'}`}>✔✔</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })
            
            
          )}
        </div>

        {currentChat && <ChatInput onSend={sendMessage} />}


      </div>
      <ProfilePanel
        user={user}
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
    </div>
  );
}
