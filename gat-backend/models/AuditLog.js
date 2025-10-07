const mongoose = require('mongoose');
const auditLogSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  action: String,
  resourceId: String,
  description: String,
  timestamp: { type: Date, default: Date.now },
  ipAddress: String,
  userAgent: String
});
module.exports = mongoose.model('AuditLog', auditLogSchema);
