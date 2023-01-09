const express = require("express");
const {
  register,
  login,courses,
  facultyRegister,subjects
} = require("../controllers/userController");
const { authUser } = require("../middlewares/auth");
const router = express.Router();

// all user routes

router.post("/register", register);
router.post("/login", login);
router.post("/facultyRegister", facultyRegister);
router.get("/courses",courses)
router.get("/subjects/:course",subjects)

module.exports = router;
