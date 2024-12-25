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
    app.listen(PORT,()=>{
        console.log("App is running on the PORT: ",PORT)
    })