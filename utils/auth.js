const jwt = require('jsonwebtoken');

exports.verifyToken = (token) => {
  return jwt.verify(token, 'secret');
};

exports.generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, 'secret', { expiresIn: '1h' });
};
