const express = require('express');
const router = express.Router();
const { getAllUsers, updateUserProfile } = require('../controllers/userController.js');
const protect = require('../middleware/authMiddleware');

router.get('/users', protect, getAllUsers);
router.put('/profile', protect, updateUserProfile);

module.exports = router;
