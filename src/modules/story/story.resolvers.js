module.exports = {
  Story: {
    votes:  async (parent, parameters, { mongo } ) => {
      const storyId = parent.id;       
      return await mongo.Vote.find({ storyId });
    },
  },
    Mutation: {
      addStory: async (parent, {sessionId, description, value }, { mongo, pubsub }) => {
        const Update = await mongo.Story.find({ sessionId }).updateMany({current: false});
       
        const newStory = new mongo.Story({
          sessionId,
          description,
          value,
          current: true,
          pause: false,
          time: 0
        });
  
        try {
          const story = await newStory.save();
  
          const updatedSession = await mongo.Session.findById(sessionId);
          pubsub.publish(sessionId, { liveSession: updatedSession })
  
          return story;
        } catch (e) {
          throw new Error('Cannot Save Story!');
        }
  
        return true;
      },
      closeStory: async (parent, { storyId }, { mongo, pubsub }) => {
        try {
          const story  = await mongo.Story.findByIdAndUpdate(storyId, {current: false}, { new: true});
  
          const sessionId = story.sessionId;
          const updatedSession = await mongo.Session.findById(sessionId);
          pubsub.publish(sessionId, { liveSession: updatedSession });
  
          return story
        } catch (e) {
          throw new Error('Cannot update Story!');
        }
        return true;
      },
      setStoryValue: async (parent, { storyId, value, time }, { mongo, pubsub }) => {
        try {
          const story  = await mongo.Story.findByIdAndUpdate(storyId, {current: false, value, time}, { new: true});
  
          const sessionId = story.sessionId;
          const updatedSession = await mongo.Session.findById(sessionId);
          pubsub.publish(sessionId, { liveSession: updatedSession });
  
          return story
        } catch (e) {
          throw new Error('Cannot update Story!');
        }
        return true;
      }
    }
}