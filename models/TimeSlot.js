const mongoose = require("mongoose");

const timeSlotSchema = mongoose.Schema({
  date: {
    type: String,
  },
  courseId:{
    type:String,
  },
  slots: [{
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    },
    topic: {
      type: String,
    },
    duration: {
      type: Number,
    },
  }],
});

module.exports = mongoose.model("TimeSlot", timeSlotSchema);
