const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  CNP: {
    type: String,
    trim: true,
  },
  nume: {
    type: String,
    trim: true,
  },
  prenume: {
    type: String,
    trim: true,
  },
  serie: {
    type: String,
    trim: true,
  },
  numar: {
    type: String,
    trim: true,
  },
  oras: {
    type: String,
    trim: true,
  },
  candidat: {
    type: String,
    trim: true,
  },
  varsta: {
    type: Number,
  },
  sex: {
    type: String,
    trim: true,
  },
  votedAt: {
    type: Date,
    default: Date.now(),
  },
});

const voteModel = mongoose.model("vote", voteSchema);

module.exports = voteModel;
