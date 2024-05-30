const jwt = require('jsonwebtoken');
const jwtSecret = require('../config');

const jwtAuthMiddleware = (req,res,next)=>{
    const header = req.headers.authorization;

    if( !(header) || !(header.startsWith('Bearer'))){
        return res.status(403).json({ message: 'not authorized'});
    }
    const token = header.split(' ')[1];
    try{
        const decoded = jwt.verify(token,jwtSecret);
        req.userId = decoded.userId;
        next();
    }
    catch(e){
        return res.status(403).json({ message: 'not authorized'});
    }
}

module.exports = jwtAuthMiddleware;