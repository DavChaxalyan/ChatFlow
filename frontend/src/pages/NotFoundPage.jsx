import { useNavigate } from 'react-router-dom';
import { FiAlertTriangle } from 'react-icons/fi';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white px-4">
      <div className="text-center">
        <FiAlertTriangle size={64} className="text-yellow-400 mb-6 animate-bounce" />
        <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          404 - Page Not Found
        </h1>
        <p className="text-gray-300 text-lg mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
