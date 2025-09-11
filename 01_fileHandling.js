
//datajson is different from normal json

//lets set the context first what we are doing is
// we are going to read and write from the file and the file contains tasks

const { ADDRCONFIG } = require("dns");
const fs = require("fs");
const { json } = require("stream/consumers");
//we are importing the file system  module and it an object and 
//storing in a variable just make our job easier

const filePath = "./tasks.json";

//now lets get the command from the user on what to do with the file
//for that we will use a built in object called process which is nothing
//but the thread which is running this file(lines of code)
//the process has an argv array
//0 index is node itself
//1 index is file location
//2 index is commannds

const nodeLocation = process.argv[0]
const fileLocation = process.argv[1]
const command = process.argv[2]
const argument = process.argv[3]

console.log("node locations: ",nodeLocation);
console.log("file locations: ",fileLocation);

const saveTasks=(tasks)=>{
    //tasks is an array
    const dataInJSONFormat=JSON.stringify(tasks);
    fs.writeFileSync(filePath,dataInJSONFormat);
    //this will write in the file i synchronus ways
}

const addTask = (argument)=>{
    //lets load the existing task
    const tasks=loadTasks();
    
    tasks.push({argument});
    saveTasks(tasks);
    //updating the tasks in the storage
    listTask()
}

const loadTasks=()=>{
    try {
        const dataBuffer = fs.readFileSync(filePath);
        //databuffer contains values in hexadecimal
        const dataJSON = dataBuffer.toString();
        //converting hexadecimal into string
        return JSON.parse(dataJSON);
        //converting data into JSON format
    } catch (error) {
        return []
    }
}

const listTask=()=>{
    const tasks = loadTasks();
    tasks.forEach((element,index) => {
        console.log(`${index+1} - ${element.argument}`)
    });
}

function removeTask(argument){
    let tasks = loadTasks();
    tasks = tasks.filter((eachTask) => eachTask.argument!=argument);
    saveTasks(tasks);
    listTask();
}

if(command === "add"){
    addTask(argument);
}
else if(command==="list"){
    listTask();
}
else if(command==="remove"){
    removeTask(argument);
    //anything which comes from command or browser is a string
    //that is why we have included parseInt
}
else{
    console.log("command not found")
}

