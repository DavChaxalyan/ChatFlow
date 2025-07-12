import { useState } from 'react';
import BackgroundPicker from './BackgroundPicker';
import { useSelector } from 'react-redux';

export default function BackgroundSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentChat } = useSelector((state) => state.chat);

  return (
    <>
      {/* Кнопка вызова модалки */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-lg hover:brightness-110 transition"
        aria-label="Choose chat background"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h4l2 3h6a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
        </svg>
        <span className="font-semibold">Choose Background</span>
      </button>

      {/* Модальное окно */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)} // закрытие при клике на фон
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-gray-900 rounded-xl p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()} // чтобы клик по модалке не закрывал ее
          >
            {/* Кнопка закрытия */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
              aria-label="Close background selector"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Заголовок */}
            <h2 className="text-white text-xl font-semibold mb-4 text-center">
              Select a Chat Background
            </h2>

            {/* Компонент выбора фона */}
            <BackgroundPicker chatId={currentChat?._id} />
          </div>
        </div>
      )}
    </>
  );
}
