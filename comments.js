// Create web server
// NodeJS: http://nodejs.org/docs/v0.4.12/api/http.html
// HTTP:  http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol

var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');

var comments = [];
var server = http.createServer(function (req, res) {
    var path = url.parse(req.url).pathname;
    console.log(path);
    if (req.method == 'POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            var POST = qs.parse(body);
            comments.push(POST.comment);
            console.log(POST.comment);
        });
    }
    if (path == '/get') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify(comments));
    } else {
        fs.readFile(__dirname + path, function (err, data) {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200);
            res.end(data);
        });
    }
});
server.listen(8000);
console.log('Server running at http://')