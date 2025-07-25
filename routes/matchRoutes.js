const express = require('express');
const router = express.Router();
const { suggestMatches, createMatch, updateMatchStatus } = require('../controllers/matchController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/suggest', authMiddleware, suggestMatches);
router.post('/create', authMiddleware, createMatch);
router.put('/status', authMiddleware, updateMatchStatus);


module.exports = router;