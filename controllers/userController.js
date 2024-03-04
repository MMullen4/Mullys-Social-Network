const { User, Thought } = require('../models');

module.exports = {
  async getUser(req, res) {
    try {
      const user = await User.find({})
        .select('-__v');
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate('thoughts')
        .populate('friends');
      !user
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
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }); // new: true returns the updated document
      !user // If User not found
        ? res.status(404).json({ message: 'No user with that ID' })  // User not found
        : res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
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
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $push: { friends: req.params.friendId } }, { new: true });
      !user
        ? res.status(404).json({ message: 'No user with that ID' })  // User not found
        : res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });
      !user
        ? res.status(404).json({ message: 'No user with that ID' })  // User not found
        : res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
