const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  discription: String,
  startdate: Date,
  enddate: Date,
  assign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee"
  },
  status: {
    type: String,
    enum: ['Pending', 'InProgress', 'Completed'],
    default: 'Pending',
  },
});

const Task = mongoose.model('task', taskSchema);

module.exports = Task;