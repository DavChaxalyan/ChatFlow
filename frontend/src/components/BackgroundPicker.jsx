import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBackgroundForChat } from '../redux/slices/uiSlice';
import { fetchUnsplashImages } from '../redux/slices/unsplashSlice';
import { saveChatBackground } from '../redux/slices/chatSlice';

export default function BackgroundPicker({ chatId }) {
  const dispatch = useDispatch();
  const { images, loading, error } = useSelector((state) => state.unsplash);

  useEffect(() => {
    dispatch(fetchUnsplashImages('chat backgrounds'));
  }, [dispatch]);

  const handleSelect = (url) => {
    dispatch(setBackgroundForChat({ chatId, backgroundUrl: url }));
    dispatch(saveChatBackground({ chatId, backgroundUrl: url }));
  };

  return (
    <div className="p-3 bg-gray-900 rounded-lg shadow-lg max-h-72 overflow-y-auto">
      {loading && <div className="text-white">Loading backgrounds...</div>}
      {error && <div className="text-red-400">Error: {error}</div>}
      <div className="grid grid-cols-3 gap-2">
        {images.map((img) => (
          <img
            key={img.id}
            src={img.urls.thumb}
            alt={img.alt_description}
            className="rounded-lg cursor-pointer hover:opacity-80"
            onClick={() => handleSelect(img.urls.full)}
          />
        ))}
      </div>
    </div>
  );
}
