const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/userController.js');
const protect = require('../middleware/authMiddleware');

router.get('/users', protect, getAllUsers);

module.exports = router;
