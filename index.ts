import express from "express";
const app = express();
const port = 3000;

const todos = [
  {
    name: "demo",
    completed: false,
  },
];

app.get("/", (req, res) => {
  res.sendFile("./index.html", { root: __dirname });
});

app.get("/html", (req, res) => {
  res.sendFile("./index.html", { root: __dirname });
});

app.get("/style.css", (req, res) => {
  res.sendFile("./style.css", { root: __dirname });
});

app.get("/script.js", (req, res) => {
  res.sendFile("./script.js", { root: __dirname });
});

app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.get("/api/todos/create", (req, res) => {
  const params = req.query;
  const newTodo = {
    name: `${params.todo}`,
    completed: false,
  };
  todos.push(newTodo);
});

app.get("/api/todos/complete", (req, res) => {
  const params = req.query;
  const foundTaskIndex = todos.findIndex((task) => task.name === params.name);

  if (foundTaskIndex !== -1) {
    const oldTask = todos[foundTaskIndex];
    const updatedTask = {
      name: oldTask.name,
      completed: !oldTask.completed,
    };

    todos[foundTaskIndex] = updatedTask;
  }
});

app.get("/api/todos/edit", (req, res) => {
  const params = req.query;
  const foundTaskIndex = todos.findIndex((task) => task.name === params.todo);

  if (foundTaskIndex !== -1) {
    const oldTask = todos[foundTaskIndex];

    if (params.newName) {
      todos.splice(foundTaskIndex, 1, {
        name: `${params.newName}`,
        completed: oldTask.completed,
      });
    }
  }
});

app.get("/api/todos/delete", (req, res) => {
  const foundTaskIndex = todos.findIndex(
    (task) => task.name === req.query.todo
  );

  if (foundTaskIndex !== -1) todos.splice(foundTaskIndex, 1);
});

app.listen(port, () => {
  console.log(`Sandbox listening on port ${port}`);
});
