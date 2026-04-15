// backend.js
import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
const port = 8000;
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspiring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};
app.use(express.json());

const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name !== undefined && job !== undefined) {
    let result = findUserByNameAndJob(name, job);
    result = { users_list: result };
    res.send(result);
  } else if (name !== undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

function generateRandomId() {
  return Math.floor(Math.random() * 1000000).toString();
}

app.post("/users", (req, res) => {
  const newUser = req.body;
  newUser.id = generateRandomId();
  users["users_list"].push(newUser);
  res.status(201).send(newUser);
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params["id"];
  const index = users["users_list"].findIndex(user => user.id == userId);
  
  if (index !== -1) {
    users["users_list"].splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});