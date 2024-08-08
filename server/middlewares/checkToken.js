const jwt = require('jsonwebtoken');
const checkToken = roles => {
  return (req, res, next) => {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split(' ')[1];
      const isValid = jwt.verify(token, process.env.KEY);

      if (!roles.includes(isValid.role)) {
        return res.status(403).json({ message: 'Your are not authorized' });
      }

      next();
    } catch (e) {
      res.status(403).json({ message: 'Your are not authorized' });
    }
  };
};
module.exports = checkToken;
