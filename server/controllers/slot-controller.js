const Slot = require('../db/models/slot-schema');

module.exports.getSlotsByDoctorId = async (req, res) => {
  const { doctorId } = req.query;
  const slots = await Slot.find({ doctorId: doctorId });
  res.status(200).json(slots);
};

module.exports.postSlot = async (req, res) => {
  const slot = await Slot.create({ ...req.body });
  res.status(201).json({ message: 'Slot Added', slot });
};
