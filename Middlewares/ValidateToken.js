const jwt = require('jsonwebtoken')
const AppError = require('../utilities/AppError')
const dotenv = require('dotenv').config()

const verifyToken = (req, res, next) => {
    const token = req.headers.cookie.split("=")[1]
    // console.log(token)
    // console.log(req)
  if (!token) {
    return next(new AppError( "Access Denied. No token provided.", 403));
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("this is decode",decoded)

    req.user = decoded;
    next(); 
  } catch (err) {
    next(err)
  }
};

module.exports = verifyToken