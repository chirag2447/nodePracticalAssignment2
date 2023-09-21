const mongoose = require("../config/db");

const stdSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  fileName: [String],
});

const student = mongoose.model("student", stdSchema);

module.exports = student;
