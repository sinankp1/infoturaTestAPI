const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "first name is required"],
    trim: true,
    text: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
  },
  phone: {
    type: Number,
    required: [true, "phone is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  application:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Application",
  }
},{
  timestamps:true
}
);

module.exports = mongoose.model("User", userSchema);


