const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
mongoose.connect("mongodb+srv://admin:admin@cluster0.ma6l1kd.mongodb.net/E_wallet");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: 3,
        maxLength: 254 
    },
    firstName: {
        type: String,
        required: true,
        tirm: true,
        maxLength: 30
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30
    },
    hashedPassword: {
        type: String,
        required: true
    }
});

// userSchema.methods.createHash = async (plainPassword)=>{
//     const saltRounds = 10;
//     const salt = await bcrypt.genSalt(saltRounds);
//     return await bcrypt.hash(plainPassword, salt);
// }

// userSchema.methods.validatePassword = async (plainPassword,hashedPassword)=>{
//     return await bcrypt.compare(plainPassword, hashedPassword);
// }


const Users = mongoose.model('Users',userSchema);

module.exports = Users;