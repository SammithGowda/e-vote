const User = require("../models/user")

const signup = async(req,res)=>{
    const data = req.body;
    try {
        let {name,age,email,mobile,address,aadharCardNumber,password,role,isVoted} = data
        
        const newUser =  new User({name,age,email,mobile,address,aadharCardNumber,password,role,isVoted})
        await newUser.save();
        res.status(200).send({success:"Successfully Account Created"})
    } catch (error) {
        console.log(error)
        res.status(505).send("Internal Server Error")
    }
}

const login = async(req,res)=>{
    try {
        
        const user = User.find()
        res.status(200).send({success:user})
    } catch (error) {
        console.log(error)
        res.status(505).send("Internal Server Error")
    }
}
module.exports = {signup,login}
