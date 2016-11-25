var fs = require('fs');
// var _ = require('lodash');
var path = require("path");
var express = require('express');
var getvdm = require('./get-vdm');
var app = express();


app.get('/', function (req, res) {
    res.write('<!DOCTYPE html>'+
    '<html>'+
    '    <head>'+
    '        <meta charset="utf-8" />'+
    '        <title>View VDM</title>'+
    '    </head>'+
    '    <body>'+
    '       <ul>'+
    '            <li><a href="http://localhost:3000/api/posts" target="_blank">/api/posts</li>'+
    '       </ul>'+
    '    </body>'+
    '</html>'
    );
});

app.get('/api/posts', function(req, res){
    res.sendFile(path.normalize(__dirname +'/store/vdm.json'));
});

app.listen(3000);
console.log("\n*** GO TO http://localhost:3000 ON YOUR WEBROWSER ***\n");
