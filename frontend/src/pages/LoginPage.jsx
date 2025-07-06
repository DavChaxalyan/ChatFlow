import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const { token } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  useEffect(() => {
    if (token) navigate('/chat');
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-xl w-full max-w-md text-white">
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          Welcome Back 👋
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FiMail className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition rounded-lg font-semibold text-white"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-400">
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-blue-400 hover:underline cursor-pointer"
          >
            Register here
          </span>
        </div>
      </div>
    </div>
  );
}
