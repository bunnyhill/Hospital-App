const mongoose = require('mongoose');

const slotSchema = mongoose.Schema(
  {
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    availableSlots: { type: Number, required: true },
    doctorId: { type: mongoose.Schema.ObjectId, ref: 'Doctor' },
  },
  { timestamps: true }
);

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
