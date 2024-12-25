const mongoose=require('mongoose')
const { type } = require('os')
const EventsSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    hostedBy:{
        type:String,
        required:true,
    },
    imgURL:{
        type:String,
        required:true
    },
    eventDes:{
        type:String,
        required:true
    },
    dressCode:{
        type:String,
        required:true
    },
    ageRestrictions:{
        type:String,
        required:true
    },
    tags:[{
        type: String
    }],
    startDateAndTime:{
        type:String
    },
    endDateAndTime:{
        type:String
    },
    entryPrice:{
        type:Number
    },
    speakers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Speaker' }],
    type:{
        type:String,
        enum:["Online", "Offline","Both"]
    },
    address:{
        type:String,
    }
},{
    timestamps:true
})
const Event=mongoose.model("Event",EventsSchema)
module.exports=Event