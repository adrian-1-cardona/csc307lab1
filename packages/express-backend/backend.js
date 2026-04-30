import express from "express";
import cors from "cors";
import userServices from "./models/user-services.js";

const app = express();
app.use(cors());
const port = 8000;

app.use(express.json());

// GET all users or filter by name/job
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  userServices
    .getUsers(name, job)
    .then((users) => {
      res.send({ users_list: users });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
});

// GET user by ID
app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  userServices
    .findUserById(id)
    .then((user) => {
      if (user === null) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(user);
      }
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
});

// POST new user
app.post("/users", (req, res) => {
  const newUser = req.body;

  userServices
    .addUser(newUser)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
});

// DELETE user by ID
app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;

  userServices
    .findUserById(userId)
    .then((user) => {
      if (user === null) {
        res.status(404).send();
      } else {
        return userServices.deleteUser(userId);
      }
    })
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});