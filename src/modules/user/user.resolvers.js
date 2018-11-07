module.exports = {
  Mutation: {
    addUser: async (parent, { sessionId, name }, { mongo, pubsub }) => {
      const User = await mongo.User.find({ name, sessionId });
      if (User.length) throw new Error('This user allready exist');

      const newUser = new mongo.User({
        name,
        sessionId,
        active: true
      });
      ('');

      try {
        const user = await newUser.save();

        const updatedSession = await mongo.Session.findById(sessionId);
        pubsub.publish(sessionId, { liveSession: updatedSession });

        return user;
      } catch (e) {
        throw new Error('Cannot add new user!');
      }
    }
  }
};
