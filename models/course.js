const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./auth'); // Import the User model

const Course = sequelize.define('Course', {
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  instructor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  tableName: 'courses',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

// Association: A Course belongs to a User (instructor)
Course.belongsTo(User, {
  foreignKey: 'instructor_id',
  as: 'instructor',
  onDelete: 'CASCADE'
});

module.exports = Course;
