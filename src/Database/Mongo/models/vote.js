const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  storyId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  time: {
    type: Number
  },
  value: {
    type: String
  }
});

module.exports = mongoose.model('Vote', VoteSchema);
