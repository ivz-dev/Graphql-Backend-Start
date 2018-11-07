module.exports = {
  Mutation: {
    addVote: async (
      parent,
      { storyId, userId, time, value },
      { mongo, pubsub }
    ) => {
      const newVote = new mongo.Vote({
        userId,
        storyId,
        time,
        value
      });

      try {
        const vote = await newVote.save();
        const { sessionId } = await mongo.Story.findById(storyId);
        const updatedSession = await mongo.Session.findById(sessionId);
        pubsub.publish(sessionId, { liveSession: updatedSession });

        return vote;
      } catch (e) {
        throw new Error('Cannot add new vote!');
      }
    }
  }
};
