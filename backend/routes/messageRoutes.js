// messageRoutes.js

const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { uploadMessageFile } = require('../controllers/messageController'); 
const protect = require('../middleware/authMiddleware'); 

router.post('/upload', protect, upload.single('file'), uploadMessageFile);

module.exports = router;
