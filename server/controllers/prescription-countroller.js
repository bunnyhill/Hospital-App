const Prescription = require('../db/models/prescription-schema');

module.exports.getPrescription = (req, res) => {
  res.status(200).json({ message: 'GET /prescriptions' });
};
