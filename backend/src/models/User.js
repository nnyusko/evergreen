const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // ... 기타 필드 (건강 데이터, 구독 등)
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
