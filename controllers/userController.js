const { User, Thought } = require('../models');  // import the User and Thought models

// The user controller is responsible for handling user requests
module.exports = {
  async getUser(req, res) {
    try {
      const user = await User.find({})
        .select('-__v');  // exclude the __v field
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get a single user by its _id and populate thought and friend data
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }) // find a single user by its _id
        .populate('thoughts')  // populate the thoughts field
        .populate('friends');  // populate the friends field
      !user  // a shorthand if/else statement
        ? res.status(404).json({ message: 'No user with that ID' })  // User not found
        : res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // update a user by its _id
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }); // new: true returns the updated document rather than the original
      !user // If User not found
        ? res.status(404).json({ message: 'No user with that ID' })  // User not found
        : res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // delete a user by its _id
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      !user
        ? res.status(404).json({ message: 'No user with that ID' })  // User not found
        : res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // add a friend to a user's friend list
  async addFriend(req, res) {
    try { // push the new friend's _id to the user's friends array
      const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $push: { friends: req.params.friendId } }, { new: true });
      !user
        ? res.status(404).json({ message: 'No user with that ID' })  // User not found
        : res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // remove a friend from a user's friend list
  async deleteFriend(req, res) {
    try { // pull the friend's _id from the user's friends array
      const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });
      !user
        ? res.status(404).json({ message: 'No user with that ID' })  // User not found
        : res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
