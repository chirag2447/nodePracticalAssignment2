const express = require("express");
const session = require("express-session");
const RedisStore = require("connect-redis");
const redis = require("redis");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
});

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "chirag",
    resave: false,
    saveUninitialized: true,
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
