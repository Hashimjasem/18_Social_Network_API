const User = require('../models/User');
const Thoughts = require('../models/Thoughts');

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find();
      return users;
    },
    user: async (_, { id }) => {
      const user = await User.findById(id);
      return user;
    },
    thoughts: async () => {
      const thoughts = await Thoughts.find();
      return thoughts;
    },
    thought: async (_, { id }) => {
      const thought = await Thoughts.findById(id);
      return thought;
    },
  },
  Mutation: {
    addUser: async (_, { userInput }) => {
      const user = new User(userInput);
      await user.save();
      return user;
    },
    addThought: async (_, { thoughtInput }) => {
      const thought = new Thoughts(thoughtInput);
      await thought.save();
      return thought;
    },
    addFriend: async (_, { userId, friendId }) => {
      const user = await User.findById(userId);
      user.friends.push(friendId);
      await user.save();
      return user;
    },
  },
  User: {
    thoughts: async (parent) => {
      const thoughts = await Thoughts.find({ user: parent.id });
      return thoughts;
    },
    friends: async (parent) => {
      const friends = await User.find({ _id: { $in: parent.friends } });
      return friends;
    },
  },
  Thoughts: {
    user: async (parent) => {
      const user = await User.findById(parent.user);
      return user;
    },
  },
};

module.exports = resolvers;
