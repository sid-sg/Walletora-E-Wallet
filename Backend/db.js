const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
mongoose.connect("mongodb+srv://admin:admin@cluster0.ma6l1kd.mongodb.net/E_wallet");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        maxLength: 254 
    },
    firstName: {
        type: String,
        required: true,
        tirm: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    hashedPassword: {
        type: String,
        required: true
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Users = mongoose.model('Users',userSchema);
const Accounts = mongoose.model('Accounts',accountSchema);


module.exports = {
    Users,
    Accounts
};