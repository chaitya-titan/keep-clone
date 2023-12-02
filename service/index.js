const express = require("express");
const cors = require("cors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path");
const db = require("./db");
const collection = db.collection;
// const User = require("./Users.json");
// require("./auth");
require("dotenv").config();

const app = express();

SECRET = process.env.SECRET;

// console.log(path.join(__dirname, "Users.json"));

User = JSON.parse(fs.readFileSync(path.join(__dirname, "Users.json"), "utf8"));
// User = JSON.parse(fs.readFileSync("./Users.json", "utf8"));
// Todo = JSON.parse(fs.readFileSync("./Todo.json", "utf8"));

app.use(express.json());
app.use(cors());

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  if (token) {
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

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const inserted = await collection.insertOne({
    name,
    email,
    password,
    todos: [],
  });

  console.log(inserted);

  res.send("OK");
});

app.post("/login", (req, res) => {
  const { name, password } = req.body;

  if (collection.findOne({ name, password })) {
    const token = jwt.sign({ name, role: "user" }, SECRET, {
      expiresIn: "15m",
    });
    res.json({ token, name });
  } else {
    res.status(403).send("Invalid credentials");
  }
});

app.get("/api/notes", authenticateJwt, async (req, res) => {
  const { name } = req.user;

  collection.findOne({ name }).then((user) => {
    console.log(user);
    res.json(user.todos);
  });
});

app.post("/api/addNotes", authenticateJwt, async (req, res) => {
  const { name } = req.user;
  const { title, content } = req.body;
  console.log("here" + title + " " + content);

  const user = await collection.findOne({ name });
  const todos = user.todos;
  const id = `id_${Date.now()}`;
  todos.push({ id: id, title, content });
  await collection.updateOne({ name }, { $set: { todos } });

  res.json({ id, title, content });
});

app.post("/api/deleteNotes", authenticateJwt, async (req, res) => {
  const { name } = req.user;
  const { id } = req.body;
  console.log(id);

  const user = await collection.findOne({ name });
  const todos = user.todos;
  console.log(user);
  const newTodos = todos.filter((todo) => todo.id !== id);
  console.log(newTodos);
  collection.updateOne({ name }, { $set: { todos: newTodos } });

  res.json(newTodos);
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
