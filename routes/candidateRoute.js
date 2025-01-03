const express = require("express");
const router = express.Router();
const candidateController = require("../controllers/candidateController");

router.get("/candidates", candidateController.getAllCandidates);

router.get("/candidates/:id", candidateController.getCandidateById);

router.post("/candidates", candidateController.addCandidate);

router.patch("/candidates/:id", candidateController.editCandidate);

module.exports = router;
