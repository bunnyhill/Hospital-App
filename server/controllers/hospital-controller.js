const Hospital = require('../db/models/hospital-schema');

module.exports.getHospital = async (req, res) => {
  const { searchHospital } = req.query;
  if (searchHospital) {
    const response = await Hospital.find({
      name: { $regex: RegExp(searchHospital, 'i') },
    });
    return res.status(200).json(response);
  }
  res.status(200).json({ message: 'GET /hospitals' });
};

module.exports.getHospitalById = async (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: 'GET /hospitals/:id' });
};

module.exports.postHospital = async (req, res) => {
  const response = await Hospital.create({ ...req.body });
  res.status(201).json(response);
};
