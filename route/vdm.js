var _ = require('lodash');
var path = require("path");

try {
    var posts = require('../store/vdm.json');
} catch (e) {
    if(!(typeof global.it === 'function')) {
        console.log('No post founds, run node get-vdm.js before');
    }
    var posts = [];
}

module.exports = {
    //display post with specify author
    post: function(req, res) {
        
    }
};
