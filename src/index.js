const { GraphQLServer, PubSub } = require('graphql-yoga')
const cookie = require('cookie');
const { startDB, models: mongo } = require('./db');
const path = require('path');
const fs = require('fs')
const merge = require('lodash/merge')


const pubsub = new PubSub();

const mongoDb = startDB({
  db: 'planning_poker', 
  url: 'localhost',
})


let resolvers = {}
const typeDefs = []
const services = {}

fs.readdirSync('./src/modules')
  .filter(file => (file.indexOf('.') !== 0))
  .forEach((file) => {
    const index = `./modules/${file}/index.js`
    if (!fs.existsSync(path.join(__dirname, index))) {
      return
    }
    const temp = require(index) // eslint-disable-line
    typeDefs.push(temp.typeDefs)
    resolvers = merge({}, resolvers, temp.resolvers)
    if (temp.service) {
      services[file] = temp.service
    }
  });


const server = new GraphQLServer({ 
  typeDefs: typeDefs.join(' '),
  resolvers: merge({}, resolvers),
  context: {
    mongo, 
    pubsub 
  }});

 const serverOptions = {
    subscriptions: true,
    tracing: false
};


server.start(serverOptions, ({port}) => console.log(`Server start at ${port}`))
