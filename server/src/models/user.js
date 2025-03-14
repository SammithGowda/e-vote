const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    aadharCardNumber: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['voter', 'admin'],
        default: 'voter'
    },
    isVoted: {
        type: Boolean,
        default: false
    }
  }

);

userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next()
        try {
            const saltR = 10;
            this.password = await bcrypt.hash(this.password,saltR)
            next();
        } catch (error) {
            next(error)
        }
})

userSchema.methods.comparepass = async function (password) {
    try {
        console.log(password,this.password)
        const isMatch = await bcrypt.compare(password, this.password);
        console.log(isMatch,"ismatch")
        return isMatch;
    } catch (error) {
        throw error
    }
}

module.exports = mongoose.model("User",userSchema)
