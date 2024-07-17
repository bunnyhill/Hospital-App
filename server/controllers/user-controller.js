const User = require('../db/models/user-schema');

module.exports.signupUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(403).json({ message: 'Email already taken' });
  }

  const imageLink = `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`;

  const response = await Doctor.create({
    ...req.body,
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
