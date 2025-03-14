const mongoose = require("mongoose")


const candidateSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
    },
    party: { type: String, required: true,},
    age: { type: Number, required: true,},
    votes: [
      {
        user:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"User"},
        votedAt: { type: Date, default: Date.now },
      },
    ],
    voteCount:{type:Number,default:0}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Candidate",candidateSchema)