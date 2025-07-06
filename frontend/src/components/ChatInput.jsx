import { useState } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

export default function ChatInput({ onSend }) {
  const [text, setText] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [fileToSend, setFileToSend] = useState(null);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const voiceFile = new File([blob], 'voice.webm', { type: 'audio/webm' });
        setFileToSend(voiceFile);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    } catch (err) {
      console.error('Microphone access denied or error:', err);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const handleSend = () => {
    if (!text.trim() && !fileToSend) return;
    onSend({ text: text.trim(), file: fileToSend });
    setText('');
    setFileToSend(null);
  };

  return (
    <div className="relative">
      {/* Input Panel */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 rounded-xl shadow-lg">
        {/* 📎 File Upload */}
        <label className="cursor-pointer text-gray-400 hover:text-blue-500 transition">
          <input
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) setFileToSend(file);
            }}
          />
          📎
        </label>

        {/* 😀 Emoji Button */}
        <button
          className="text-gray-400 hover:text-yellow-400 transition"
          onClick={() => setShowEmoji(!showEmoji)}
        >
          😄
        </button>

        {/* 🎤 Voice Recorder */}
        <button
          className={`text-gray-400 transition ${recording ? 'text-red-500' : 'hover:text-red-400'}`}
          onClick={recording ? handleStopRecording : handleStartRecording}
        >
          🎤
        </button>

        {/* ✏️ Input Field */}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white outline-none"
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />

        {/* 📤 Send Button */}
        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          ➤
        </button>
      </div>

      {/* 🖼️ Preview Attached File */}
      {fileToSend && (
        <div className="mt-2 ml-4 text-sm text-gray-300 flex items-center gap-2">
          <span>📎 {fileToSend.name}</span>
          <button
            onClick={() => setFileToSend(null)}
            className="text-red-400 hover:text-red-600 text-xs"
          >
            ✕ Remove
          </button>
        </div>
      )}

      {/* 😄 Emoji Picker */}
      {showEmoji && (
        <div className="absolute bottom-16 left-4 z-50">
          <Picker
            data={data}
            onEmojiSelect={(emoji) => setText((prev) => prev + emoji.native)}
            theme="dark"
          />
        </div>
      )}
    </div>
  );
}
