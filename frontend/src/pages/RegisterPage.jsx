import { useState } from 'react';
import { RegisterUser } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      await dispatch(RegisterUser(form)).unwrap();
      navigate('/chat');
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-xl w-full max-w-md text-white">
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          Create an Account
        </h1>

        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputWithIcon
            icon={<FiUser />}
            placeholder="Username"
            type="text"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <InputWithIcon
            icon={<FiMail />}
            placeholder="Email"
            type="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <InputWithIcon
            icon={<FiLock />}
            placeholder="Password"
            type="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <InputWithIcon
            icon={<FiLock />}
            placeholder="Confirm Password"
            type="password"
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          />

          <button
            type="submit"
            className="w-full py-3 bg-green-500 hover:bg-green-600 transition rounded-lg font-semibold text-white"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-400">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-blue-400 hover:underline cursor-pointer"
          >
            Login here
          </span>
        </div>
      </div>
    </div>
  );
}

function InputWithIcon({ icon, ...props }) {
  return (
    <div className="relative">
      <div className="absolute top-3 left-3 text-gray-400">{icon}</div>
      <input
        {...props}
        className="w-full pl-10 p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
  );
}
