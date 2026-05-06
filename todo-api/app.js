const express = require('express');
const app = express();

app.use(express.json());

let todos = [
  { id: 1, title: 'Learn JavaScript', completed: true },
  { id: 2, title: 'Learn Express', completed: false }
];

// GET /todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// GET /todos/:id
app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  todo ? res.json(todo) : res.status(404).json({ message: 'Not found' });
});

// POST /todos
app.post('/todos', (req, res) => {
  if (!req.body.title) return res.status(400).json({ message: 'Title required' });
  const newTodo = { id: todos.length + 1, title: req.body.title, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /todos/:id
app.put('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (!todo) return res.status(404).json({ message: 'Not found' });
  todo.title = req.body.title;
  todo.completed = req.body.completed;
  res.json(todo);
});

// DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Not found' });
  const deleted = todos.splice(index, 1);
  res.json({ message: 'Deleted', todo: deleted[0] });
});

app.listen(3000, () => {
  console.log('Todo API on http://localhost:3000');
});