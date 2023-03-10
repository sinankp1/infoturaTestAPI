const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.authUser = (req, res, next) => {
  try {
    // get the Authorization header from req.header
    let temp = req.header("Authorization");
    // split the Authorization header into bearer token and select the token
    let token = temp ? temp.split(" ")[1] : "";
    // check if token exists
    if (!token) {
      return res.status(400).json({ message: "Invalid authentication" });
    }
    // verify the token using jwt.verify function
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(400).json({ message: "Invalid authentication" });
      }
      // set req.user as user extracted from token
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
