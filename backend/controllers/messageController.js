const Message = require('../models/Message');

exports.uploadMessageFile = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  
      const message = await Message.create({
        sender: req.user._id,
        chatId: req.body.chatId,
        text: req.body.text,
        fileUrl: fileUrl, // ✅ Исправлено
        fileType: req.file.mimetype, // ✅ добавим тип файла
      });
  
      const populatedMessage = await message.populate('sender', 'username');

      req.io.to(req.body.chatId).emit('receiveMessage', populatedMessage);
      res.status(201).json(populatedMessage);
    } catch (err) {
      console.error('❌ File upload error:', err);
      res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
  };
  
