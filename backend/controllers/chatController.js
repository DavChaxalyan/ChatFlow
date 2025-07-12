const Chat = require('../models/Chat');
const Message = require('../models/Message');

exports.accessChat = async (req, res) => {
  const { userId } = req.body;
  let chat = await Chat.findOne({
    isGroup: false,
    members: { $all: [req.user._id, userId] },
  }).populate('members', '-password');

  if (!chat) {
    chat = await Chat.create({
      members: [req.user._id, userId],
    });
    await chat.populate('members', '-password');
  }

  res.json(chat);
};

exports.getUserChats = async (req, res) => {
  const chats = await Chat.find({ members: req.user._id })
    .populate('members', '-password')
    .sort({ updatedAt: -1 });
  res.json(chats);
};

exports.getMessages = async (req, res) => {
  const chatId = req.params.chatId;
  const userId = req.user._id;

  await Message.updateMany(
    { chatId, sender: { $ne: userId }, read: false },
    { $set: { read: true } }
  );
  const messages = await Message.find({ chatId }).populate('sender', 'username');
  res.json(messages);
};

exports.sendMessage = async (req, res) => {
  const { text } = req.body;  
  const message = await Message.create({
    sender: req.user._id,
    chatId: req.params.chatId,
    text,
    read: false,
  });

  const populatedMsg = await message.populate('sender', 'username');
  res.json(populatedMsg);
};

exports.createGroupChat = async (req, res) => {
    const { chatName, users } = req.body;
  
    if (!chatName || !users || users.length < 2) {
      return res.status(400).json({ message: 'Group must have name and 2+ members' });
    }
  
    const newGroup = await Chat.create({
      chatName,
      members: [...users, req.user._id],
      isGroup: true,
      admin: req.user._id,
    });
  
    await newGroup.populate('members', '-password');
    res.status(201).json(newGroup);
  };
  
  exports.getUnreadMessagesCount = async (req, res) => {
    try {
      const messages = await Message.aggregate([
        {
          $match: {
            read: false,
            sender: { $ne: req.user._id },
          },
        },
        {
          $group: {
            _id: '$chatId',
            count: { $sum: 1 },
          },
        },
      ]);
  
      res.json(messages);
    } catch (err) {
      res.status(500).json({ message: 'Error getting unread messages' });
    }
  };
  