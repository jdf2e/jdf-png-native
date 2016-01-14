 var path = require('path');
 var exec = require('child_process').exec;


 var execFile = __dirname + "/pngquant";
 execFile = path.normalize(execFile);

 module.exports = {
     pngCompress: function(source, target, callback, iebug) {
         var ieDebugFixStr = iebug ? "256" : "";
         last = exec(execFile + " --output " + target + " --force --verbose " + ieDebugFixStr + " " + source);
         last.on('exit', function(code) {
             if (callback) {
                 callback(code);
             }
         });
     }
 }

  module.exports.pngCompress("1.png","2.png");