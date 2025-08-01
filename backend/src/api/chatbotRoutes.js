const express = require('express');
const router = express.Router();
const { chatWithAI } = require('../controllers/chatbotController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, chatWithAI);

module.exports = router;
