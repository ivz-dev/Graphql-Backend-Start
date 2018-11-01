const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  value: {
    type: String
  },
  current: {
    type: Boolean
  },
  pause: {
    type: Boolean
  },
  time: {
    type: Number
  }
});
module.exports =  mongoose.model('Story', StorySchema);