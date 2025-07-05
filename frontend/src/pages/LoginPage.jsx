import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';
import { useState } from 'react';

export default function LoginPage() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" placeholder="Email" className="w-full p-2 border" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" className="w-full p-2 border" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Login</button>
      </form>
    </div>
  );
}
