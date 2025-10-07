require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const bodyParser = require('body-parser');

const User = require('./models/user');
const Request = require('./models/request');
const AuditLog = require('./models/AuditLog');


const PORT = process.env.PORT || 5000;
const app = express();
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));

// JWT Middleware
const auth = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token' });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Multer for scanned/uploaded files
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 6 * 1024 * 1024 } }); // Max 6MB

// Auth: Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'User not found' });
  const valid = await bcrypt.compare(password, user.password || '');
  if (!valid) return res.status(400).json({ message: 'Wrong password' });
  const token = jwt.sign({ id: user._id, type: user.type, name: user.name }, process.env.JWT_SECRET);
  res.json({ user, token });
});

// Get Users (admin only)
app.get('/api/users', auth, async (req, res) => {
  if (req.user.type !== 'admin') return res.status(403).json({ message: 'Admin only' });
  const users = await User.find({});
  res.json(users);
});

// Get Requests (admins see all, students see their own)
app.get('/api/requests', auth, async (req, res) => {
  let requests = [];
  if (req.user.type === 'admin') {
    requests = await Request.find();
  } else {
    requests = await Request.find({ studentId: req.user.id });
  }
  res.json(requests);
});

// Submit a Request
app.post('/api/requests', auth, async (req, res) => {
  const { studentId, studentName, ...fields } = req.body;
  const request = new Request({ ...fields, studentId, studentName, status: 'pending', requestDate: new Date() });
  await request.save();
  res.json(request);
});

// Approve/Reject/Update request
app.patch('/api/requests/:id', auth, async (req, res) => {
  const request = await Request.findById(req.params.id);
  if (!request) return res.status(404).json({ message: 'Request not found' });
  Object.assign(request, req.body);
  await request.save();
  res.json(request);
});

// Upload scanned certificate
app.post('/api/requests/:id/upload', auth, upload.single('file'), async (req, res) => {
  const request = await Request.findById(req.params.id);
  if (!request) return res.status(404).json({ message: 'Request not found' });
  // Save as base64 string
  const base64 = req.file.buffer.toString('base64');
  request.scannedCertificate = `data:${req.file.mimetype};base64,${base64}`;
  request.scannedCertificateType = req.file.mimetype;
  request.scannedCertificateName = req.file.originalname;
  request.scannedCertificateSize = req.file.size;
  request.uploadedBy = req.user.name;
  request.uploadedDate = new Date();
  await request.save();
  res.json({ message: 'File uploaded', request });
});

// Get Audit Logs
app.get('/api/auditlogs', auth, async (req, res) => {
  const logs = await AuditLog.find({});
  res.json(logs);
});

// Create Audit Log
app.post('/api/auditlogs', auth, async (req, res) => {
  const log = new AuditLog({ ...req.body, timestamp: new Date() });
  await log.save();
  res.json(log);
});

// Populate sample admin/admin passwords if none exist
app.get('/api/setup-seed', async (req, res) => {
  if ((await User.countDocuments()) === 0) {
    await User.create([
      {
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@gat.ac.in',
        password: await bcrypt.hash('student123', 10),
        type: 'student',
        studentId: '4NM20CS001',
        department: 'Computer Science Engineering'
      },
      {
        name: 'Priya Sharma',
        email: 'priya.sharma@gat.ac.in',
        password: await bcrypt.hash('student123', 10),
        type: 'student',
        studentId: '4NM20CS025',
        department: 'Computer Science Engineering'
      },
      {
        name: 'Dr. Suresh Reddy',
        email: 'suresh.reddy@gat.ac.in',
        password: await bcrypt.hash('admin123', 10),
        type: 'admin',
        role: 'HOD',
        department: 'Computer Science Engineering'
      },
      {
        name: 'Ms. Anitha Rao',
        email: 'anitha.rao@gat.ac.in',
        password: await bcrypt.hash('admin123', 10),
        type: 'admin',
        role: 'Academic Officer',
        department: 'Academic Administration'
      }
    ]);
  }
  res.json({ message: 'Seeded users.' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
