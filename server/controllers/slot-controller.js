const Slot = require('../db/models/slot-schema');

module.exports.getSlot = (req, res) => {
  res.status(200).json({ message: 'GET /slots' });
};
