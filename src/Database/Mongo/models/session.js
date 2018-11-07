const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  open: {
    type: Boolean,
    required: true
  },
  values: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Session', SessionSchema);
