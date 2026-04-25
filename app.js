const express = require('express');
const app = express();

// Route 1: Trang chủ
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

// Route 2: Lấy danh sách user
app.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'Nam', age: 25 },
    { id: 2, name: 'Linh', age: 23 },
    { id: 3, name: 'Minh', age: 26 }
  ];
  res.json(users);
});

// Khởi động server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});