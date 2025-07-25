const Session = require('../models/Session');
const Match = require('../models/Match');

const requestSession = async (req, res) => {
  const { matchId, appointmentDate, time } = req.body;

  try {
    const match = await Match.findById(matchId);
    if (!match || match.status !== 'accepted') {
      return res.status(400).json({ message: 'Invalid or unaccepted match' });
    }

    const session = new Session({
      matchId,
      seniorId: match.seniorId,
      caregiverId: match.caregiverId,
      appointmentDate,
      time,
    });

    await session.save();
    res.status(201).json({ message: 'Session requested', session });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const manageSession = async (req, res) => {
  const { sessionId, action } = req.body; // Action: confirm, reschedule, cancel, complete

  try {
    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ message: 'Session not found' });

    if (action === 'confirm') {
      session.status = 'scheduled';
    } else if (action === 'reschedule') {
      session.appointmentDate = req.body.newDate;
      session.time = req.body.newTime;
    } else if (action === 'cancel') {
      session.status = 'cancelled';
    } else if (action === 'complete') {
      session.status = 'completed';
    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }

    await session.save();
    res.json({ message: `Session ${action}d`, session });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = { requestSession, manageSession };