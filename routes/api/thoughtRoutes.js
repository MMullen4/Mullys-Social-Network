const router = require('express').Router();
const {
  getThought,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  addReaction,
  deleteReaction,

} = require('../../controllers/thoughtController'); // import the functions from our thought controller

// get all thoughts and create a new thought
router.route('/').get(getThought).post(createThought); 

// get a single thought, update a thought, and delete a thought
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// add a reaction to a thought
router.route('/:thoughtId/reactions').post(addReaction);

// delete a reaction from a thought
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
