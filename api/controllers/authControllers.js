const UserModel = require("../models/userModel");
const errorResponse = require("../utils/errorResponse");

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken(res);
  res.status(statusCode).json({
    success: true,
    token,
  });
};

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      return next(new errorResponse("Email is already registered", 500));
    }

    const user = await UserModel.create({ username, email, password });
    sendToken(user, 201, res);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(
        new errorResponse("Please provide both email and password", 422)
      );
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return next(new errorResponse("Invalid Credentials", 401));
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new errorResponse("Invalid Credentials", 401));
    }

    sendToken(user, 200, res);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const logout = async (req, res) => {
  res.clearCookie("refreshToken");
  return res.status(200).json({
    succes: true,
    message: "Logout successful",
  });
};
module.exports = { register, login, logout, sendToken };
