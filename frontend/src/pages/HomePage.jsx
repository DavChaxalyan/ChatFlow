import { useNavigate } from 'react-router-dom';
import { FiSend, FiImage, FiVideo, FiSmile } from 'react-icons/fi';
import appLogo from "../images/chat-app-icon.jpg"

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2d1b3c] text-white flex flex-col items-center justify-center px-4">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center max-w-2xl">
        <img className="w-[100px] h-[100px] mb-2 mt-3" src={appLogo} alt='logo-image' />
        <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
          Welcome to ChatFlow
        </h1>
        <p className="text-gray-300 text-lg mb-8">
          A modern, real-time chat platform where you can send messages, share media, and connect instantly.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition"
          >
            Try it now
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-3 border border-white hover:bg-white hover:text-gray-900 text-white font-semibold rounded-full transition"
          >
            Login
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl">
        <Feature icon={<FiSend size={32} />} title="Instant Messaging" desc="Chat with anyone in real-time with lightning speed." />
        <Feature icon={<FiImage size={32} />} title="Share Photos" desc="Send and receive high-quality images seamlessly." />
        <Feature icon={<FiVideo size={32} />} title="Send Videos" desc="Capture and share moments in motion." />
        <Feature icon={<FiSmile size={32} />} title="Emojis & More" desc="Express yourself better with emojis and stickers." />
      </div>

      {/* Footer */}
      <div className="mt-24 text-sm text-gray-500">
        Built with ❤️ by Davit Chaxalyan · ChatFlow © {new Date().getFullYear()}
      </div>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg text-center hover:scale-105 transition transform duration-300">
      <div className="flex items-center justify-center mb-4 text-blue-400">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300 text-sm">{desc}</p>
    </div>
  );
}
