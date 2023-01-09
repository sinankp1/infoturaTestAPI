const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  name: {
    type: String,
  },
  duration:{
    type:Number,
  },
  requirement:{
    type:String,
  }
});

module.exports = mongoose.model("Course", courseSchema);
