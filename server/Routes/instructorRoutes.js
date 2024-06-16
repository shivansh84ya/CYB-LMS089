const express = require('express');
const router = express.Router();
const instructorController = require('../Controllers/InstructorController');

router.post('/instructors', instructorController.createInstructor);
router.get('/instructors', instructorController.getAllInstructors);
router.get('/instructors/:id', instructorController.getInstructorById);
router.put('/instructors/:id', instructorController.updateInstructor);
router.delete('/instructors/:id', instructorController.deleteInstructor);

module.exports = router;
