const express = require('express');
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware');
const {Accounts} = require('../db');
const router = express.Router();

router.get('/balance',jwtAuthMiddleware, async (req,res)=>{
    const userId = req.userId;
    const userAccount = await Accounts.findOne({userId: userId})
    res.json({
        balance: userAccount.balance
    })
});

module.exports = router;