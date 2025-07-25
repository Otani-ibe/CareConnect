const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
  seniorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  caregiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  appointmentDate: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);
