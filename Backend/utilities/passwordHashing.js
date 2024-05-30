const bcrypt = require('bcrypt');

const createHash = async (plainPassword)=>{
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainPassword, salt);
}

const validatePassword = async (plainPassword,hashedPassword)=>{
    return await bcrypt.compare(plainPassword, hashedPassword);
}

module.exports ={
    createHash,
    validatePassword
}
