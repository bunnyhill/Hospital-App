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

  const hashedPassword = await bcrypt.hash(docPassword, 2);

  const response = await Doctor.create({
    ...req.body,
    password: hashedPassword,
    image: imageLink,
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
    And Password is : ${docPassword}`,
  };

  transporter.sendMail(mailOptions, err => {
    if (err) {
      return res.status(404).json({ message: 'error in mail sending' });
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
  const response = await Doctor.find();
  res.status(200).json(response);
};

module.exports.getDoctorById = async (req, res) => {
  res.status(200).json({ message: 'GET /doctors/:id' });
};
