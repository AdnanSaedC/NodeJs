/**
 * we are going to do this using nginx basically its going to give 
 * us html,css and javascript and its going to serve thats why server
 * 
 * the job of server is to open a port and listen to it
 * 
 * what we are going to build is 
 * 
 * phase 1 server will open a port and listen to it
 * 
 * phase 2 when ever a request comes it job is to go and directory
 * and list the files
 */

/**javaScript cant to http request it beyound its scope
 * the job of listening is taken care by libuv in nodeJS
 * 
 * libuv binds all the req and gives an object and you do the things
 * u want since its an object
 * 
 * response has two things head and body
 * head is like meta data and body is like content
 *  */


// okay lets beging creating the server

//we need three things 
/**
 * 1 how to handle http request
 * 2 how to handle read and writing in the files
 * 3 how to deal with path
 *          since we have to display different files
 *          for dufferent task and we will see how to do that
 */

const http = require("http");
//it deals with web request

const fileSystem = require("fs");
//it deals with how to read and write in the file

const path = require("path");
//it deals with which html page to display and how to adapt for different OS
// win user\..
// linux user//  it will take of that

const port = 3000;

//we are creating a server and telling it how to behave
const server= http.createServer();


//lets activate the server
//it has four paramter port , allowed ips, mo of max req allowed ,then a call back just to ensure server started
//the latter three are optional
server.listen(port,()=>{
    console.log("Server is started");
}) 
