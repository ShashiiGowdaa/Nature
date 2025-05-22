"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var fs = require("fs");
var hostname = '127.0.0.1';
var port = 5000;
var server = http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }
    if (req.method === 'GET' && req.url === '/feedback') {
        fs.readFile('feedback.json', 'utf8', function (err, data) {
            if (err) {
                res.statusCode = 500;
                res.end(JSON.stringify({ message: 'Error reading data' }));
                return;
            }
            try {
                var feedback = data ? JSON.parse(data) : [];
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(feedback));
            }
            catch (parseError) {
                res.statusCode = 500;
                res.end(JSON.stringify({ message: 'Error parsing data' }));
            }
        });
        return;
    }
    if (req.method === 'POST' && req.url === '/feedback') {
        var body_1 = '';
        req.on('data', function (chunk) {
            body_1 += chunk.toString();
        });
        req.on('end', function () {
            fs.readFile('feedback.json', 'utf8', function (err, data) {
                var feedback = [];
                if (!err && data) {
                    try {
                        feedback = JSON.parse(data);
                    }
                    catch (parseError) {
                        feedback = [];
                    }
                }
                var newFeedback = JSON.parse(body_1);
                feedback.push(newFeedback);
                fs.writeFile('feedback.json', JSON.stringify(feedback, null, 2), function (err) {
                    if (err) {
                        res.statusCode = 500;
                        res.end(JSON.stringify({ message: 'Error saving data' }));
                        return;
                    }
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Feedback saved successfully', data: newFeedback }));
                });
            });
        });
        return;
    }
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Not Found' }));
});
server.listen(port, hostname, function () {
    console.log("Server running at http://".concat(hostname, ":").concat(port, "/feedback"));
});
