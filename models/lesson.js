const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Course = require('./Course');

const Lesson = sequelize.define('Lesson', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Course,
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  video_url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'lessons',
  timestamps: false
});

Lesson.belongsTo(Course, {
  foreignKey: 'course_id',
  as: 'course',
  onDelete: 'CASCADE'
});

module.exports = Lesson;
