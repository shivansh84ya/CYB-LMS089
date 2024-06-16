const Course = require('../Models/Course');
const Instructor = require('../Models/Instructor');

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const { title, type, description, duration, instructorId } = req.body;
    console.log('Creating course with data:', req.body);
    // Check if instructor exists
    
    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }

    // Create new course
    const newCourse = new Course({
      title,
      type,
      description,
      duration,
      instructor: instructorId,
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Error creating course', error: error.message });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'name');
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a single course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a course by ID
exports.updateCourse = async (req, res) => {
  try {
    const { title, type, description, duration, instructorId } = req.body;

    // Check if instructor exists
    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      {
        title,
        type,
        description,
        duration,
        instructor: instructorId,
      },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a course by ID
exports.deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign an instructor to a course
exports.assignInstructor = async (req, res) => {
  try {
    const { instructorId } = req.body;

    // Check if instructor exists
    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { instructor: instructorId },
      { new: true }
    ).populate('instructor', 'name');

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
