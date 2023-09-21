const express = require("express");
const app = express();
const studentRouter = require("./routes/student");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/student", studentRouter);

app.get("/", (req, res) => {
  res.render("login");
});

app.listen(8000, () => {
  console.log("server is listening on port http://localhost:8000");
});
