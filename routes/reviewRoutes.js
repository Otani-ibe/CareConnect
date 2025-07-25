const express = require('express');
const router = express.Router();
const { submitReview } = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/submit', authMiddleware, submitReview);

module.exports = router;