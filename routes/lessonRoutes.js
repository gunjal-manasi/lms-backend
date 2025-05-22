const express = require('express');
const router = express.Router();
const { createLesson, getLessonsByCourseId } = require('../controllers/lessonController'); // ✅ Make sure the path is correct

router.post('/lessons', createLesson);
router.get('/lessons/course/:courseId', getLessonsByCourseId); // ✅ This must match export

module.exports = router;
