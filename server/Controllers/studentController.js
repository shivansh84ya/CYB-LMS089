const Student = require('../Models/Student');

// Create a new student
exports.createStudent = async (req, res, next) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json({ message: 'Student created successfully', student: newStudent });
  } catch (err) {
    next(err);
  }
};

// Get all students with search, filter, and sort
exports.getAllStudents = async (req, res, next) => {
  try {
    const { name, email, age, sortBy, sortOrder = 'asc', page = 1, limit = 5 } = req.query;

    const query = {};
    if (name) query.firstName = { $regex: name, $options: 'i' };
    if (email) query.email = { $regex: email, $options: 'i' };
    if (age) query.age = age;

    const sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }

    const students = await Student.find(query)
      .populate('courses')
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Student.countDocuments(query);

    res.status(200).json({ students, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

// Get student by ID
exports.getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id).populate('courses');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (err) {
    next(err);
  }
};

// Update student
exports.updateStudent = async (req, res, next) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student updated successfully', student: updatedStudent });
  } catch (err) {
    next(err);
  }
};

// Delete student
exports.deleteStudent = async (req, res, next) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (err) {
    next(err);
  }
};
