const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ['senior', 'caregiver'], // ✅ Must match input values exactly
  },
  location: { type: String, required: true },
  preferences: [String], // for seniors
  availability: [String], // for caregivers
  isVerified: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);
