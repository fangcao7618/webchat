var http = require("http");
var fs = require('fs');
exports.start = function() {
    http.createServer(function(request, response) {
        fs.readFile('./index.html', 'utf-8', function(err, data) { //读取内容 
            if (err) throw err;
            response.writeHead(200, {
                "Content-Type": "text/html"
            }); //注意这里 
            response.write(data);
            response.end();
        });
    }).listen(8888);
    console.log("server start...");
}
