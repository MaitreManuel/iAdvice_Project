var request = require('request');
var htmlparser = require("htmlparser2");

var parser = new htmlparser.Parser({
    onopentag: function(name, attribs){
        if(name === "a" && attribs.class === "fmllink"){
            console.log("Une quote !", name);
        }
    },
    ontext: function(text){
      console.log("-->", text);
    },
    onclosetag: function(tagname){
        if(tagname === "div"){
            console.log("That's it?!");
        }
    }
}, {decodeEntities: true});

request('http://viedemerde.fr', function (error, response, body) {
    if(error){
        return console.log('Error:', error);
    } else if(response.statusCode !== 200){
        return console.log('Invalid Status Code Returned:', response.statusCode);
    } else {
      // console.log(body);
      parser.write(body);
      parser.end();
    }
});
