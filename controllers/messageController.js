const Message = require('../models/Message');

const sendMessage = async (req, res) => {
  const { receiverId, content } = req.body;

  try {
    const message = new Message({
      senderId: req.user.id,
      receiverId,
      content,
    });

    await message.save();
    res.status(201).json({ message: 'Message sent', message });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getMessages = async (req, res) => {
  const { receiverId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: req.user.id, receiverId },
        { senderId: receiverId, receiverId: req.user.id },
      ],
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { sendMessage, getMessages };