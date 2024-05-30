const express = require('express');
const zod = require('zod');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config');
const Users = require('../db')
const router = express.Router();

// zod schemas

const allowedPasswordCharacters = /^[!"#$%&'()*+,\-./0-9:;<=>?@A-Z[\\\]^_`a-z{|}~]+$/;

const passwordSchema = zod.string()
    .min(8,{message: "Password length must be atleast 8"})
    .max(40,{message: "Password length must be atmost 40"})
    .superRefine((val,ctx)=>{5
        if(!/[A-Z]/.test(val)){
            ctx.addIssue({
                code: zod.ZodIssueCode.custom,
                message: "There must be atleast one uppercase letter"
            });
        }
        if(!/[a-z]/.test(val)){
            ctx.addIssue({
                code: zod.ZodIssueCode.custom,
                message: "There must be atleast one lowercase letter"
            });
        }
        if(!/(?=.*[0-9])|(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/.test(val)){
            ctx.addIssue({
                code: zod.ZodIssueCode.custom,
                message: "There must be atleast one number of special character"
            });
        }
        if (!allowedPasswordCharacters.test(val)) {
            ctx.addIssue({
              code: zod.ZodIssueCode.custom,
              message: "Password contains invalid characters"
            });
          }
    });

const signUpSchema = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    plainPassword: passwordSchema
});

const loginSchema = zod.object({
    username: zod.string().email(),
    plainPassword: zod.string()
});

// middlewares

router.use(express.json());

function signupMiddleware(req,res,next){
    try{
        signUpSchema.parse(req.body);
        next();
    }
    catch(e){
        return res.status(400).json({
            error: e.errors
        });
    }  
}

function loginMiddleware(req,res,next){
    try{
        loginSchema.parse(req.body);
        next();
    }
    catch(e){
        return res.status(400).json({
            error: e.errors
        });
    }  
}

async function signupUserExist(req,res,next){
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
        req.existingUser = existingUser;
        next();
    }
    catch(e){
        return res.status(500).json({error: e.errors});
    }
}


// routes
router.post('/signup',signupMiddleware,signupUserExist,async (req,res)=>{
    const {username,firstName,lastName,plainPassword} = req.body;

    const newUser = new Users({username,firstName,lastName});
    const hashedPassword = await newUser.createHash(plainPassword); //blowfish cipher
    newUser.hashedPassword = hashedPassword;
    await newUser.save();

    const userId = newUser._id;
    const token = jwt.sign({userId: userId}, jwtSecret);

    console.log('User saved');
    return res.json({ 
        message: 'User saved',
        token: token
    });
});

router.post('/login',loginMiddleware,loginUserExist, async (req,res)=>{
    const {username, plainPassword} = req.body;
    const existingUser = req.existingUser;
    const comparedPassword = await existingUser.validatePassword(plainPassword,existingUser.hashedPassword); 
    if (!comparedPassword) {
        return res.status(400).json({ message: "Invalid password" });
    }

    const userId = existingUser._id;
    const token = jwt.sign({ userId: userId }, jwtSecret);
    return res.json({
        message: 'logged in',
        token: token
    });

});

router.put('/updateInfo',(req,res)=>{
    res.send('updated info')
});

module.exports = router;