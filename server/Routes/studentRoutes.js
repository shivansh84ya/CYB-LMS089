const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middlewares/authMiddleware'); // Assuming you have an auth middleware

// Create a new student
router.post('/students', studentController.createStudent);

// Get all students with search, filter, and sort
router.get('/students', studentController.getAllStudents);

// Get student by ID
router.get('/students/:id', studentController.getStudentById);

// Update student
router.put('/students/:id', studentController.updateStudent);

// Delete student
router.delete('/students/:id', studentController.deleteStudent);

module.exports = router;
