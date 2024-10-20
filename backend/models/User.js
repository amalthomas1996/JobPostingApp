const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  mobile: { type: String, required: true }
});
module.exports = mongoose.model('User', UserSchema);
