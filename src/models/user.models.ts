import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isVerify: {
    type: Boolean,
    default: false,
    select: false,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  photo: {
    type: String,
    default: "leo.jpg",
  },
  passwordResetToken: {
    type: String,
  },
  forgotPasswordToken: {
    type: String,
  },
  forgotPasswordTokenExp: {
    type: Date,
  },
  passwordResetExpiresAt: {
    type: Date,
  },
  verifyToken: {
    type: String,
  },
  verifyTokenExp: {
    type: Date,
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
