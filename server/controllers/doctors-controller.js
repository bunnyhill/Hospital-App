const Doctor = require('../db/models/doctor-schema');

module.exports.getDoctors = async (req, res) => {
  const doctors = await Doctor.find();
  res.status(200).json(doctors);
};
