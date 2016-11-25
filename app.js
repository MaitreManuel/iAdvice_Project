var fs          = require('fs');
var path        = require("path");
var express     = require('express');
var extractvdm  = require('./extract-vdm');

var app = express();

function readJSONFile(filename, callback) {
  fs.readFile(filename, function (err, data) {
    if(err) {
      callback(err);
      return;
    }
    try {
      callback(null, JSON.parse(data));
    } catch(exception) {
      callback(exception);
    }
  });
}

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
    '            <li><a href="#"></li>'+
    '            <li><a href="#"></li>'+
    '            <li><a href="#"></li>'+
    '       </ul>'+
    '    </body>'+
    '</html>'
    );
});

app.get('/api/posts', function(req, res){
    res.sendFile(path.normalize(__dirname +'/output.json'));
});

app.listen(3000);
console.log("\n*** GO TO localhost:3000 ON YOUR WEBROWSER ***\n");
