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
 *
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
const server= http.createServer((request,response)=>{
    console.log("server got the access");

    // const filePathOfTheFileToBeDisplayed
    let filePath = String(path.join(__dirname,request.url === "/" ? "index.html" : request.url))
    let filePathLength = (String(filePath).length)-1;

    //lets optimize for if person not giving the .html extension
        if(filePath[filePathLength-4] != '.' && filePath[filePathLength-3] !='h'
            && filePath[filePathLength-2] !='t' && filePath[filePathLength-1] !='m' && filePath[filePathLength] !='l'
        ){
            filePath=String(filePath)+".html";
        }
    
    
    
    //what it does it user/.../node(__using __dirname) if 
    //req url after port contain / it will give index.html if not then what is mentioned ther like
    //about.html

    //lets tell the serer what king of data they can expect from us using extname function
    //it will tell its .html,.css etc
    const extName = String(path.extname(filePath)).toLowerCase();

    //this is type which u r setting that these type of ext are allowed in my server
    //this is for response head u will get to know in a bit
    const mimeTypes={
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript",
        ".png": "text/png",
    }

    //now extracting the ext in real time
    const contentType = mimeTypes[extName] || 'application/octet-stream'
    //app it a generic type

    //error first in the parameter since we are dealing witth server
    fileSystem.readFile(filePath,(error,content)=>{
        if(error){
            if(error.code === "ENOENT"){
                //ENOENT file not found
                response.writeHead(404,{"Content-Type":"text/html"})
                response.end("File not found brooo")
            }
        }
        else{
            // response has two things head and body
            //head is like meta data and body is like content
            response.writeHead(200,{"Content-Type":contentType})
            //head and 200 is the status code
            response.end(content,"utf-8");
            //utf-8 tell that the content in english
        }
    })
});


//lets activate the server
//it has four paramter port , allowed ips, mo of max req allowed ,then a call back just to ensure server started
//the latter three are optional
server.listen(port,()=>{
    console.log("Server is started");
}) 
