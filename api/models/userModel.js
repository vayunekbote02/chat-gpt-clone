const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const cookie = require("cookie");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: [true, "Please add a name"] },
    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: [6, "Password should be atleast 6 characters long."],
    },
    customerId: { type: String, default: "" },
    subscription: { type: String, default: "" },
  },
  { timestamps: true }
);

// ? save hashed password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hashSync(this.password, salt);
  next();
});

// ? compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compareSync(enteredPassword, this.password);
};

// ? generate token
userSchema.methods.getSignedToken = function (res) {
  const accessToken = JWT.sign(
    { id: this._id },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRESIN }
  );
  const refreshToken = JWT.sign(
    { id: this._id },
    process.env.JWT_REFRESH_TOKEN,
    { expiresIn: process.env.JWT_REFRESH_EXPIRESIN }
  );

  res.cookie("refreshToken", `${refreshToken}`, {
    maxAge: 86400 * 7000,
    httpOnly: true,
  });
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
