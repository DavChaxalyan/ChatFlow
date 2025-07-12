const Chat = require('../models/Chat');

exports.setChatBackground = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { backgroundUrl } = req.body;

    if (!backgroundUrl) {
      return res.status(400).json({ message: 'backgroundUrl is required' });
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    chat.backgroundUrl = backgroundUrl;
    await chat.save();

    res.json({ message: 'Background updated', backgroundUrl });
  } catch (err) {
    console.error('Error updating chat background:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
