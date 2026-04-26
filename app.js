const express = require('express');
const app = express();

// Middleware: Parse JSON từ request body
app.use(express.json());

// Tạo mảng user (tạm thời lưu trong bộ nhớ)
let users = [
  { id: 1, name: 'Nam', age: 25 },
  { id: 2, name: 'Linh', age: 23 }
];

// Route 1: GET - Lấy tất cả user
app.get('/users', (req, res) => {
  res.json(users);
});

// Route 2: GET - Lấy user theo ID
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const user = users.find(u => u.id == userId);
  
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Route 3: POST - Tạo user mới
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    age: req.body.age
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

// Route 4: PUT - Sửa user
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const user = users.find(u => u.id == userId);
  
  if (user) {
    user.name = req.body.name;
    user.age = req.body.age;
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Route 5: DELETE - Xóa user
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  const index = users.findIndex(u => u.id == userId);
  
  if (index !== -1) {
    const deletedUser = users.splice(index, 1);
    res.json({ message: 'User deleted', user: deletedUser[0] });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Khởi động server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});