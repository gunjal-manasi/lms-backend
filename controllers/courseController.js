const Course = require('../models/Course');
const User = require('../models/auth');

exports.createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
console.log('Authenticated user:', req.user);


    if (!req.user || !req.user.userId) {
      return res.status(400).json({ message: 'Instructor ID is missing from token.' });
    }

    if (req.user.role !== 'instructor') {
      return res.status(403).json({ message: 'Only instructors can create courses.' });
    }

    const instructor_id = req.user.userId;

    const course = await Course.create({
      title,
      description,
      instructor_id
    });

    res.status(201).json(course);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: {
        model: User,
        as: 'instructor',
        attributes: ['id', 'name', 'email']
      }
    });
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getCoursesByInstructor = async (req, res) => {
  const { instructorId } = req.params;

  try {
    const courses = await Course.findAll({
      where: { instructor_id: instructorId }
    });

    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching instructor courses:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get instructor for a given course
exports.getInstructorByCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findOne({
      where: { id: courseId },
      include: {
        model: User,
        as: 'instructor',
        attributes: ['id', 'name', 'email']
      }
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(course.instructor);
  } catch (error) {
    console.error('Error fetching instructor for course:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a course by ID
exports.getCourseById = async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findOne({
      where: { id: courseId },
      include: {
        model: User,
        as: 'instructor',
        attributes: ['id', 'name', 'email']
      }
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error('Error fetching course by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

