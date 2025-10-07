const mongoose = require('mongoose');
const requestSchema = new mongoose.Schema({
  studentId: String,
  studentName: String,
  certificateType: String,
  purpose: String,
  requestDate: Date,
  status: String, // 'pending'|'approved'|'issued'|'rejected'
  approvedBy: String,
  approvedDate: Date,
  issuedDate: Date,
  certificateId: String,
  qrCode: String,
  trackingId: String,
  urgency: String,
  comments: String,
  documents: [String],
  scannedCertificate: String, // base64 or file URL path
  scannedCertificateType: String,
  scannedCertificateName: String,
  scannedCertificateSize: Number,
  uploadedBy: String,
  uploadedDate: Date
});
module.exports = mongoose.model('Request', requestSchema);
