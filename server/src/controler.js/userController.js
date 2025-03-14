const User = require("../models/user");
const {generateToken} = require("../utils/token");

const signup = async(req,res)=>{
    const data = req.body;
    try {
        let {name,age,email,mobile,address,aadharCardNumber,password,role,isVoted} = data
        if(!name,!age,!email,!aadharCardNumber) return res.status(400).json({error:"Missing Fields are required"})
        const newUser =  new User({name,age,email,mobile,address,aadharCardNumber,password,role,isVoted})
        await newUser.save();
        const payload ={userId:newUser._id};
        const token = generateToken(payload);
        res.status(200).send({success:"Successfully Account Created",token});
    } catch (error) {
        if(error.code==11000){
            return res.status(400).json({error:"Same value can't be added"})
        }
        res.status(505).send({error:error})
    }
}

const login = async(req,res)=>{
    try {
        const {aadharCardNumber,password} = req.body;
        if(!aadharCardNumber||!password) return res.status(400).json({error:"Missinf Fields are required"});
        
        const user = await User.findOne({aadharCardNumber});
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const passMatch = await user.comparepass(password);

        if(!passMatch) return res.status(400).json({ error: "Invalid credentials" });

        const payload ={userId:user._id,role:user.role,email:user.email}
        const token = generateToken(payload);
        console.log(req.user)
        res.status(200).send({success:token})
    } catch (error) {
        console.log(error)
        res.status(505).send("Internal Server Error")
    }
}

const deleteAll = async(req,res)=>{
    try {
        
         await User.deleteMany({})
        res.status(200).json({success:"all deleted"})
    } catch (error) {
        console.log(error)
        res.status(505).send({error:error})
    }
}
module.exports = {signup,login,deleteAll}
