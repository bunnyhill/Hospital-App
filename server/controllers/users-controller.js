const User = require('../db/models/user-schema');

module.exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};
