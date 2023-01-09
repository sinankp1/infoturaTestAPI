const mongoose = require("mongoose");
require("dotenv").config();
module.exports.connect = () => {
  mongoose.set("strictQuery",false);
  mongoose
    .connect(process.env.DATABASE_URI || "mongodb://localhost:27017/infotura" , {
      useNewUrlParser: true,
    })
    .then(() => console.log("database connected"))
    .catch((err) => console.log("mongoose connection error", err));
};
