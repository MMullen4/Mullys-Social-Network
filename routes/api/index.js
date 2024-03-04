const router = require('express').Router();
const postRoutes = require('./thoughtRoutes');
const tagRoutes = require('./userRoutes');

router.use('/posts', postRoutes);
router.use('/tags', tagRoutes);

module.exports = router;
