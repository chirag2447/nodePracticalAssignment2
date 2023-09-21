const router = require("express").Router();
const student = require("../models/students");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, fileName, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, fileName, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      fileName.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        fileName.originalname.split(".").pop()
    );
  },
});

const upload = multer({ storage: storage });

// router.get("/", async (req, res) => {
//   const items = await student
//     .find()
//     .then((students) => {
//       res.render("index", { items });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
router.post("/", upload.single("fileName"), (req, res) => {
  const fileName = req.file.filename;
  const { name, email, password } = req.body;
  const newStudent = new student({ name, email, password, fileName });
  newStudent
    .save()
    .then((students) => {
      res.send("student registered successfully");
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post("/multiple", upload.array("fileNames", 5), (req, res) => {
  const fileNames = req.files.map((file) => file.filename);
  console.log(fileNames);
  const { name, email, password } = req.body;
  const newStudent = new student({
    name,
    email,
    password,
    fileName: fileNames,
  });

  newStudent
    .save()
    .then((students) => {
      res.send("student registered successfully");
    })
    .catch((err) => {
      console.log(err);
    });
});
// router.put("/:id", async (req, res) => {
//   const updateStudent = await student
//     .findByIdAndUpdate(req.params.id, req.body, { new: true })
//     .then((students) => {
//       req.redirect("/api");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
// router.delete("/:id", async (req, res) => {
//   const deleteStudent = await student
//     .findByIdAndDelete(req.params.id)
//     .then((students) => {
//       res.redirect("/api");
//     })
//     .catch((err) => {
//       log.error(err);
//     });
// });

module.exports = router;
