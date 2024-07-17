const Hospital = require('../db/models/hospital-schema');

module.exports.getHospital = async (req, res) => {
  res.status(200).json({ message: 'GET /hospitals' });
};

module.exports.getHospitalById = async (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: 'GET /hospitals/:id' });
};

module.exports.postHospital = async (req, res) => {
  res.status(201).json({ message: 'POST /hospitals' });
};
