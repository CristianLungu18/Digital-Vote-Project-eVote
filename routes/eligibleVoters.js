const express = require("express");
const eligibleVoterController = require("../controllers/eligibleVotersController");

const router = express.Router();

router.post("/eligibleVoters", eligibleVoterController.postVoter);

module.exports = router;
