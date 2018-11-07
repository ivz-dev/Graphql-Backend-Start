module.exports = {
  resolvers: require('./vote.resolvers'),
  typeDefs: require('../../utils/gqlLoader')('vote/vote.graphql')
};
