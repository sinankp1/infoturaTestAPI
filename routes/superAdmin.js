const express = require("express");
const {
  login,
  newTopic,
  newSubject,
  verifyApplication,
  newCourse,
  addTimeSlot,
} = require("../controllers/superAdminController");
const { authAdmin } = require("../middlewares/auth");
const router = express.Router();

// all user routes

router.post("/login", login);
router.post("/newCourse", newCourse);
router.post("/newSubject", newSubject);
router.put("/newTopic", newTopic);
router.put("/verifyApplication", verifyApplication);
router.post("/addTimeSlot", addTimeSlot);

module.exports = router;
