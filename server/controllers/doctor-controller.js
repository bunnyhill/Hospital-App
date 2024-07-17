const Doctor = require('../db/models/doctor-schema');

const genPassword = require('generate-password');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.signupDoctor = async (req, res) => {
  const doctor = await Doctor.findOne({ email: req.body.email });
  if (doctor) {
    return res.status(403).json({ message: 'Email already taken' });
  }

  const imageLink = `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`;
  const docPassword = genPassword.generate({
    length: 10,
    numbers: true,
  });

  const response = await Doctor.create({
    ...req.body,
    password: docPassword,
    image: imageLink,
  });

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '',
      pass: '',
    },
  });

  let mailOptions = {
    from: '',
    to: req.body.emails,
    subject: 'Login Credentials for Doctor Booking App',
    text: `Hello, ${req.body.firstName} 
    Your Username is : ${req.body.email} 
    And Password is : ${docPassword}`,
  };

  transporter.sendMail(mailOptions, err => {
    if (err) {
      return res.status(404).json({ message: err });
    } else res.status(200).json({ message: 'Mail Send', response: response });
  });
};

module.exports.loginDoctor = async (req, res) => {
  const doctor = await Doctor.findOne({ email: req.body.email });
  if (!doctor) {
    return res.status(403).json({ message: 'Email is incorrect' });
  }
  const isMatching = await bcrypt.compare(req.body.password, doctor.password);
  if (!isMatching) {
    return res.status(403).json({ message: 'Incorrect Password' });
  }

  const token = jwt.sign({ id: doctor._id }, process.env.KEY, {
    expiresIn: '365d',
  });

  res.status(200).json({ message: 'You Are Logged In', token });
};

module.exports.forgetPasswordDoctor = async (req, res) => {
  const doctor = await Doctor.findOne({ email: req.body.email });
  if (!doctor) {
    return res.status(403).json({ message: 'Incorrect Email' });
  }
};

//-----------------------------------------------------------------

module.exports.getDoctor = async (req, res) => {
  res.status(200).json({ message: 'GET /doctors' });
};

module.exports.getDoctorById = async (req, res) => {
  res.status(200).json({ message: 'GET /doctors/:id' });
};

module.exports.postDoctor = async (req, res) => {
  res.status(201).json({ message: 'POST /doctors' });
};
