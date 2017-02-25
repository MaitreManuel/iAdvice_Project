var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');

var allPost = [];
var nbPost = 200;
var nbPage = 22;

console.log("Start extracting VDM");
module.export = {
    //we need a recursive function due to asynchronus work of JavaScript
    extract: (function findAllPosts(i) {
        request('http://www.viedemerde.fr/?page='+ i, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                var month = {
                    'janvier': '01',
                    'février': '02',
                    'mars': '03',
                    'avril': '04',
                    'mai': '05',
                    'juin': '06',
                    'juillet': '07',
                    'août': '08',
                    'septembre': '09',
                    'octobre': '10',
                    'novembre': '11',
                    'décembre': '12'
                };

                //see archi.html to see structure of one post
                $('.art-panel.col-xs-12').each(function(i, element) {
                    var tmp,
                        isAuthor = false,
                        isDate = false,
                        isMessage = false,
                        author = element.children[1].children[1].children[5],
                        date = element.children[1].children[1].children[5],
                        message = element.children[1].children[1].children[3].children[1].children[1];

                    if(author && date && message) {
                        if((author.type == 'tag' && author.name == 'div') && (date.type == 'tag' && date.name == 'div')) {
                            if(date.children[2]) {
                                if(date.children[2].type == 'text') {
                                    date = date.children[2].data;
                                    date = date.replace(' /\n', '');
                                    date = date.replace(' /\n', ' ');
                                    date = date.split(' ');
                                    date[2] = month[date[2]];
                                    date = date[3] +'-'+ date[2] +'-'+ date[1] +' '+ date[4] +':00';
                                    isDate = true;
                                }
                                if(author.children[0].type == 'text') {
                                    author = author.children[0].data;
                                    author = author.replace('Par ', '');
                                    author = author.replace(' - ', '');
                                    author = author.replace('\n', '');
                                    isAuthor = true;
                                }
                            } else {
                                tmp = author.children[0].data;
                                tmp = tmp.split('/');
                                author = tmp[0];
                                author = author.replace('Par ', '');
                                author = author.replace('\n', '');
                                date = tmp[1];
                                date = date.replace(' /\n', '');
                                date = date.replace(' /\n', ' ');
                                date = date.split(' ');
                                date[2] = month[date[2]];
                                date = date[3] +'-'+ date[2] +'-'+ date[1] +' '+ date[4] +':00';
                                date = date.replace('\n', '');
                                isDate = true;
                                isAuthor = true;
                            }
                        }
                        if((message.type == 'tag' && message.name == 'a')) {
                            if(message.children[0].type == 'text') {
                                message = message.children[0].data;
                                isMessage = true;
                            }
                        }
                    }
                    if(isAuthor && isDate && isMessage) {
                        var post = {
                            "id": allPost.length + 1,
                            "content": message,
                            "date": date,
                            "author": author
                        };

                        allPost.push(post);
                    }
                });
            } else {
                console.log('** ERROR **\n'+ error +"\n");
            }

            console.log("Page", i, allPost.length, "extracted posts");
            i += 1;

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
    })(1)
};
