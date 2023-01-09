const jwt = require('jsonwebtoken');
require("dotenv").config();
exports.generateToken = (payload,secret,expires)=>{
    return jwt.sign(payload,secret,{
        expiresIn: expires,
    })
}