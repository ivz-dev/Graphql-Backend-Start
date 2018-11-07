module.exports = {
  resolvers: require('./session.resolvers'),
  typeDefs: require('../../utils/gqlLoader')('session/session.graphql')
};
