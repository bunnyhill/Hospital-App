const Appointment = require('../db/models/appointment-schema');

module.exports.getAppointment = (req, res) => {
  res.status(200).json({ message: 'GET /apppointments' });
};
