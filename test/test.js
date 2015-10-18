var http = require("http");
var url = require("url");
var querystring = require('querystring');
var crypto=require('crypto');
var isLegel = function(signature, timestamp, nonce) {
    var TOKEN = 'tnwechattest';
    var arr = [TOKEN, timestamp, nonce];
    // 对三个参数进行字典序排序
    arr.sort();
    // sha1 加密
    var sha1 = crypto.createHash('sha1');
    var msg = arr[0] + arr[1] + arr[2];
    sha1.update(msg);
    msg = sha1.digest('hex');
    // 验证
    if (msg == signature) {
        console.log('验证成功');
        return true;
    } else {
        console.log('验证失败');
        return false;
    }
};
var server = http.createServer(function(req, res) {
	console.log('server start ...');
	var urls=url.parse(req.url),
		pathname=urls.pathname;

    if (pathname==='/a.html') {
        res.writeHead(200, {
            "Content-Type": "text/plain;charset=utf-8"
                //"Access-Control-Allow-Origin": "http://localhost"
        });
        res.write("哈哈哈哈哈!");
    }


    if (pathname==='/wechat.html') {
        var arg = url.parse(req.url).query,
        	argArray=querystring.parse(arg);
        var b = isLegel(argArray.signature,argArray.timestamp,argArray.nonce);
        if(b){
        	res.write(argArray.echostr);
        }
    }


    res.end();
});
server.listen(80, "localhost", function() {
    console.log("开始监听...");
});

