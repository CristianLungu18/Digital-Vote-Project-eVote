const Candidate = require("../models/candidateModel");
const Vote = require("../models/voteModel");

exports.getAbout = (req, res) => {
  res.status(200).render("about", { results: req.cookies.results });
};

exports.getLogin = (req, res) => {
  res.status(200).render("login", { results: req.cookies.results });
};

exports.getSignup = (req, res) => {
  res.status(200).render("signup", { results: req.cookies.results });
};

exports.getAdmin = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res
      .status(200)
      .render("admin", { candidates, results: req.cookies.results });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    });
  }
};

exports.getCandidateById = async (req, res) => {
  const candidateID = req.params.id;
  const candidate = await Candidate.findOne({ _id: candidateID });
  res
    .status(200)
    .render("editCandidate", { candidate, results: req.cookies.results });
};

exports.deleteCandidate = async (req, res) => {
  const candidateID = req.params.id;
  await Candidate.findByIdAndDelete(candidateID);
  res.status(200).redirect("/admin", { results: req.cookies.results });
};

exports.getAddCandidate = (req, res) => {
  res.status(200).render("addCandidate", { results: req.cookies.results });
};

exports.getInstruction = (req, res) => {
  res.status(200).render("instruction", { results: req.cookies.results });
};

exports.getHome = async (req, res) => {
  try {
    const numberVotes = await Vote.countDocuments();
    const results = req.cookies.results;
    console.log(results);
    res.status(200).render("home", { numberVotes, results });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    });
  }
};

exports.getVerify = (req, res) => {
  res.status(200).render("verify", { results: req.cookies.results });
};

exports.getSelectCandidate = async (req, res) => {
  const candidates = await Candidate.find();
  res
    .status(200)
    .render("selectCandidate", { candidates, results: req.cookies.results });
};

exports.getReviewVote = async (req, res) => {
  const CNP = req.cookies.CNP;
  const myVote = await Vote.findOne({ CNP });
  res
    .status(200)
    .render("reviewVote", { myVote, results: req.cookies.results });
};

exports.getGenerateCertificate = (req, res) => {
  res
    .status(200)
    .render("generateCertificate", { results: req.cookies.results });
};

exports.getResults = (req, res) => {
  res.status(200).render("rezultate", { results: req.cookies.results });
};
exports.getVerifyAccount = (req, res) => {
  try {
    res.status(200).render("verifyAccount", { results: req.cookies.results });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      err,
    });
  }
};
