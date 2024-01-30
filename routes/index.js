const router = require('express').Router();
const movieRouter = require('./movie');
const userRouter = require('./user');

router.use('/users', userRouter)
router.use('/movies', movieRouter)

module.exports = router