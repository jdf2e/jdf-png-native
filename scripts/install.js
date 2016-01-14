 var http = require('http');
 var fs = require('fs');
 var path = require('path');



 var download = function(url, dest, cb) {
     var file = fs.createWriteStream(dest);
     var request = http.get(url, function(response) {

         // check if response is success
         if (response.statusCode !== 200) {
             return cb('Response status was ' + response.statusCode);
         }

         response.pipe(file);

         file.on('finish', function() {
             file.close(cb); // close() is async, call cb after close completes.
         });
     });

     // check for request error too
     request.on('error', function(err) {
         fs.unlink(dest);

         if (cb) {
             return cb(err.message);
         }
     });

     file.on('error', function(err) { // Handle errors
         fs.unlink(dest); // Delete the file async. (But we don't check the result)

         if (cb) {
             return cb(err.message);
         }
     });
 };

 switch (process.platform) {
     case "win32":
         download("http://cdn.original-fun.com/jdf/pngquant.exe", path.normalize(__dirname + "/../pngquant.exe"), function() {
             console.log("pngquant done");
         });
         break;

     case "darwin":

         ;
         break;

     case "linux":

         ;
         break;
 }
