const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  nume: {
    type: String,
    required: [true, "Name is required!"],
    trim: true,
    maxLength: [50, "The name must have maximum 50 characters!"],
  },
  prenume: {
    type: String,
    required: [true, "Prenume is required!"],
    trim: true,
    maxLength: [50, "The prenume must have maximum 50 characters!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    trim: true,
    maxLength: [50, "The username must have maximum 50 characters!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    trim: true,
    validate: [validator.isEmail, "Please insert a valid email addrres!"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    trim: true,
    minLength: [10, "The password must have at least 10 characters!"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm password is requried!"],
    trim: true,
    minLength: [10, "The confirm password must have at least 10 characters!"],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Confirm password must match password!",
    },
  },
  varsta: {
    type: Number,
    required: [true, "Varsta is required!"],
    max: [150, "Please insert a valid value!"],
    min: [18, "You must have over 18 years old!"],
  },
  sex: {
    type: String,
    required: [true, "Sex is required!"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  role: {
    type: String,
    default: "user",
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
