const router = require("express").Router();
const Student = require("../models/Student");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const secret = "thisismyownlittlesecret";

router.get("/", (req, res) => {
  //Get all
  Student.find({})
    .then((Students) => {
      // res.render("Students", { Students: Students });
      res.render("student", { Students: Students });
    })
    .catch((err) => {
      res.status(400).send("ERR");
    });
});

router.get("/add", (req, res) => {
  res.render("add");
});

// router.get("/:id", (req, res) => {
//   //Get one req.params.id
//   Student.findById({ _id: req.params.id })
//     .then((Student) => {
//       if (!Student) return res.status(404).send("No data found.");
//       res.status(200).send(Student);
//     })
//     .catch((err) => {
//       if (err) return res.status(500).send("There was a problem finding.");
//     });
// });

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const student = Student.find(
    (s) => s.email === email && s.password === password
  );
  if (!student) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
  const token = jwt.sign(
    { userId: student._id, userEmail: student.email },
    secret
  );
  res.cookie("token", token);
  res.redirect("/Student/");
});

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("rollNo", "Roll No is required")
      .not()
      .isEmpty()
      .isNumeric()
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
      .withMessage("Contact must be numeric"),
  ],
  function (req, res) {
    //INSERT
    const errors = validationResult(req);
    if (typeof errors !== "undefined" && !errors.isEmpty()) {
      console.log(errors.errors);
      errors.errors.forEach((element) => {
        console.log(`${element.param}: ${element.msg}`);
      });
      console.log(errors.msg);
      return res.render("add", { errors: errors });
    } else {
      var Student1 = new Student({
        name: req.body.name,
        rollNo: req.body.rollNo,
        email: req.body.email,
        password: req.body.password,
        contact: req.body.contact,
      });
      //   var Student1 = new Student(req.body);
      Student1.save()
        .then((Student) => {
          res.redirect("/Student/");
        })
        .catch((err) => {
          if (err) return res.json(err);
        });

      console.log(req.body.name);
    }
  }
);

router.get("/update", (req, res) => {
  const id = req.query.id;
  console.log(id);
  Student.findById({ _id: id }).then((std) => {
    res.render("update", { std: std });
  });
});

router.post("/update", (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  console.log(id);
  Student.findOneAndUpdate({ _id: id }, req.body, { new: true }).then((std) => {
    res.redirect("/Student/");
  });
});

router.put("/:id", (req, res) => {
  //UPDATE  req.params.id, req.body
  Student.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((Student) => {
      res.status(200).send(Student);
    })
    .catch((err) => {
      if (err) return res.status(500).send("There was a problem updating.");
    });
});

router.delete("/:id", (req, res) => {
  //DELETE req.params.id deleteOne() deleteMany() findOneAndRemove()
  Student.findOneAndRemove({ _id: req.params.id })
    .then((Student) => {
      res.status(200).send(Student);
    })
    .catch((err) => {
      if (err) return res.status(500).send("There was a problem deleting.");
    });
});

router.get("/delete", (req, res) => {
  const id = req.query.id;
  Student.findOneAndRemove({ _id: id }).then((std) => {
    res.redirect("/Student/");
  });
});
module.exports = router;
