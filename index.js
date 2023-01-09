const express = require("express");
const app = express();
const { connect } = require("./config/connection");
require("dotenv").config();
const cors = require("cors");
const logger = require("morgan");
const userRoutes = require("./routes/user");
const superAdminRoutes = require("./routes/superAdmin");

// middlewares
app.use(express.json());
app.use(logger("dev"));
app.use(cors());
// routes
app.use("/", userRoutes);
app.use("/superAdmin", superAdminRoutes);
// database connection
connect();

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
