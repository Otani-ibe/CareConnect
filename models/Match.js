const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  seniorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  caregiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  matchDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Match', matchSchema);