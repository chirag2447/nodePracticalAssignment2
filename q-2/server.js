const express = require("express");
const session = require("express-session");
const fileStore = require("session-file-store")(session);

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "chirag",
    resave: false,
    saveUninitialized: true,
    store: new fileStore(),
  })
);

app.get("/", (req, res) => {
  res.render("login", { msg: null });
});

app.post("/login", (req, res) => {
  const { name, password } = req.body;
  if (name == "chirag" && password == "abc") {
    req.session.user = "chirag";
    return res.render("welcome");
  } else {
    res.render("login", { msg: "username or password is wrong" });
  }
});

app.listen(8000, () => console.log(`listening on http://localhost:8000`));
