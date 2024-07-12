const Doctor = require('../db/models/doctor-schema');

module.exports.getDoctor = async (req, res) => {
  res.status(200).json({ message: 'GET /doctor' });
};

module.exports.getDoctorById = async (req, res) => {
  res.status(200).json({ message: 'GET /doctor/:id' });
};

module.exports.postDoctor = async (req, res) => {
  res.status(201).json({ message: 'POST /doctor' });
};
