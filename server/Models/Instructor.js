const mongoose = require('mongoose');

const InstructorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'First name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    // required: [true, 'Password is required'],
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bio: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

InstructorSchema.pre('save', async function (next) {
  const bcrypt = require('bcrypt');
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

InstructorSchema.methods.comparePassword = async function (password) {
  const bcrypt = require('bcrypt');
  return await bcrypt.compare(password, this.password);
};

const Instructor = mongoose.model('Instructor', InstructorSchema);

module.exports = Instructor;
