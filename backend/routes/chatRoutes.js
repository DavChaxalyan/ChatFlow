const express = require('express');
const router = express.Router();
const { accessChat, getUserChats, getMessages, sendMessage } = require('../controllers/chatController');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, accessChat);         // create/find 1-on-1 chat
router.get('/', protect, getUserChats);        // get all chats for user
router.get('/:chatId/messages', protect, getMessages);
router.post('/:chatId/messages', protect, sendMessage);

module.exports = router;
