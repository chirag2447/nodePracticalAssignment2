const route = require("express").Router();
const Student = require("../models/student");

route.get("/", (req, res) => {
  Student.find().then((std) => {
    res.send(std);
  });
});

route.post("/", (req, res) => {
  console.log(req.body);
  const newStudent = new Student(req.body);
  newStudent.save().then(() => {
    res.status(200).send("success");
  });
});

route.get("/:id", (req, res) => {
  Student.findById(req.params.id).then((std) => {
    res.send(std);
  });
});

route.put("/:id", (req, res) => {
  Student.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  }).then(() => {
    res.status(200).send("success");
  });
});
route.delete("/:id", (req, res) => {
  console.log("in delete");
  Student.findOneAndDelete({ _id: req.params.id }).then(() => {
    res.status(200).send("success");
  });
});
module.exports = route;
