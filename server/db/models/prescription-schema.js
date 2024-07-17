const mongoose = require('mongoose');

const prescriptionSchema = mongoose.Schema(
  {
    date: { type: Date },
    note: { type: String },
    userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
    doctorId: { type: mongoose.Schema.ObjectId, ref: 'Doctor' },
  },

  { timestamps: true }
);

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
