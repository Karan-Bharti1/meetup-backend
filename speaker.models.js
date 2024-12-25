const mongoose=require('mongoose')
const { type } = require('os')

const SpeakerSchema=new mongoose.Schema({
name:{
    type:String,
    required:true,
},
designation:{
    type:String,
    required:true,
},
profileURL:{
    type:String,
    required:true,
}
})
const Speaker=mongoose.model("Speaker",SpeakerSchema)
module.exports=Speaker