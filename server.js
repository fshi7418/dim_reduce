"use strict";
// load modules
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var cp = require('child_process');

// create server
var httpServer = http.createServer(processRequest);

var port = 3000;

// specifying port
httpServer.listen(port, function() {
    console.log(`app is running at port:${port}`);
    console.log(`url: http://localhost:${port}`);
    cp.exec(`explorer http://localhost:${port}`, function () {
    });
});

function processRequest (request, response) {
    // mime type
    var mime = {
        "css": "text/css",
        "gif": "image/gif",
        "html": "text/html",
        "ico": "image/x-icon",
        "jpeg": "image/jpeg",
        "jpg": "image/jpeg",
        "js": "text/javascript",
        "json": "application/json",
        "pdf": "application/pdf",
        "png": "image/png",
        "svg": "image/svg+xml",
        "swf": "application/x-shockwave-flash",
        "tiff": "image/tiff",
        "txt": "text/plain",
        "wav": "audio/x-wav",
        "wma": "audio/x-ms-wma",
        "wmv": "video/x-ms-wmv",
        "xml": "text/xml"
    };
    
    var requestUrl = request.url;
    console.log(requestUrl)

    requestUrl = requestUrl.replace(/%/g, '%25');
    var pathName = url.parse(requestUrl).pathname;
    if(requestUrl == "/saveModel"){
        saveModel(request,response)
        return
    }

    if(requestUrl == "/loadModel"){
        loadModel(request,response)
        return
    }


    var pathName = decodeURI(pathName);

    // absolute path of source files
    var filePath = path.resolve(__dirname + pathName);
    console.log(filePath);
    // get corresponding file types
    // get file extension via path.extname
    // all files with no extensions are deemed "unknown"
    var ext = path.extname(pathName);
    ext = ext ? ext.slice(1) : 'unknown';

    // treat unknown file types as "text/plain"
    var contentType = mime[ext] || "text/plain";

    fs.stat(filePath, (err, stats) => {
        if (err) {
            response.writeHead(404, { "content-type": "text/html" });
            response.end("<h1>404 Not Found</h1>");
        }

        if (!err && stats.isFile()) {
            readFile(filePath, contentType);
        }

        if (!err && stats.isDirectory()) {
            var html = "<head><meta charset = 'utf-8'/></head><body><ul>";

            fs.readdir(filePath, (err, files) => {
                if (err) {
                    console.log("read path fail");
                } else {

                    var flag = false;
                    for (var file of files) {

                        if (file === "index.html") {
                            readFile(filePath + (filePath[filePath.length-1]=='/' ? '' : '/') + 'index.html', "text/html");
                            flag = true;
                            break;
                        };
                        html += `<li><a href='${file}'>${file}</a></li>`;
                    }
                    if(!flag) {
                        html += '</ul></body>';
                        response.writeHead(200, { "content-type": "text/html" });
                        response.end(html);
                    }
                }
            });
        }


        function readFile(filePath, contentType){
            response.writeHead(200, { "content-type": contentType });

            var stream = fs.createReadStream(filePath);

            stream.on('error', function() {
                response.writeHead(500, { "content-type": contentType });
                response.end("<h1>500 Server Error</h1>");
            });

            stream.pipe(response);
        }
    });
}

function loadModel(request,response){
    fs.readFile('earth_shell.json', function (err, data) {
        if (err) {
            response.writeHead(200, { "content-type": "text/html" });
            response.end("file not found");
            console.error(err);
            return
        }

        response.writeHead(200, { "content-type": "text/html" });
        response.end(data.toString());
   });
}

function saveModel(request,response){
    var post = '';     
 

    request.on('data', function(chunk){    
        post += chunk;
    });
    request.on('end', function(){    

        console.log("read to write into file");
        fs.writeFile('earth_shell.json', post,  function(err) {
           if (err) {
               return console.error(err);
           }
           console.log("writing data success!");
            response.writeHead(200, { "content-type": "text/html" });
            response.end("model saved");

        });

    });
   
}