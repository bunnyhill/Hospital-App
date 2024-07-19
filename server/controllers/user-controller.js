const User = require('../db/models/user-schema');

const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.signupUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(403).json({ message: 'Email already taken' });
  }

  const response = await Doctor.create({
    ...req.body,
  });

  let transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_S,
    auth: {
      user: process.env.NODEMAILER_U,
      pass: process.env.NODEMAILER_P,
    },
  });

  let mailOptions = {
    from: '',
    to: req.body.email,
    subject: 'Login Credentials for Doctor Booking App',
    text: `Hello, ${req.body.firstName} 
    Your Username is : ${req.body.email} 
    And Password is : ${req.body.password}`,
  };

  transporter.sendMail(mailOptions, err => {
    if (err) {
      return res.status(404).json({ message: 'error in mail sending' });
    } else res.status(200).json({ message: 'Mail Send', response: response });
  });
};

module.exports.loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(403).json({ message: 'Email is incorrect' });
  }
  const isMatching = await bcrypt.compare(req.body.password, user.password);
  if (!isMatching) {
    return res.status(403).json({ message: 'Incorrect Password' });
  }

  const token = jwt.sign({ id: user._id }, process.env.KEY, {
    expiresIn: '365d',
  });

  res.status(200).json({ message: 'You Are Logged In', token });
};

module.exports.forgetPasswordUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(403).json({ message: 'Incorrect Email' });
  }
};

//----------------------------------------------------------------------------

module.exports.getUser = (req, res) => {
  res.status(200).json({ message: 'GET /users' });
};

module.exports.getUserById = (req, res) => {
  res.status(200).json({ message: 'GET /users/:id' });
};

module.exports.postUser = (req, res) => {
  res.status(201).json({ message: 'POST /users' });
};
