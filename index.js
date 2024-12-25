const {databaseInitializer}=require('./database/database.connect')
databaseInitializer()
const express=require('express')
const app=express()
const cors=require('cors')
app.use(express.json())
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
const Speaker=require('./speaker.models')
const Event =require("./events.models")
const PORT=3000
const createNewSpeaker=async(speakerData)=>{
    try {
     const newSpeaker=new Speaker(speakerData)
     const saveData=await newSpeaker.save()  
   
     if(saveData){
        console.log("Data Saved Successfully",saveData)
     } 
       return saveData
    } catch (error) {
       throw error 
    }
}
app.post("/speakers",async(req,res)=>{
    try {
        const newSpeaker=await createNewSpeaker(req.body)
if(newSpeaker){
    res.status(200).json({message:"Speaker Added to the database"})
}
        
    } catch (error) {
        res.status(500).json({error:"Failed to save Speaker"})
    }
})
async function readAllSpeakers() {
    try {
        const speakers=await Speaker.find()
        return speakers
    } catch (error) {
        throw "Failed to get all Apeakers"
    }    
    }
    app.get("/speakers",async(req,res)=>{
        try {
          const speakers=await readAllSpeakers()
          if(speakers.length!=0){
            res.status(200).json(speakers)
          }else{
            res.status(404).json({error:"Data not found."})
          }
        } catch (error) {
            req.status(500).json({error:"Failed to get data"})
        }
    })
    const readAllEvents=async()=>{
        try {
        const eventsData=await Event.find().populate("speakers")
        console.log(eventsData) 
        return eventsData  
        } catch (error) {
         throw error   
        }
    }
    app.get("/events",async(req,res)=>{
        try {
            const events=await readAllEvents()
            if(events.length!=0){
              res.status(200).json(events)
            }else{
              res.status(404).json({error:"Data not found."})
            }
        } catch (error) {
            res.status(500).json({error:"Failed to get data"})
        }
    })
    async function createEvent(eventData) {
        try {
          const newEvent=new Event(eventData)  
          const saveData= await newEvent.save()
          return saveData
        } catch (error) {
            throw error
        }
    }
    app.post("/events",async(req,res)=>{
        try {
            const newEvent=await createEvent(req.body)
    if(newEvent){
        res.status(200).json({message:"Event Added to the database"})
    }
            
        } catch (error) {
            res.status(500).json({error:"Failed to save Event"})
        }
    })
    const deleteSpeaker=async (speakerId) => {
      try {
        const deletedData=await Speaker.findByIdAndDelete(speakerId)
        return deletedData
      } catch (error) {
        throw error
      }  
    }
    app.delete("/speakers/:speakerId",async(req,res)=>{
        try {
            const deletedData=await deleteSpeaker(req.params.speakerId)
            if(deletedData){
                res.status(200).json({message:"Data deleted successfully"})
            }else{
                res.status(404).json({message:"Data Not Found"})
            }
        } catch (error) {
           res.status(500).json({error:"Failed to delete Speaker Data"}) 
        }
    })
    const deleteEvent=async(eventId)=>{
try {
 const deletedData=await Event.findByIdAndDelete(eventId)   
 return deletedData
} catch (error) {
    throw error
}
    }
    app.delete("/events/:eventId",async(req,res)=>{
        try {
            const deletedData=await deleteEvent(req.params.eventId)
            if(deletedData){
                res.status(200).json({message:"Data deleted successfully"})
            }else{
                res.status(404).json({message:"Data Not Found"})
            }
        } catch (error) {
           res.status(500).json({error:"Failed to delete Event Data"}) 
        }
    })
    app.listen(PORT,()=>{
        console.log("App is running on the PORT: ",PORT)
    })