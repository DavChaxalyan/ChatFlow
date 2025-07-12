const Message = require('../models/Message');

exports.uploadMessageFile = async (req, res) => {
  try {
    const { chatId, text } = req.body;
    const senderId = req.user._id;

    if (!chatId) {
      return res.status(400).json({ message: 'Chat ID is required' });
    }

    const messageData = {
      sender: senderId,
      chatId,
      read: false,
    };

    if (text) {
      messageData.text = text;
    }

    if (req.file) {
      const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      messageData.fileUrl = fileUrl;
      messageData.fileType = req.file.mimetype;
    }

    const message = await Message.create(messageData);
    const populatedMessage = await message.populate('sender', 'username');

    req.io.to(chatId).emit('receiveMessage', populatedMessage);
    res.status(201).json(populatedMessage);
  } catch (err) {
    console.error('❌ Error sending message:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

  
