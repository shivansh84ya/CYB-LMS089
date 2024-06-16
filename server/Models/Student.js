const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'First name is required'],
  },

  // age: {
  //   type: Number,
  //   required: true,
  // },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  instructor: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor'
  }],
  phoneNumber: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

StudentSchema.pre('save', async function (next) {
  const bcrypt = require('bcrypt');
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

StudentSchema.methods.comparePassword = async function (password) {
  const bcrypt = require('bcrypt');
  return await bcrypt.compare(password, this.password);
};

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
