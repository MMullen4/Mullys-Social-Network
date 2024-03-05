const router = require('express').Router();  // import the router object from express
const apiRoutes = require('./api'); // import the api routes from the api folder

router.use('/api', apiRoutes);

router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router; // export the router object
