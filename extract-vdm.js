var request = require('request');
var cheerio = require('cheerio');


/****************************************************
*  We need the last 200 posts of www.viedemerde.fr. *
*  We can get only 13 posts per page, in Euclidean  *
*  division, 200 / 13 = 15 with a remainder of 5.   *
*  So we take 16 pages and we take off 13 - 5 = 8   *
*  posts at the last page to obtain the good number *
*  of posts.                                        *
*  We start to page 1 to 16 and don't get the page  *
*  0 be cause it's not the same page compared to    *
*  others.                                          *
****************************************************/

var allPost = [];
var nbPost = 200;
var nbPage = 16;
var nbPostPerPage = 13;

for(var i = 0; i < nbPage; i++) {
    request('http://www.viedemerde.fr/?page='+ i +'#top', function (error, response, html) {
        if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
            //the text is in a tag with a class <a class="fmllink"> in the HTML page
            $('a.fmllink').each(function(i, element) {
                var a = $(this);
                var p = a.parent().parent();
                var divCF = p.next();
                var divDate = divCF.next();
                var pDate = divDate.attribs;

                var content = element.children[0].data;

                var post = {};

                console.log(content +"\n");
            });
        } else {
            console.log('** ERROR **\n', error);
        }
    });
}
