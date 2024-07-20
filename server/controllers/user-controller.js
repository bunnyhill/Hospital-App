const User = require('../db/models/user-schema');

const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.signupUser = async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(403).json({ message: 'Email already taken' });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 2);

  const response = await User.create({
    ...req.body,
    password: hashedPassword,
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
  const { email } = req.body;

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(403).json({ message: 'Incorrect Email' });
  }

  const resetToken = jwt.sign(
    { email: email },
    process.env.FORGOT_PASSWORD_KEY,
    { expiresIn: '2d' }
  );

  let transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_S,
    auth: {
      user: process.env.NODEMAILER_U,
      pass: process.env.NODEMAILER_P,
    },
  });

  let mailOptions = {
    from: process.env.NODEMAILER_U,
    to: email,
    subject: 'PASSWORD RESET EMAIL',
    text: `Please Reset Your Password using the link:- 
     http://localhost:${process.env.PORT}/user/reset-password/${resetToken}`,
  };

  transporter.sendMail(mailOptions, err => {
    if (err) {
      return res.status(404).json({ message: 'error in mail sending' });
    } else return res.status(200).json({ message: 'Mail Send' });
  });
};

module.exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const isValid = jwt.verify(token, process.env.FORGOT_PASSWORD_KEY);
    const hashedPassword = await bcrypt.hash(password, 2);

    const user = await User.findOneAndUpdate(
      { email: isValid.email },
      { password: hashedPassword }
    );
    return res.status(200).json({ user });
  } catch (e) {
    return res.status(200).json({ message: 'Invalid Token' });
  }
};

module.exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.status(200).json(user);
};
