const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: '*',
  },
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors());
app.use(express.json());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('sendMessage', ({ chatId, senderId, text }) => {
    io.emit('receiveMessage', { chatId, senderId, text });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
