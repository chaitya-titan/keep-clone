const express = require("express");
const cors = require("cors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const passport = require("passport");
const session = require("express-session");
const { profile, log } = require("console");
// require("./auth");
require("dotenv").config();

const app = express();

SECRET = process.env.SECRET;

User = JSON.parse(fs.readFileSync("Users.json", "utf8"));
Todo = JSON.parse(fs.readFileSync("Todo.json", "utf8"));

app.use(express.json());
app.use(session({ secret: process.env.SECRET }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

// const isLoggedIn = (req, res, next) => {
//   token = req.headers.authorization;
//   if (req.user || token) {
//     console.log("in isloggedin " + req.user + " " + token);
//     next();
//   } else {
//     console.log("I am here");
//     res.sendStatus(401);
//   }
// };

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        console.log("Here " + err);
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (User.find((user) => user.email === email)) {
    return res.status(403).send("User already exists");
  } else {
    User.push({ name, email, password, todos: [] });
    fs.writeFileSync("Users.json", JSON.stringify(User));
    res.send("OK");
  }
});

app.post("/login", (req, res) => {
  const { name, password } = req.body;
  if (User.find((user) => user.name === name && user.password === password)) {
    const token = jwt.sign({ name, role: "user" }, SECRET, {
      expiresIn: "15m",
    });
    res.json({ token, name });
  } else {
    res.status(403).send("Invalid credentials");
  }
});

app.get("/api/picture", authenticateJwt, (req, res) => {
  const { name } = req.user;
  const user = User.find((user) => user.name === name);
  res.json(user.picture);
});

app.get("/api/notes", authenticateJwt, (req, res) => {
  const { name } = req.user;
  const user = User.find((user) => user.name === name);
  res.json(user.todos);
});

app.post("/api/addNotes", authenticateJwt, async (req, res) => {
  const { name } = req.user;
  const { title, content } = req.body;
  console.log("here" + title + " " + content);
  const user = User.find((user) => user.name === name);
  const todos = user.todos;
  const id = `id_${Date.now()}`;
  await user.todos.push({ id: id, title, content });
  fs.writeFileSync("Users.json", JSON.stringify(User));
  res.json({ id, title, content });
});

app.post("/api/deleteNotes", authenticateJwt, (req, res) => {
  const { name } = req.user;
  const { id } = req.body;
  console.log(id);
  const user = User.find((user) => user.name === name);
  const todos = user.todos;
  const newTodos = todos.filter((todo) => todo.id !== id);
  console.log(newTodos);
  user.todos = newTodos;
  fs.writeFileSync("Users.json", JSON.stringify(User));
  res.json(user.todos);
});

// app.get("/auth/login", (req, res) => {
//   const { name } = req.user;
//   console.log(name.givenName);
//   const token = jwt.sign({ name: name.givenName, role: "user" }, SECRET, {
//     expiresIn: "15m",
//   });
//   // res.json({ token });
//   res.redirect(
//     `http://localhost:3000/notes/${req.user.given_name}?token=${token}`
//   );
// });

// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["email", "profile"] })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "/auth/login",
//     failureRedirect: "/auth/google/failure",
//   })
// );

// app.get("/auth/google/failure", (req, res) => {
//   res.send("Failed to authenticate..");
// });

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
