const express = require('express');
const router = express.Router();
const { requestSession, manageSession, getSession } = require('../controllers/sessionController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/request', authMiddleware, requestSession);
router.put('/manage', authMiddleware, manageSession);
router.get('/', getSession);

module.exports = router;