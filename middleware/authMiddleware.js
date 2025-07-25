const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log('Auth Header:', authHeader);

  const token = authHeader?.replace('Bearer ', '');
  if (!token) {
    console.log('Token missing');
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('Decoded token:', decoded);
    next();
  } catch (error) {
    console.log('JWT error:', error.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};


module.exports = authMiddleware;