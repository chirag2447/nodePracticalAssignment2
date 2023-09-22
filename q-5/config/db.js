const mongoose = require("mongoose");

mongoose
  .connect("mongodb://0.0.0.0:27017/StudentsICT")
  .then(() => {
    console.log("connected to database successfuly");
  })
  .catch((e) => {
    console.log(e);
  });

module.exports = mongoose;
