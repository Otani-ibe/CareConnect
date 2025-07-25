const Match = require('../models/Match');
const User = require('../models/User');

const suggestMatches = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized: Missing user' });
    }

    const senior = await User.findById(req.user.id);
    if (!senior) {
      return res.status(404).json({ message: 'Senior not found' });
    }

    if (senior.role !== 'senior') {
      return res.status(403).json({ message: 'Only seniors can request matches' });
    }

    if (!senior.location || !Array.isArray(senior.preferences)) {
      return res.status(400).json({ message: 'Incomplete senior profile (location/preferences)' });
    }

    const caregivers = await User.find({
      role: 'caregiver',
      isVerified: true,
      location: senior.location,
      availability: { $in: senior.preferences },
    });

    const matches = await Match.find({ seniorId: senior._id, status: 'pending' });

    res.json({ matches, suggestedCaregivers: caregivers });
  } catch (error) {
    console.error('Suggest Match Error:', error.message);
    res.status(500).json({ message: 'Server error in suggestMatches', error: error.message });
  }
};

const createMatch = async (req, res) => {
  try {
    const { caregiverId } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized: Missing user' });
    }

    const senior = await User.findById(req.user.id);
    if (!senior || senior.role !== 'senior') {
      return res.status(403).json({ message: 'Only seniors can create matches' });
    }

    const caregiver = await User.findById(caregiverId);
    if (!caregiver || caregiver.role !== 'caregiver' || !caregiver.isVerified) {
      return res.status(400).json({ message: 'Invalid or unverified caregiver' });
    }

    const existingMatch = await Match.findOne({
      seniorId: senior._id,
      caregiverId,
      status: { $in: ['pending', 'accepted'] },
    });

    if (existingMatch) {
      return res.status(409).json({ message: 'Match already exists or is in progress' });
    }

    const match = new Match({
      seniorId: req.user.id,
      caregiverId,
      status: 'pending',
    });

    await match.save();
    res.status(201).json({ message: 'Match requested successfully', match });
  } catch (error) {
    console.error('Create Match Error:', error.message);
    res.status(500).json({ message: 'Server error in createMatch', error: error.message });
  }
};

const updateMatchStatus = async (req, res) => {
  const { matchId, status } = req.body;

  try {
    // Step 1: Verify user is authenticated
    if (!req.user || !req.user.id || !req.user.role) {
      return res.status(401).json({ message: 'Unauthorized: Missing or invalid user data' });
    }

    // Step 2: Find the match by ID
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    // Debug logs to trace issue
    console.log('Decoded user:', req.user);
    console.log('Match caregiverId:', match.caregiverId.toString());
    console.log('Logged in caregiverId:', req.user.id);

    // Step 3: Only the assigned caregiver can update the match
    if (req.user.role !== 'caregiver') {
      return res.status(403).json({ message: 'Only caregivers can update match status' });
    }

    if (!match.caregiverId || match.caregiverId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to update this match' });
    }

    // Step 4: Update and save status
    match.status = status;
    await match.save();

    res.json({ message: 'Match status updated successfully', match });
  } catch (error) {
    console.error('Update Match Status Error:', error.message);
    res.status(500).json({ message: 'Server error in updateMatchStatus', error: error.message });
  }
};


module.exports = {
  suggestMatches,
  createMatch,
  updateMatchStatus
};
