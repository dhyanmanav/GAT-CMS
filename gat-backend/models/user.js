const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  type: String, // 'student'|'admin'
  studentId: String,
  department: String,
  role: String, // HOD, Academic Officer, etc.
  section: String,
  phone: String,
  address: String,
  signature: String // If needed for admin digital signature
});
module.exports = mongoose.model('User', userSchema);
