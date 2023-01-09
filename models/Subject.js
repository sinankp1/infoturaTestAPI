const mongoose = require("mongoose");

const subjectSchema = mongoose.Schema({
  name: {
    type: String,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Course",
  },
  topics: [
    {
      name: {
        type: String,
      },
      duration: {
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model("Subject", subjectSchema);
