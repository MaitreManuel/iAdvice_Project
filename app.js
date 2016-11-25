var fs = require('fs');
var path = require('path');
var express = require('express');
var getvdm = require('./get-vdm');
var app = express();


app.get('/', function (req, res) {
    res.status(200).send('Server ok **** Go to http://localhost:3000/api/posts');
});

app.get('/api/posts', function(req, res){
    res.sendFile(path.normalize(__dirname +'/store/vdm.json'));
});

var server = app.listen(3000, function () {
    var port = server.address().port;
});

module.exports = server;
