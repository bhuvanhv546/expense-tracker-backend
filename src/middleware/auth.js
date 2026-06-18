const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    });
  }

  
  try {
   const decoded = jwt.verify(token, process.env.JWT_SECRET);

   console.log('Decoded:', decoded);

   const user = await User.findById(decoded.id).select('-password');

   console.log('User Found:', user);

   if (!user) {
    return res.status(401).json({
      success: false,
      error: 'User not found'
    });
  }

  req.user = user;

  next();
 } catch (err) {
   console.error(err);

   return res.status(401).json({
    success: false,
    error: 'Not authorized to access this route'
  });
}
};

module.exports = { protect };
