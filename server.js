require('dotenv').config(); // Load environment variables
const authRoutes = require('./routes/authRoutes');
const matchRoutes = require('./routes/matchRoutes');
const messageRoutes = require('./routes/messageRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const userRoutes = require('./routes/userRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const express = require('express');
const connectDB = require('./config/db');
const cors = require("cors")
// const axios = require("axios");

const app = express();
app.use(express.json());

app.use(cors())

// Connect to MongoDB
connectDB();
app.use('/api/auth', authRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/user', userRoutes);
app.use('/api/session', sessionRoutes);

// Routes (Example)
app.get('/', (req, res) => {
  res.send('CareConnect API is running...');
});

// 404 Middleware
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// const axios = require("axios");

// const PING_INTERVAL = 30 * 1000;

// setInterval(() => {
//   axios
//     .get(`${process.env.SERVER_URL}/api/users/ping/hit-endpoint-every-30-sec`)
//     .then((r) => {
//       console.log("Ping success", r.data);
//     })
//     .catch((e) => {
//       console.error("Ping error", e);
//     });
// }, PING_INTERVAL);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
