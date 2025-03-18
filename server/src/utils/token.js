require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken =(payload)=>{
    let token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1h"});
    return token
};

const authenticateToken = async(req,res,next)=>{
    const token = req.headers["authorization"]?.split(" ")[1]
    if(!token) return res.status(404).json({ msg: "Not Authorized Access denied"  });
    
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err)  return res.status(403).json({ msg: "Invalid or expired token"  });
        req.user = user
        next()
    })
}
module.exports= {generateToken,authenticateToken};