require("dotenv").config()
const mongoose = require("mongoose")

const connectionUrl = process.env.connectionUrl
async function connectMongoosDb(params) {
    try {
        const connection = await mongoose.connect(connectionUrl)
        console.log("Connected to MongoDB successfully",connection.connection.host);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error
        
    }
}

module.exports = connectMongoosDb