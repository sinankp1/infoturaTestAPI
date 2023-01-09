const mongoose = require("mongoose");

const superAdminSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
  },
  password:{
    type:String,
  }
});

module.exports = mongoose.model("SuperAdmin", superAdminSchema);