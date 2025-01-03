const userModel = require("../models/userModel");

exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({
      status: "succes",
      length: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      err,
    });
  }
};
