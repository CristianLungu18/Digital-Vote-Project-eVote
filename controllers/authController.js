const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendWelcomeEmail = require("../config/sendWelcomeEmail");

exports.signup = async (req, res) => {
  try {
    const {
      nume,
      prenume,
      username,
      email,
      password,
      confirmPassword,
      varsta,
      sex,
    } = req.body;

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({
        status: "fail",
        message: "This email address already exists!",
      });
    }

    const newUser = await User.create({
      nume,
      prenume,
      username,
      email,
      password,
      confirmPassword,
      varsta,
      sex,
    });

    sendWelcomeEmail(newUser.email, newUser.prenume)
      .then(() => {
        console.log("Email trimis cu succes!");
      })
      .catch((err) => {
        console.log(err);
      });

    res.status(200).json({
      status: "succes",
      data: {
        newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const myUser = await User.findOne({ email });

    if (!myUser || !(await bcrypt.compare(password, myUser.password))) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid email or password!",
      });
    }

    const token = jwt.sign({ userId: myUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 604800000,
      httpOnly: true,
    });

    res.status(200).json({
      status: "succes",
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    });
  }
};

exports.isLoggedIn = async (req, res, next) => {
  let token = "";
  let userId = "";
  token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      userId = decoded.userId;
    });
    const myUser = await User.findOne({ _id: userId }).select("-password");
    req.user = myUser;
    res.locals.myUser = myUser;
  } else {
    req.user = null;
    res.locals.myUser = null;
  }

  next();
};

exports.Protected = async (req, res, next) => {
  let token = "";
  let userId = "";
  if (!req.cookies.jwt) {
    return res.status(401).redirect("/login");
  }
  token = req.cookies.jwt;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).redirect("/login");
    }
    userId = decoded.userId;
  });
  const myUser = await User.findOne({ _id: userId }).select("-password");
  if (!myUser) {
    return res.status(401).redirect("/login");
  }
  req.user = myUser;
  res.locals.myUser = myUser;
  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).redirect("/home");
    }
    next();
  };
};

exports.logout = (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 1,
      httpOnly: true,
    });

    res.status(200).json({
      status: "succes",
    });
  } catch (err) {
    res.status(400).json({
      satus: "fail",
      err,
    });
  }
};
