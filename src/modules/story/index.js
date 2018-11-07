module.exports = {
  resolvers: require("./story.resolvers"),
  typeDefs: require("../../utils/gqlLoader")("story/story.graphql")
};
