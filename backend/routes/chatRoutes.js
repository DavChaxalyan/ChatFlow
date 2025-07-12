const express = require('express');
const router = express.Router();
const { accessChat, getUserChats, getMessages, sendMessage, createGroupChat, getUnreadMessagesCount } = require('../controllers/chatController.js');
const protect = require('../middleware/authMiddleware');
const { setChatBackground } = require('../controllers/setChatBackground.js');

router.post('/', protect, accessChat);      
router.get('/', protect, getUserChats);       
router.get('/:chatId/messages', protect, getMessages);
router.post('/:chatId/messages', protect, sendMessage);
router.get('/unread', protect, getUnreadMessagesCount);
router.post('/group', protect, createGroupChat);
router.put('/:chatId/background', protect, setChatBackground);

module.exports = router;
