const express = require('express');
const userRouter = require('./user');
const Users = require('../db')
const router = express.Router();

router.use('/user',userRouter);

module.exports = router;