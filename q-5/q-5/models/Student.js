const mongoose = require("../config/db");

const studentSchema = mongoose.Schema({
  name: String,
  rollNo: String,
  email: String,
  password: String,
  contact: Number,
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
