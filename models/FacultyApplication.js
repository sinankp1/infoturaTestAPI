const mongoose = require("mongoose");

const applicationSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    trim: true,
    text: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
  },
  phone1: {
    type: Number,
    required: [true, "phone is required"],
  },
  phone2: {
    type: Number,
    required: [true, "phone is required"],
  },
  address: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  gender: {
    type: String,
    required: [true, "gender is required"],
  },
  caste: {
    type: String,
  },
  education: {
    type: String,
  },
  experience: {
    institution: {
      type: String,
    },
    year: {
      type: Number,
    },
  },
  online: {
    type: Boolean,
  },
  course: {
    type: String,
  },
  subject: {
    type: String,
  },
  topics: {
    type: Array,
  },
  expectedSalary: {
    salary: {
      type: Number,
    },
    type: {
      type: String,
    },
  },
  bYear: {
    type: Number,
    required: true,
  },
  bMonth: {
    type: Number,
    required: true,
  },
  bDay: {
    type: Number,
    required: true,
  },
  status:{
    type:String,
    enum:["verified", "rejected","applied"],
    default:"applied"
  },
  adharNumber: {
    type: Number,
  },
});

module.exports = mongoose.model("Application", applicationSchema);
