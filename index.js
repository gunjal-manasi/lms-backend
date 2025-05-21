const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Sequelize connection
const sequelize = require('./config/db');

// Import models (already initialized)
const User = require('./models/auth');
const Course = require('./models/Course');

// Setup associations
Course.belongsTo(User, {
  foreignKey: 'instructor_id',
  onDelete: 'CASCADE'
});

// Routes
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courseRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

// Start server
const PORT = process.env.PORT || 5000;

sequelize.sync()
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });
