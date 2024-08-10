const mongoose = require("mongoose");

const generationsSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    min: 1,
  },
  program: {
    type: String,
    required: true,
    enum: ["javascript", "python", "mobile"],
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "mentors",
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("generations", generationsSchema);
