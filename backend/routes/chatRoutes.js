const express = require('express');
const router = express.Router();
const { accessChat, getUserChats, getMessages, sendMessage, createGroupChat } = require('../controllers/chatController.js');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, accessChat);      
router.get('/', protect, getUserChats);       
router.get('/:chatId/messages', protect, getMessages);
router.post('/:chatId/messages', protect, sendMessage);
router.post('/group', protect, createGroupChat);

module.exports = router;
