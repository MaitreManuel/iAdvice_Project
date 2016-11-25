var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');


/*****************************************************
*  We need the last 200 posts of www.viedemerde.fr.  *
*  We can get around 12 posts per page, in Euclidean *
*  division, 200 / 12 = 16 with a remainder of 8.    *
*  So we take 16 pages and after we can take off     *
*  posts (ex: 208 - (208 - 200) = 200)               *
*  We start to page 1 to 16 and don't get the page   *
*  0 because it's not the same page compared to      *
*  others.                                           *
*****************************************************/

var allPost = [];
var nbPost = 200;
var nbPage = 17;

//we need a recursive function due to asynchronus work of JavaScript
(function findAllPosts(i) {
    request('http://www.viedemerde.fr/?page='+ i +'#top', function (error, response, html) {
        if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
            //the text is in a tag with a class <a class="fmllink"> in the HTML page
            $('a.fmllink').each(function(i, element) {
                //sometimes, there is a random post with a picture to make a
                //word game, the date format is different, so we need to check
                //if the attribute href of the tag <a class="fmllink">
                //contains "photo", and exclude the post
                if(this.attribs.href.substring(1, 6) !== 'photo') {
                    //text of VDM post
                    var content = element.children[0].data;
                    //string where there are author and date of a VDM post
                    //this = <a class="fmllink">
                    //Output: Anonymous  / 04/07/2015 à 08:25 / Japon (Tokyo)
                    var getDateAndAuthor = $(this).parent().next().next().children().next().text();
                    //take off the start of the string we don't use
                    getDateAndAuthor = getDateAndAuthor.replace('Vécue par ', '');
                    //we split the string
                    //Output: [ 'Anonymous ', '04/07/2015 à 08:25', 'Japon (Tokyo)' ]
                    getDateAndAuthor = getDateAndAuthor.split(' / ');
                    //now we can extract the date and the author
                    var author = getDateAndAuthor[0];
                    var date = getDateAndAuthor[1];
                    //we take off the space at the end of an author (sometimes there is one)
                    if(author[author.length - 1] === ' ') {
                        author = author.substring(0, author.length - 1);
                    }
                    // console.log(date, author);
                    //now we need to format the date like this: "YYYY-MM-DD HH:MM:SS
                    // we can take off the part of the string " à ", 2 * "/" and ":"
                    date = date.replace(' à ', '');
                    date = date.replace('/', '');
                    date = date.replace('/', '');
                    date = date.replace(':', '');
                    //now we slice piece by piece and reassemble each part
                    var dd = date.substring(0, 2);
                    var mm = date.substring(2, 4);
                    var yyyy = date.substring(4, 8);
                    var hh = date.substring(8, 10);
                    var min = date.substring(10, 12);
                    var ss = '00';
                    date = yyyy +'-'+ mm +'-'+ dd +' '+ hh +':'+ min +':'+ ss;

                    var post = {
                        content: content,
                        date: date,
                        author: author
                    };

                    allPost.push(post);
                }
            });
        } else {
            console.log('** ERROR **\n'+ error +"\n");
        }

        console.log(i, allPost.length);
        i += 1;

        if(i <= nbPage) {
            findAllPosts(i);
        } else {
            console.log(allPost.length);
        }
    });
})(1)
