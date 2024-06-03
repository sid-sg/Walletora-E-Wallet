const express = require('express');
const zod = require('zod');
const {signupSchema,loginSchema,updateSchema} = require('../schema/userSchema')

function signupMiddleware(req, res, next) {
    try {
        signupSchema.parse(req.body);
        next();
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            errors: e.errors.map(err => ({
                field: err.path[0],
                message: err.message
            }))
        });
    }
}

function loginMiddleware(req,res,next){
    try{
        loginSchema.parse(req.body);
        next();
    }
    catch(e){
        console.log(e);
        return res.status(400).json({
            errors: e.errors.map(err => ({
                field: err.path[0],
                message: err.message
            }))
        });
    }  
}

function updateMiddleware(req,res,next){
    try{
        updateSchema.parse(req.body);
        next();
    }
    catch(e){
        console.log(e);
        return res.status(400).json({
            error: e.errors
        });
    }
}

module.exports = {
    signupMiddleware,
    loginMiddleware,
    updateMiddleware
}