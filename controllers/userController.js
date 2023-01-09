const {
  validateEmail,
  validateLength,
  validatePhone,
} = require("../helpers/validation");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/tokens");
const Course = require("../models/Course");
const User = require("../models/User");
const FacultyApplication = require("../models/FacultyApplication");
const Subject = require("../models/Subject");

exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    // validate email
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    // check if user exists
    const check = await User.findOne({
      $or: [{ email: email }, { phone: phone }],
    });
    if (check) {
      return res.status(400).json({
        message: "Email or Phone already exists, try using another credential",
      });
    }
    // validate name , phone and password
    if (!validatePhone(phone)) {
      return res
        .status(400)
        .json({ message: "Phone number should be 10 digits" });
    }

    if (!validateLength(password, 6, 40)) {
      return res
        .status(400)
        .json({ message: "Password should be between 6 and 40 characters" });
    }
    // encrypt the password using bcrypt
    const cryptedPassword = await bcrypt.hash(password, 12);
    // Create and save new user
    const user = await new User({
      name,
      email,
      phone,
      password: cryptedPassword,
    }).save();
    // generate jwt token
    const token = generateToken(
      { id: user._id.toString() },
      process.env.TOKEN_SECRET,
      "7d"
    );
    //send response back to the client
    res.status(200).json({
      status: "account created successfully",
      user: {
        name: user.name,
        email: user.email,
        userid: user._id,
        token: token,
        application: null,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.facultyRegister = async (req, res) => {
  try {
    const {
      name,
      email,
      phone1,
      phone2,
      gender,
      caste,
      education,
      experience,
      online,
      course,
      subject,
      topics,
      expectedSalary,
      bYear,
      bMonth,
      bDay,
      address,
      pincode,
      adharNumber,
    } = req.body;
    const application = await new FacultyApplication({
      name,
      email,
      phone1,
      phone2,
      gender,
      caste,
      education,
      experience,
      online,
      course,
      subject,
      topics,
      expectedSalary,
      bYear,
      bMonth,
      bDay,
      address,
      pincode,
      adharNumber,
    }).save();
    res.status(200).json({ status: "application submitted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if user exists
    const user = await User.findOne({ email }).populate("application");
    if (!user) return res.status(400).json({ message: "User does not exist" });
    // validate password

    const check = await bcrypt.compare(password, user.password);
    if (!check)
      return res.status(400).json({ message: "Incorrect loign details" });
    if (!user.application) user.application = null;

    // generate token
    const token = generateToken(
      { id: user._id.toString() },
      process.env.TOKEN_SECRET,
      "7d"
    );
    //send response back to the client
    res.status(200).json({
      status: "User logged in successfully",
      user: {
        name: user.name,
        email: user.email,
        userid: user._id,
        application: user.application,
        token: token,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.courses = async (req, res) => {
  try {
    const allCourses = await Course.find({});
    res.status(200).json({ status: "success", courses: allCourses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.subjects = async (req, res) => {
  try {
    const {course} = req.params
    const allSubjects = await Subject.find({course:course});
    res.status(200).json({ status: "success", subjects: allSubjects });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
