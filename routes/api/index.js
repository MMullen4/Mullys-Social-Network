// Purpose: to create a prefix for the thought and user routes
const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes'); // import the thought routes into the api routes
const userRoutes = require('./userRoutes'); // import the user routes into the api routes

router.use('/thoughts', thoughtRoutes); // create a prefix for the thought routes
router.use('/users', userRoutes); // create a prefix for the user routes

module.exports = router;
