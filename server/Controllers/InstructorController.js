const Instructor = require('../Models/Instructor');

// Create a new instructor
exports.createInstructor = async (req, res) => {
  try {
    const { name, email, bio } = req.body;

    // Check if email is unique
    const existingInstructor = await Instructor.findOne({ email });
    if (existingInstructor) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newInstructor = new Instructor({
      name,
      email,
      bio,
      
    });

    const savedInstructor = await newInstructor.save();
    res.status(201).json(savedInstructor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all instructors
exports.getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.status(200).json(instructors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single instructor by ID
exports.getInstructorById = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    res.status(200).json(instructor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an instructor by ID
exports.updateInstructor = async (req, res) => {
  try {
    const { name, email, bio } = req.body;

    // Check if email is unique if it has been changed
    if (email) {
      const existingInstructor = await Instructor.findOne({ email });
      if (existingInstructor && existingInstructor._id.toString() !== req.params.id) {
        return res.status(400).json({ message: 'Email already exists' });
      }
    }

    const updatedInstructor = await Instructor.findByIdAndUpdate(
      req.params.id,
      { name, email, bio },
      { new: true }
    );

    if (!updatedInstructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }

    res.status(200).json(updatedInstructor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an instructor by ID
exports.deleteInstructor = async (req, res) => {
  try {
    const deletedInstructor = await Instructor.findByIdAndDelete(req.params.id);
    if (!deletedInstructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    res.status(200).json({ message: 'Instructor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
