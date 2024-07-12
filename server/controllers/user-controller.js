const User = require('../db/models/user-schema');

module.exports.getUser = (req, res) => {
  res.status(200).json({ message: 'GET /user' });
};

module.exports.getUserById = (req, res) => {
  res.status(200).json({ message: 'GET /user/:id' });
};

module.exports.postUser = (req, res) => {
  res.status(201).json({ message: 'POST /user' });
};
