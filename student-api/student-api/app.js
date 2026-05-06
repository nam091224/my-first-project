const express = require('express');
const app = express();

app.use(express.json());

// Dữ liệu sinh viên
let students = [
  { id: 1, name: 'Nam', email: 'nam@email.com', phone: '0912345678', major: 'Computer Science' },
  { id: 2, name: 'Linh', email: 'linh@email.com', phone: '0987654321', major: 'Business' }
];

// GET /students - Lấy tất cả sinh viên
app.get('/students', (req, res) => {
  res.json(students);
});

// GET /students/:id - Lấy sinh viên theo ID
app.get('/students/:id', (req, res) => {
  const student = students.find(s => s.id == req.params.id);
  student ? res.json(student) : res.status(404).json({ message: 'Student not found' });
});

// POST /students - Tạo sinh viên mới
app.post('/students', (req, res) => {
  // Kiểm tra dữ liệu bắt buộc
  if (!req.body.name || !req.body.email || !req.body.phone || !req.body.major) {
    return res.status(400).json({ message: 'Name, email, phone, major are required' });
  }

  // Tạo sinh viên mới
  const newStudent = {
    id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    major: req.body.major
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT /students/:id - Sửa sinh viên
app.put('/students/:id', (req, res) => {
  const student = students.find(s => s.id == req.params.id);
  
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  // Sửa thông tin
  if (req.body.name) student.name = req.body.name;
  if (req.body.email) student.email = req.body.email;
  if (req.body.phone) student.phone = req.body.phone;
  if (req.body.major) student.major = req.body.major;

  res.json(student);
});

// DELETE /students/:id - Xóa sinh viên
app.delete('/students/:id', (req, res) => {
  const index = students.findIndex(s => s.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }

  const deletedStudent = students.splice(index, 1);
  res.json({
    message: 'Student deleted',
    student: deletedStudent[0]
  });
});

// Khởi động server
app.listen(3000, () => {
  console.log('Student API on http://localhost:3000');
});