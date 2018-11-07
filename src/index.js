const { GraphQLServer, PubSub } = require('graphql-yoga');
const path = require('path');
const fs = require('fs');
const merge = require('lodash/merge');

const mysql = require('./Database/Mysql');
const mongo = require('./Database/Mongo');

// const res = mysql.User.findOne({ where: { user_id: 4 } }).then(res => console.log(res.dataValues));

const pubsub = new PubSub(); // if need graphql subscriptions

let resolvers = {};
const typeDefs = [];
const services = {};

fs.readdirSync('./src/modules')
  .filter(file => file.indexOf('.') !== 0)
  .forEach(file => {
    const index = `./modules/${file}/index.js`;
    if (!fs.existsSync(path.join(__dirname, index))) {
      return;
    }
    const temp = require(index); // eslint-disable-line
    typeDefs.push(temp.typeDefs);
    resolvers = merge({}, resolvers, temp.resolvers);
    if (temp.service) {
      services[file] = temp.service;
    }
  });

const server = new GraphQLServer({
  typeDefs: typeDefs.join(' '),
  resolvers: merge({}, resolvers),
  context: {
    mongo,
    mysql,
    pubsub
  }
});

const serverOptions = {
  subscriptions: true,
  tracing: false
};

server.start(serverOptions, ({ port }) =>
  console.log(`Server start at ${port}`)
);
