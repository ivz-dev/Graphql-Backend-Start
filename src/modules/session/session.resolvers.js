module.exports = {
  Query: {
    getSessionData: async (parent, { id }, { mongo }) =>
      await mongo.Session.findById(id)
  },
  Session: {
    users: async (parent, parameters, { mongo }) => {
      const sessionId = parent.id;
      return await mongo.User.find({ sessionId });
    },
    stories: async (parent, parameters, { mongo }) => {
      const sessionId = parent.id;
      return await mongo.Story.find({ sessionId });
    }
  },
  Mutation: {
    createSession: async (parent, { values, userName }, { mongo }) => {
      // create a new session
      const newSession = new mongo.Session({
        open: true,
        values
      });

      try {
        const session = await newSession.save();

        const newUser = new mongo.User({
          name: userName,
          admin: true,
          sessionId: session.id,
          active: true
        });

        await newUser.save();
        return session;
      } catch (e) {
        throw new Error('Cannot Save Session!');
      }
    },
    closeSession: async (parent, { sessionId }, { mongo, pubsub }) => {
      try {
        const updatedSession = await mongo.Session.findByIdAndUpdate(
          sessionId,
          { open: false },
          { new: true }
        );
        pubsub.publish(sessionId, { liveSession: updatedSession });

        return updatedSession;
      } catch (e) {
        throw new Error('Cannot close session!');
      }
    }
  },
  Subscription: {
    liveSession: {
      subscribe: (parent, { sessionId }, { pubsub }) =>
        pubsub.asyncIterator(sessionId)
    }
  }
};
