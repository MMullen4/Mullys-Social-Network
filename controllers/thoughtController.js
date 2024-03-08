const { Thought, User } = require('../models');

module.exports = {
  async getThought(req, res) {
    try {
      const allThoughts = await Thought.find() // find all thoughts
      console.log(allThoughts);
      res.json(allThoughts); // respond / return the thoughts
    } catch (err) {
      console.error({ message: err });
      return res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const singleThought = await Thought.findOne({ _id: req.params.thoughtId });
      console.log(singleThought);
      !singleThought
        ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json(singleThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body); // create a new thought
      console.log(thought);
      await User.findOneAndUpdate( // go to the User model and find the user by their _id
        { _id: req.body.userId }, // find user by _id and update their thoughts array with the new thought's _id
        { $push: { thoughts: thought._id } }, // push the new thought's _id to the user's thoughts array
        { new: true } // return the updated document
      );
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // find a thought by its _id and delete it
  async deleteThought(req, res) {
    console.log(req.params);
    try {

      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId }); // find the thought by its _id and delete it
      console.log("where's my thought?", thought);
      if (!thought) return res.status(404).json({ message: 'No thought with that ID' })
      const userUpdate = await User.findOneAndUpdate( // go to the User model and find the user by their _id
        { _id: thought.userId }, // find user by _id and update their thoughts array with the new thought's _id
        { $pull: { thoughts: thought._id } }, // pull the deleted thought's _id from the user's thoughts array
        { new: true } // return the updated document
      );
      res.json(userUpdate); // respond with the updated user document
    } catch (err) {
      console.error("error", err);
      res.status(500).json(err)
    }
  },
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, { new: true });
      !thought
        ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate( // find the thought by its _id (from Thought model) and add the reaction to the reactions array
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } }, // add to set of nested sub-documnets to prevent duplicate reactions rather than push
        { new: true }
      );
      !thought
        ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate( // find the thought by its _id (from Thought model) and remove the reaction by its reactionId value
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } }, // remove the reaction by the reaction's reactionId value
        { new: true }
      );
      !thought
        ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
