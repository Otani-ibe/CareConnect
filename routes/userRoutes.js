const express = require('express');
const router = express.Router();
const {
  updateProfile,
  getAllCaregivers,
  getAllSeniors,
  getCaregiverById,
  getSeniorById
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Update user profile (protected)
router.put('/profile', authMiddleware, updateProfile);

// Get all caregivers (public)
router.get('/caregivers', getAllCaregivers);

// Get all seniors (public)
router.get('/seniors', getAllSeniors);

// Get caregiver by ID (public)
router.get('/caregivers/:id', getCaregiverById);

// Get senior by ID (public)
router.get('/seniors/:id', getSeniorById);


module.exports = router;
