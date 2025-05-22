const Lesson = require('../models/lesson');

// POST: Create a lesson
const createLesson = async (req, res) => {
  const { course_id, title, content, video_url } = req.body;

  try {
    const lesson = await Lesson.create({
      course_id,
      title,
      content,
      video_url
    });
    res.status(201).json(lesson);
  } catch (error) {
    console.error('Error creating lesson:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET: Fetch lessons by course ID
const getLessonsByCourseId = async (req, res) => {
  const { courseId } = req.params;

  try {
    const lessons = await Lesson.findAll({
      where: { course_id: courseId }
    });

    if (!lessons || lessons.length === 0) {
      return res.status(404).json({ message: 'No lessons found for this course' });
    }

    res.json(lessons);
  } catch (error) {
    console.error('Error fetching lessons:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createLesson,
  getLessonsByCourseId // ✅ Make sure it's exported
};
