import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, createGroupChat } from '../redux/slices/chatSlice';
import { useNavigate } from 'react-router-dom';

export default function CreateGroupPage() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.chat);
  const [selected, setSelected] = useState([]);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const toggleUser = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const handleCreate = async () => {
    if (selected.length < 2 || !name.trim()) return;
    await dispatch(createGroupChat({ chatName: name, users: selected }));
    navigate('/chat');
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Create Group</h1>
      <input
        className="border p-2 w-full mb-4"
        placeholder="Group name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="space-y-2 mb-4">
        {users.map((u) => (
          <div
            key={u._id}
            className={`p-2 border rounded cursor-pointer ${
              selected.includes(u._id) ? 'bg-blue-100' : ''
            }`}
            onClick={() => toggleUser(u._id)}
          >
            {u.username}
          </div>
        ))}
      </div>
      <button
        className="bg-green-500 text-white p-2 w-full"
        onClick={handleCreate}
      >
        Create
      </button>
    </div>
  );
}
