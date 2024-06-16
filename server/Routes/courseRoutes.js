const express = require('express');
const router = express.Router();
const courseController = require('../Controllers/courseController');
const authMiddleware = require('../middlewares/authMiddleware'); // Assuming you have an auth middleware

// Create a new course
router.post('/courses', courseController.createCourse);
router.get('/courses', courseController.getAllCourses);
router.get('/courses/:id', courseController.getCourseById);
router.put('/courses/:id', courseController.updateCourse);
router.delete('/courses/:id', courseController.deleteCourse);
router.post('/courses/:id/assign-instructor', courseController.assignInstructor);

module.exports = router;
