const express = require('express');
const router = express.Router();
const { requestSession, manageSession } = require('../controllers/sessionController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/request', authMiddleware, requestSession);
router.put('/manage', authMiddleware, manageSession);

module.exports = router;