const express = require('express');
const jwt = require('jsonwebtoken');

const jwtSecret = require('../config');
const {Users,Accounts} = require('../db');
const {createHash,validatePassword} = require('../utilities/passwordHashing');
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware');
const {signupMiddleware,loginMiddleware,updateMiddleware} = require('../middlewares/userSchemaMiddleware');

const router = express.Router();

// middlewares

router.use(express.json());

async function signupUserExist(req,res,next){
    console.log("signUpMiddleware passed");
    const {username} = req.body;
    try{
        const existingUser = await Users.findOne({username});
        if(existingUser){
            return res.status(400).json({message: "user already exists"});
        }
        next();
    }
    catch(e){
        return res.status(500).json({error: e.errors});
    }
}

async function loginUserExist(req,res,next){
    const {username} = req.body;
    try{
        const existingUser = await Users.findOne({username});
        if(!existingUser){
            return res.status(400).json({message: "user does not exist"});
        }
        req.hashedPassword = existingUser.hashedPassword;
        req._id = existingUser._id;
        next();
    }
    catch(e){
        return res.status(500).json({error: e.errors});
    }
}


// routes
router.post('/signup',signupMiddleware,signupUserExist,async (req,res)=>{
    console.log("signupUserExist passed");
    const {username,firstName,lastName,plainPassword} = req.body;

    const newUser = new Users({username,firstName,lastName});
    const hashedPassword = await createHash(plainPassword); //blowfish cipher
    newUser.hashedPassword = hashedPassword;
    await newUser.save();

    const userId = newUser._id;

    const newAccount = new Accounts({userId, balance: 1 + Math.random()*10000});
    await newAccount.save();

    const token = jwt.sign({userId: userId}, jwtSecret);

    console.log('User saved');
    return res.json({ 
        message: 'User saved',
        token: token
    });
});

router.post('/login',loginMiddleware,loginUserExist, async (req,res)=>{
    const {plainPassword} = req.body;
    const hashedPassword = req.hashedPassword;
    const comparedPassword = await validatePassword(plainPassword,hashedPassword); 
    if (!comparedPassword) {
        return res.status(400).json({ message: "Wrong password" });
    }

    const userId = req._id;
    const token = jwt.sign({ userId: userId }, jwtSecret);
    return res.json({
        message: 'logged in',
        token: token
    });

});

router.put('/updateInfo',jwtAuthMiddleware,updateMiddleware, async(req,res)=>{
    const updateObject = new Object();
    if(req.body.firstName){
        updateObject.firstName = req.body.firstName;
    }
    if(req.body.lastName){
        updateObject.lastName = req.body.lastName;
    }
    if(req.body.plainPassword){
        const hashedPassword = await createHash(req.body.plainPassword);
        updateObject.hashedPassword = hashedPassword;
    }
    try{
        await Users.updateOne({_id: req.userId}, updateObject);
        return res.json({message: "updated"})
    }
    catch(e){
        console.log(e);
        return res.status(500).json({ message: "Server Error" });
    }
});

router.get('/bulk',async (req,res)=>{
    const filter = req.query.filter || "";
    const foundUsers = await Users.find({
        $or: [
            {'firstName': {"$regex" : filter}},
            {'lastName': {"$regex" : filter}}
        ]

    })
    const mappedUsers = foundUsers.map(({ username, firstName, lastName, _id }) => ({
        username,
        firstName,
        lastName,
        _id
    }));
    res.json({ users: mappedUsers });
});

module.exports = router;