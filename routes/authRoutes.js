const express = require('express');
const router = express.Router();

// ✅ This should import actual functions
const { registerUser, loginUser } = require('../controllers/authcontroller');

// ✅ Pass real functions to route
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
