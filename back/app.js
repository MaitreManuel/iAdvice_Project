var fs = require('fs');
var path = require('path');
var express = require('express');
var getvdm = require('./get-vdm');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
    res.status(200).send('Server On');
});

app.get('/api/posts', function(req, res){
    var obj = JSON.parse(fs.readFileSync('./store/vdm.json', 'utf8'));

    if(Object.keys(req.query).length === 0) {
        res.sendFile(path.normalize(__dirname +'/store/vdm.json'));
    } else {
        var postFind = [],
            author = req.query.author,
            From = req.query.from,
            to = req.query.to;

        if(author) {
            obj.posts.forEach(function(element) {
                if(author === element.author) {
                    postFind.push(element);
                }
            });
        } else if(From && to) {
            var dateFrom = new Date(req.query.from).valueOf(),
                dateTo   = new Date(req.query.to).valueOf();

            if(dateFrom < dateTo) {
                obj.posts.forEach(function(element) {
                    var dateElem = new Date(element.date).valueOf();

                    if(dateElem >= dateFrom && dateElem <= dateTo) {
                        postFind.push(element);
                    }
                });
            } else {
                console.log('* ERROR * - Parameter date-from is after date-to');
            }
        } else if(From && !to) {
            var dateFrom = new Date(req.query.from).valueOf();

            obj.posts.forEach(function(element) {
                var dateElem = new Date(element.date).valueOf();

                if(dateElem >= dateFrom) {
                    postFind.push(element);
                }
            });
        }
        if(postFind.length < 1) {
            res.status(400).send("Error: no matches, maybe you ask something that doesn't exist");
        } else {
            res.status(200).send(postFind);
        }
    }
});

app.get('/api/posts/:id', function (req, res) {
    var obj = JSON.parse(fs.readFileSync('./store/vdm.json', 'utf8'));

    var id = req.params.id,
        postFind = [];

    obj.posts.forEach(function(element) {
        if(id == element.id) {
            postFind.push(element);
        }
    });

    res.send(postFind);
});

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Server listening port 3000 Go to http://localhost:3000');
});

module.exports = server;
