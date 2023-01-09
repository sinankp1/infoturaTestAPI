const {
  validateEmail,
  validateLength,
  validatePhone,
} = require("../helpers/validation");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/tokens");
const SuperAdmin = require("../models/SuperAdmin");
const Course = require("../models/Course");
const { response } = require("express");
const Subject = require("../models/Subject");
const FacultyApplication = require("../models/FacultyApplication");
const TimeSlot = require("../models/TimeSlot");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const cryptedPassword = await bcrypt.hash(password, 12);
    const admin = await new SuperAdmin({
      email,
      password: cryptedPassword,
    }).save();
    // check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User does not exist" });
    // validate password
    const check = await bcrypt.compare(password, user.password);
    if (!check)
      return res.status(400).json({ message: "Incorrect loign details" });
    // generate token
    const token = generateToken(
      { id: user._id.toString() },
      process.env.ADMIN_TOEKN_SECRET,
      "7d"
    );
    // send response back to the client
    res.status(200).json({
      status: "User logged in successfully",
      token: token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.newCourse = async (req, res) => {
  try {
    const { name, duration, requirement } = req.body;
    const course = await new Course({
      name,
      duration,
      requirement,
    }).save();
    res.status(200).json({ status: "course created successfully", course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.newSubject = async (req, res) => {
  try {
    const { name, courseId } = req.body;
    const newSubject = await new Subject({
      name: name,
      course: courseId,
    }).save();
    res.status(200).json({ status: "Subject added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.newTopic = async (req, res) => {
  try {
    const { name, duration, subjectId } = req.body;
    const response = await Subject.findByIdAndUpdate(subjectId, {
      $push: { topics: { name, duration } },
    });
    res.status(200).json({ status: "topic added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.verifyApplication = async (req, res) => {
  try {
    const { applicationId, status } = req.body;
    const application = await FacultyApplication.findOne({
      _id: applicationId,
    });
    await application.updateOne({
      $set: { status },
    });
    res.status(200).json({ status: "application updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.addTimeSlot = async (req, res) => {
  timeSlotHelper(req.body)
    .then((data) => {
      return res.status(200).json({ status: data.status });
    })
    .catch((err) => {
      console.log(err);
      return res.status(err.status).json({message:err.message});
    });
};
function timeSlotHelper({ courseId, date, facultyId, topic, duration }) {
  return new Promise(async (resolve, reject) => {
    try {
      const timeSlot = await TimeSlot.findOne({
        courseId: courseId,
        date: date,
      });
      if (!timeSlot) {
        const newTimeSlot = await new TimeSlot({
          date,
          courseId,
          slots: [{ faculty: facultyId, topic: topic, duration: duration }],
        }).save();
        resolve({ status: "time slot added successfully" });
      }
      const totalTime = timeSlot.slots.reduce((acc, curr) => {
       return acc += curr.duration;
      }, 0);
      if (totalTime + duration > 5)
        reject({status:400, message: "no slots left for this day" });
      const response = await timeSlot.updateOne({
        $push: {
          slots: { faculty: facultyId, topic: topic, duration: duration },
        },
      });
      resolve({ status: "time slot added successfully" });
    } catch (error) {
      reject({status:500, message: error.message });
    }
  });
}
