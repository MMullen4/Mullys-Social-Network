const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');

// get all users and create a new user
router.route('/').get(getUser).post(createUser);

// get a single user, update a user, and delete a user
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// add a friend
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

// delete a friend
router.route('/:userId/friends/:friendId').delete(deleteFriend);

module.exports = router;
