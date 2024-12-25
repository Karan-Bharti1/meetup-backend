const {databaseInitializer}=require('./database/database.connect')
databaseInitializer()
const fs=require("fs")
const Event=require('./events.models')
const jsonData=fs.readFileSync("events.json",'utf-8')
const eventsData=JSON.parse(jsonData)
function seedEventsData(){
    try {
        for(const eventData of eventsData){
            const newEventData=new Event({
                title:eventData.title,
                hostedBy:eventData.hostedBy,
                imgURL:eventData.imgURL,
                eventDes:eventData.eventDes,
                dressCode:eventData.dressCode,
                ageRestrictions:eventData.ageRestrictions,
                tags:eventData.tags,
                startDateAndTime:eventData.startDateAndTime,
                endDateAndTime:eventData.endDateAndTime,
                entryPrice:eventData.entryPrice,
                speakers:eventData.speakers,
                type:eventData.type,
                address:eventData.address
            })
            newEventData.save()
        }
    } catch (error) {
        console.log("Failed to seed Data")
    }
}
seedEventsData()