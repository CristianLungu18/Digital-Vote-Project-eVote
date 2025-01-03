const eligibleVoterModel = require("../models/eligibleVoters");
const Vote = require("../models/voteModel");

exports.postVoter = async (req, res) => {
  try {
    const CNP = req.body.CNP;
    const control = CNP.slice(7, 13);
    const myVoter = await eligibleVoterModel.findOne({ CNP });
    const existedVoter = await Vote.findOne({ CNP: control });

    if (!myVoter) {
      return res.status(404).json({
        status: "fail",
        message: "CNP invalid sau inexistent. Verifică și încearcă din nou.",
      });
    }
    if (existedVoter) {
      return res.status(400).json({
        status: "fail",
        message: "CNP-ul introdus a fost deja utilizat pentru vot!",
      });
    }
    res.status(200).json({
      status: "succes",
      data: {
        myVoter,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    });
  }
};
