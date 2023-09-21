const express = require("express");
// const session = require("express-session");
const app = express();
const StudentRoute = require("./routers/studentRouter");
const Student = require("./models/Student");
const jwt = require("jsonwebtoken");
const secret = "thisismyownlittlesecret";
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

function authenticateToken(req, res, next) {
  // const token = req.header("Authorization");
  const token = req.cookies.token;
  if (!token) {
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
app.use("/Student", authenticateToken, StudentRoute);
app.get("/login", (req, res) => {
  res.render("login");
});
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
      res.cookie("token", token, { maxAge: 1000 * 60 });
      res.redirect("/Student/");
    }
  });
});
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});
app.listen(8000, () => {
  console.log("listening on http://localhost:8000");
});
