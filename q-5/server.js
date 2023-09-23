const secret = "thisismyownlittlesecret";
const express = require("express");
const app = express();
const cors = require("cors");
const studentRoute = require("./routes/studentRouter");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const Student = require("./models/student");
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

function authenticateToken(req, res, next) {
  const token = req.header("Authorization");

  // const token = req.cookies.token;
  console.log(token);
  if (!token) {
    console.log("catch");
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  } else {
    try {
      var payload = jwt.verify(token, secret);
      next();
    } catch (e) {
      return res.status(401).json(e);
    }
  }
}
app.use("/students", authenticateToken, studentRoute);
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  Student.findOne({ email, password }).then((student) => {
    if (student == null) {
      return res.send("Invalid Credentials");
    } else {
      const token = jwt.sign(
        { userId: student._id, userEmail: student.email },
        secret
      );
      res.cookie("token", token, { maxAge: 1000 * 60 * 5 });

      res.status(200).send(token);
    }
  });
});
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});
app.listen(3000, () => {
  console.log(`server is listening on http://localhost:3000`);
});
