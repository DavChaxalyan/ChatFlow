const express = require('express');
const { unsplash } = require('../controllers/unsplashController');
const router = express.Router();

router.get('/photos', unsplash);

module.exports = router;
