const express = require('express');
const router = express.Router();

const courseController = require('../controllers/courseController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/', authenticateToken, courseController.createCourse);
router.get('/', courseController.getAllCourses);
router.get('/instructor/:instructorId', courseController.getCoursesByInstructor);
router.get('/:courseId/instructor', courseController.getInstructorByCourse);


module.exports = router;
