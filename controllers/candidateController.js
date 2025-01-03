const Candidate = require("../models/candidateModel");

exports.getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json({
      status: "succes",
      results: candidates.length,
      data: {
        candidates,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    });
  }
};

exports.getCandidateById = async (req, res) => {
  try {
    const candidateID = req.params.id;
    const candidate = await Candidate.find({ _id: candidateID });
    res.status(200).json({
      status: "succes",
      data: {
        candidate,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    });
  }
};

exports.addCandidate = async (req, res) => {
  try {
    const { nume, prenume, descriere, varsta, partid } = req.body;

    const newCandidate = await Candidate.create({
      nume,
      prenume,
      descriere,
      varsta,
      partid,
    });

    res.status(200).json({
      status: "succes",
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      err,
    });
  }
};

exports.editCandidate = async (req, res) => {
  try {
    const candidateID = req.params.id;
    await Candidate.findByIdAndUpdate(candidateID, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "succes",
    });
  } catch (err) {
    res.status(400).json({ status: "fail", err });
  }
};
