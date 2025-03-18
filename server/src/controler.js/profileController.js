const Profile = require("../models/user");

const profile = async(req,res)=>{
    // const data = req.body;
    try {
        if(!req.user) throw Error("No user found");

        const user = await Profile.findById({_id:req.user.userId});

        res.status(200).send({success:"Successfully user fecthed",data:user});

    } catch (error) {
        if(error.code==11000){
            return res.status(400).json({error:"error while getting user"})
        }
        res.status(505).send({error:error.message})
    }
}

const profilePassChange = async(req,res)=>{
    // const data = req.body;
    try {
        const userId = req.user.userId;
        const {currentPassword,newPassword} = req.body;

        if(!currentPassword || ! newPassword) throw Error("Current and new Pass required");

        const user = await Profile.findById({_id:userId});

        if(!user) throw Error("No Active user exist");

        const passMatch = await user.comparepass(currentPassword);

        if(!passMatch) return res.status(400).json({ error: "Invalid credentials" });

        user.password = newPassword;
        await user.save()
        res.status(200).send({success:"Successfully pass change"});

    } catch (error) {
        if(error.code==11000){
            return res.status(400).json({error:"error while changing  password"})
        }
        res.status(505).send({error:error.message})
    }
}


module.exports = {profile,profilePassChange}