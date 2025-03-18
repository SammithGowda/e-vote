require("dotenv").config()
const cors = require("cors")
const express =  require("express");
const app = express();
const helmet = require("helmet");
const connectMongoosDb = require("./connection/dbConnnection");

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


const authRoute = require("./router/signupAndlogin")
const profile = require("./router/profileRouter");
const { authenticateToken } = require("./utils/token");


app.use('/user',authRoute)
app.use('/profile',authenticateToken,profile)
app.use("/",(req,res)=>{
    res.status(200).send({success:"Wellcome to E-vote server"});
})

const erroHandler =(err,req,res,next)=>{
    res.status(err.status || 500).json({success:false,message:err.message||"Internal Server Error"})
}

app.use(erroHandler)

const PORT =process.env.PORT;

connectMongoosDb()
app.listen(PORT,()=>{
    console.log(`App runnig on port ${PORT}`);
})