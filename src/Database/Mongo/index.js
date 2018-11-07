const config = require("config");

// Models
const mongoose = require("mongoose");
const Vote = require("./models/vote.js");
const User = require("./models/user.js");
const Story = require("./models/story.js");
const Session = require("./models/session.js");

// SET UP Mongoose Promises.
mongoose.Promise = global.Promise;

mongoose.connect(
  `mongodb://${config.get("Database.mongo.host")}/${config.get(
    "Database.mongo.name"
  )}`,
  { useNewUrlParser: true }
);

module.exports = {
  Vote,
  User,
  Story,
  Session
};
