import { useState, useEffect } from 'react';
import { FiX, FiUser, FiMail, FiSave, FiEdit2, FiCamera, FiXCircle } from 'react-icons/fi';
import { updateUserProfile } from '../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { setUser, updateAuthUser } from '../redux/slices/authSlice';

export default function ProfilePanel({ user, isOpen, onClose }) {
    const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', avatar: '' });

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || '',
        email: user.email || '',
        avatar: user.avatar || '', 
      });
    }
  }, [user]);

  const handleSave = () => {
    dispatch(updateUserProfile(form))
      .unwrap()
      .then((updatedUser) => {
        setEditMode(false);
        onClose();
        dispatch(setUser(updatedUser));
      })
      .catch((err) => {
        console.error('Update failed:', err);
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white shadow-xl transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold">Profile</h2>
        <FiX onClick={onClose} className="cursor-pointer hover:text-red-400" size={22} />
      </div>

      <div className="p-6 flex flex-col items-center space-y-4">
        {/* Avatar */}
        <div className="relative group">
          <img
            src={form.avatar || `https://ui-avatars.com/api/?name=${form.username}&background=0D8ABC&color=fff`}
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
          />
          {editMode && (
            <label className="absolute bottom-0 right-0 bg-blue-600 p-1 rounded-full cursor-pointer hover:bg-blue-700 transition">
              <FiCamera />
              <input type="file" className="hidden" onChange={handleFileChange} />
            </label>
          )}
        </div>

        {/* Info */}
        {!editMode ? (
          <>
            <h3 className="text-xl font-bold">{form.username}</h3>
            <p className="text-sm text-gray-400">{form.email}</p>
            <button
              onClick={() => setEditMode(true)}
              className="mt-2 flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-full transition"
            >
              <FiEdit2 /> Edit Profile
            </button>
          </>
        ) : (
          <div className="w-full space-y-4">
            <div>
              <label className="text-sm text-gray-400">Username</label>
              <div className="relative">
                <FiUser className="absolute top-3 left-3 text-gray-500" />
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="pl-10 p-2 w-full rounded bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400">Email</label>
              <div className="relative">
                <FiMail className="absolute top-3 left-3 text-gray-500" />
                <input
                  type="email"
                  readOnly
                  value={form.email}
                  className="pl-10 p-2 w-full rounded bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none text-[gray] cursor-auto"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex-1 py-2 bg-green-600 hover:bg-green-700 rounded flex items-center justify-center gap-2 font-semibold"
              >
                <FiSave /> Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="flex-1 py-2 bg-red-600 hover:bg-red-700 rounded flex items-center justify-center gap-2 font-semibold"
              >
                <FiXCircle /> Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
