const mongoose = require('mongoose');
const Vote = require('./models/vote.js');
const User = require('./models/user.js');
const Story = require('./models/story.js');
const Session = require('./models/session.js');

// SET UP Mongoose Promises.
mongoose.Promise = global.Promise;

const startDB = ({ url, db }) => mongoose.connect(`mongodb://${url}/${db}`, { useNewUrlParser: true });

module.exports = {
    models: {
        Vote, User, Story, Session
    },
    startDB
}