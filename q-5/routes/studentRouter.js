const route = require("express").Router();
const Student = require("../models/student");
const { check, validationResult } = require("express-validator");

route.get("/", (req, res) => {
  Student.find().then((std) => {
    res.send(std);
  });
});

route.post(
  "/",
  [
    check("name", "please enter the name").not().isEmpty(),
    check("rollNo", "please enter the rollNo")
      .not()
      .isEmpty()
      .withMessage("Roll No must be numeric"),
    check("email", "Email is required")
      .not()
      .isEmpty()
      .isEmail()
      .withMessage("Email must be valid"),
    check("password", "Password is required")
      .not()
      .isEmpty()
      .isLength({ min: 8, max: 20 })
      .withMessage("Password must be 8-20 chars"),
    check("contact", "Contact is required")
      .not()
      .isEmpty()
      .isNumeric()
      .isLength({ min: 8, max: 20 })
      .withMessage("Contact must be numeric"),
  ],
  (req, res) => {
    const err = validationResult(req);
    if (typeof errors !== "undefined" && !errors.isEmpty()) {
      console.log("in error------------");
      return res.status(400).send(err);
    } else {
      console.log(req.body);
      const newStudent = new Student(req.body);
      newStudent.save().then(() => {
        res.status(200).send("success");
      });
    }
  }
);

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
