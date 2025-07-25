const Review = require('../models/Review');
const Session = require('../models/Session');

const submitReview = async (req, res) => {
  const { sessionId, rating, comment } = req.body;

  try {
    const session = await Session.findById(sessionId);
    if (!session || session.status !== 'completed') {
      return res.status(400).json({ message: 'Invalid or incomplete session' });
    }

    const review = new Review({
      sessionId,
      reviewerId: req.user.id,
      revieweeId: session.seniorId.toString() === req.user.id ? session.caregiverId : session.seniorId,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({ message: 'Review submitted', review });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { submitReview };