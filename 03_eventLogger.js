/**
 * event an action
 * logger keep track of things
 * 
 * console.log means show the log in the console
 * 
 * node js is built on event driven arcitecture
 * 
 * the goal which we are tryig to acheive is track an event and document the changes
 */

//emitter is a special object which is used to create listen and handle events 
//emit is triggering of event

const fs=require("fs");
const os=require("os");
const EventEmitter=require("events");

//since all these module are objects having functions lets create a class
//and ihnherit event function
//and we are doing this because we want to do something when an event occurs

class Logger extends EventEmitter{
    log(information){
        this.emit('message',{information})
        //console.log(information)

        //here emit is use to trigger and event goes by the name message
        //and then transfer the information
    }
}

const loggerObject = new Logger();
const filePathToStoreInfo = "./eventlog.txt"

loggerObject.log('Application Started')
loggerObject.log('Application Event occured')

//flow loggerObj.log(message) -> this.emit ->logger.on -> writeTofile and its written

const writeLogInfoToFile = (event)=>{
    const LogMessage = `${new Date().toISOString()} - ${event.information} \n`
    //this will take an object as parameter event.message value will be printed
    fs.appendFileSync(filePathToStoreInfo,LogMessage);
}

//lets make the event turned on now it started listening
//event name message and it will to a function
loggerObject.on('message',writeLogInfoToFile);

//lets call the event or start the event

setInterval(()=>{
    const memeryUsage = (os.freemem()/os.totalmem)*100
    loggerObject.log(`Current Memory usage: ${memeryUsage.toFixed(2)}`)
},3000)