const express = require('express');
const mongoose = require('mongoose');

const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware');
const {Accounts} = require('../db');

const router = express.Router();
router.use(express.json());

router.get('/balance',jwtAuthMiddleware, async (req,res)=>{
    const userId = req.userId;
    const userAccount = await Accounts.findOne({userId: userId})
    res.json({
        balance: userAccount.balance
    })
});

router.post('/transfer',jwtAuthMiddleware, async (req,res)=>{
    console.log("hiii");
    console.log(req.headers);
    const session = await mongoose.startSession(); //transaction start
    session.startTransaction();
    try{
        const {amount,toUserId} = req.body;
        const myUserId = req.userId;

        if(!amount || !toUserId){
            return res.status(400).json({ message: "Invalid Payload"});
        }

        const myAccount = await Accounts.findOne({userId: myUserId}).session(session);
        if(myAccount.balance < amount){
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: "Insufficient account balance"});
        }

        const toAccount = await Accounts.findOne({userId: toUserId}).session(session);

        if(!toAccount){
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: "Invalid Reciever's Account"});
        }

        await Accounts.updateOne(
            {userId: myUserId},
            {
            $inc :{balance: -amount}
            }
        ).session(session);

        await Accounts.updateOne({userId: toUserId},
            {
            $inc :{balance: amount}
            }
        ).session(session);

        await session.commitTransaction();
        session.endSession();
        return res.json({ message: "Amount Transfered Succefully"});
    }
    catch(e){
        console.log(e);
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ message: "Transaction Failed"});
    }

});

module.exports = router;