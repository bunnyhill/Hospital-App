const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema(
  {
    deptName: { type: String, required: true, trim: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
