const mongoose = require("mongoose");

mongoose
  .connect("mongodb://0.0.0.0:27017/chirag")
  .then(() => {
    console.log("connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = mongoose;
