const {databaseInitializer}=require('./database/database.connect')
databaseInitializer()
const fs=require("fs")
const Speaker=require("./speaker.models")
const jsonData=fs.readFileSync("speakers.json",'utf-8')
const speakersData=JSON.parse(jsonData)
function seedSpeakerData(){
    try {
        for(const speakerData of speakersData){
            const newSpeaker=new Speaker({
                name:speakerData.name,
                designation:speakerData.designation,
                profileURL:speakerData.profileURL
            })
            newSpeaker.save()
        }
    } catch (error) {
        console.log("Error while seeding the data",error)   
    }
}
// seedSpeakerData()