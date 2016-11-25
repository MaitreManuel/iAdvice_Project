var fs = require('fs');
var path = require('path');
var express = require('express');
var getvdm = require('./get-vdm');
var app = express();

var obj = JSON.parse(fs.readFileSync('./store/vdm.json', 'utf8'));

app.get('/', function (req, res) {
    res.status(200).send('Server ok **** Go to http://localhost:3000/api/posts');
});

app.get('/api/posts', function(req, res){
    if(Object.keys(req.query).length === 0) {
        res.sendFile(path.normalize(__dirname +'/store/vdm.json'));
    } else {
        if(req.query.author.length > 0) {
            obj.posts.forEach(function(element) {
                if(req.query.author === element.author) {
                    res.send(element);
                }
            });
        }
    }
});

var server = app.listen(3000, function () {
    var port = server.address().port;
});

module.exports = server;
