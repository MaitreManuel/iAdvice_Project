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
        var postFind = [];

        if(req.query.author.length > 0) {
            obj.posts.forEach(function(element) {
                if(req.query.author === element.author) {
                    postFind.push(element);
                }
            });
        } //else if(req.query.from.length > 0 && req.query.to.length > 0) {
            // var dateFrom = new Date(req.query.from).valueOf(),
            //     dateTo   = new Date(req.query.to).valueOf();
            //
            // console.log(req.query.from);
            // console.log(req.query.to);
            // obj.posts.forEach(function(element) {
            //     // if(element.date.substring(0, 10) > dateFrom) {
            //     //     postFind.push(element);
            //     // }
            //     console.log(element.date.substring(0, 9));
            // });
        // }
        res.send(postFind);
    }
});

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Server listening port 3000 Go to http://localhost:3000');
});

module.exports = server;
