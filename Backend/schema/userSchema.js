const express = require('express');
const zod = require('zod');

const allowedPasswordCharacters = /^[!"#$%&'()*+,\-./0-9:;<=>?@A-Z[\\\]^_`a-z{|}~]+$/;

const passwordSchema = zod.string()
    .min(8,{message: "Password length must be atleast 8"})
    .max(40,{message: "Password length must be atmost 40"})
    .superRefine((val,ctx)=>{
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

const signupSchema = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    plainPassword: passwordSchema
});

const loginSchema = zod.object({
    username: zod.string().email(),
    plainPassword: zod.string()
});

const updateSchema = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    plainPassword: passwordSchema.optional()
});


module.exports = {
    signupSchema,
    loginSchema,
    updateSchema
}