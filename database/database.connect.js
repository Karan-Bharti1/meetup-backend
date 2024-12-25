const { error } = require('console')
const mongoose=require('mongoose')
require("dotenv").config()
const MONGOUri=process.env.MONGODB
async function databaseInitializer(){
    await mongoose.connect(MONGOUri).then(()=>{
        console.log("Connected to the database successfully")
    }).catch((error)=>{
        console.log("Error while connecting to the database:", error)
    })
}
module.exports={databaseInitializer}