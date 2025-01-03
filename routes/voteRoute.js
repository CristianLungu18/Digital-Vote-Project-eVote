const express = require("express");
const router = express.Router();
const voteController = require("../controllers/voteController");
const authController = require("../controllers/authController");

router.post("/postvote", voteController.postVote);

router.patch("/update-vote", voteController.updateVote);

router.get(
  "/generate-pdf",
  authController.Protected,
  voteController.generatePDF
);

router.get("/votes", voteController.getVotes);

router.get("/chartVotes", voteController.getChartVotes);

module.exports = router;
