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
var nbPage = 16;

console.log("Start extracting VDM");
module.export = {
    //we need a recursive function due to asynchronus work of JavaScript
    extract: (function findAllPosts(i) {
        request('http://www.viedemerde.fr/?page='+ i +'#top', function (error, response, html) {
            if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
                //the text is in a tag with a class <a class="fmllink"> in the HTML page
                $('a.fmllink').each(function(i, element) {
                    //string where there are author and date of a VDM post
                    //this = <a class="fmllink">
                    //Output: Anonymous  / 04/07/2015 à 08:25 / Japon (Tokyo)
                    var getDateAndAuthor = $(this).parent().next().next().children().next().text();
                    //sometimes, there is a random post with a picture to make a
                    //word game or a post about a famous people, the datas format
                    //is different, so we need to check if the attribute href of
                    //the tag <a class="fmllink">, contains "photo", or an
                    //empty date and/or author, and exclude the post
                    if(this.attribs.href.substring(1, 6) !== 'photo' && getDateAndAuthor.length > 0) {
                        //text of VDM post
                        var content = element.children[0].data;
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
                            "id": allPost.length + 1,
                            "content": content,
                            "date": date,
                            "author": author
                        };

                        allPost.push(post);
                    }
                });
            } else {
                console.log('** ERROR **\n'+ error +"\n");
            }

            i += 1;
            console.log("Page", i, allPost.length, "extracted posts");

            if(i <= nbPage) {
                findAllPosts(i);
            } else {
                //we delete all post after index 199 to get 200 posts
                var nbPostToRemove = allPost.length - nbPost;
                allPost.splice(nbPost, nbPostToRemove);
                console.log("Number of post reduce to", allPost.length);
                //we create the futur output to a JSON file
                var toJsonAllPost = {
                    "posts": allPost,
                    "count": allPost.length
                };
                //we create a JSON file to store all datas
                fs.writeFile('./store/vdm.json', JSON.stringify(toJsonAllPost, null, 4), function(err){
                    console.log('File successfully written! - Check your project directory for the ./store/vdm.json file');
                    console.log('End extracting VDM');
                });
            }
        });
    })(0)
};
