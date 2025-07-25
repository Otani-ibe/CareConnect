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

module.exports = { updateProfile };