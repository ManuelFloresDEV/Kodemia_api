const mongoose = require("mongoose");

const mentorsSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  email: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 100,
    match: RegExp(".*@.*..*"),
  },
  age: {
    type: Number,
    required: true,
    min: 15,
    max: 100,
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("mentors", mentorsSchema);
