const User = require('../models/User');

const updateProfile = async (req, res) => {
  const { name, healthNeeds, preferences, qualifications, availability, location } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = name || user.name;
    if (user.role === 'senior') {
      user.healthNeeds = healthNeeds || user.healthNeeds;
      user.preferences = preferences || user.preferences;
    } else if (user.role === 'caregiver') {
      user.qualifications = qualifications || user.qualifications;
      user.availability = availability || user.availability;
    }
    user.location = location || user.location;

    await user.save();
    res.json({ message: 'Profile updated', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all caregivers
const getAllCaregivers = async (req, res) => {
  try {
    const caregivers = await User.find({ role: 'caregiver' });
    res.status(200).json({ caregivers });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all seniors
const getAllSeniors = async (req, res) => {
  try {
    const seniors = await User.find({ role: 'senior' });
    res.status(200).json({ seniors });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get caregiver by ID
const getCaregiverById = async (req, res) => {
  try {
    const caregiver = await User.findOne({ _id: req.params.id, role: 'caregiver' });
    if (!caregiver) {
      return res.status(404).json({ message: 'Caregiver not found' });
    }
    res.status(200).json({ caregiver });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get senior by ID
const getSeniorById = async (req, res) => {
  try {
    const senior = await User.findOne({ _id: req.params.id, role: 'senior' });
    if (!senior) {
      return res.status(404).json({ message: 'Senior not found' });
    }
    res.status(200).json({ senior });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { updateProfile, getAllCaregivers, getAllSeniors, getCaregiverById, getSeniorById };