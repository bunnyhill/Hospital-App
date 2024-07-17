const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
    doctorId: { type: mongoose.Schema.ObjectId, ref: 'Doctor' },
    slotId: { type: mongoose.Schema.ObjectId, ref: 'Slot' },
  },
  { timestamps: true }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
