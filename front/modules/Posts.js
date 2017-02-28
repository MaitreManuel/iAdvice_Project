var React = require("react");

var Posts = React.createClass({
    getInitialState: function() {
        return { posts: [], id: 1, author: "", From: 0, to: 0 };
    },

    updateID: function (event) {
        var id = this.state.postID;
        id = event.target.value;
        this.setState({postID: id});
    },

    updateAuthor: function (event) {
        var author = this.state.author;
        author = event.target.value;
        this.setState({author: author});
    },

    updateFrom: function (event) {
        var From = this.state.From;
        From = event.target.value;
        this.setState({From: From});
    },

    updateTo: function (event) {
        var to = this.state.to;
        to = event.target.value;
        this.setState({to: to});
    },

    clearInput: function () {
        document.getElementsByTagName("input").innerHTML = "";
    },

    componentDidMount: function() {
        this.getPosts();
    },

    getByID: function () {
        var me = this,
            id = this.state.postID;

        if(id > 200) {
            id = 200;
        } else if(id < 1) {
            id = 1;
        }

        fetch('http://localhost:3000/api/posts/'+ id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((result) => result.json())
        .then(function (result) {
            var posts = [],
                id = result[0].id,
                date = result[0].date,
                author = result[0].author,
                message = result[0].content;

            if(!message) {
                message = "Error: no content";
            }

            posts.push(
                <div className="col-lg-12 col-md-12 col-sm-12 mb" key={'postID12'}>
                    <div className="weather-2 pn">
                        <div className="weather-2-header">
                            <div className="row" style={{marginTop: 5 +'px'}}>
                                <div className="col-sm-6 col-xs-6">
                                    <p>{author}</p>
                                </div>
                                <div className="col-sm-6 col-xs-6 goright">
                                    <p>{date}</p>
                                </div>
                            </div>
                        </div>
                        <h5 style={{marginLeft: 10 +'px'}}>ID: {id}</h5>
                        <div className="row data">
                            <div className="col-sm-12 col-xs-12 goleft">
                                {message}
                            </div>
                        </div>
                    </div>
                </div>
            );
            me.setState({posts: posts});
        }).catch(function (err) {
            console.log(err);
        });
    },

    getByAuthor: function () {
        var me = this,
            author = this.state.author;

        fetch('http://localhost:3000/api/posts?author='+ author, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((result) => result.json())
        .then(function (result) {
            var posts = [];

            for(var i = 0; i < result.length; i++) {
                var id = result[i].id,
                    date = result[i].date,
                    author = result[i].author,
                    message = result[i].content;

                if(!message) {
                    message = "Error: no content";
                }

                posts.push(
                    <div className="col-lg-6 col-md-6 col-sm-6 mb" key={'post'+ i}>
                        <div className="weather-2 pn">
                            <div className="weather-2-header">
                                <div className="row" style={{marginTop: 5 +'px'}}>
                                    <div className="col-sm-6 col-xs-6">
                                        <p>{author}</p>
                                    </div>
                                    <div className="col-sm-6 col-xs-6 goright">
                                        <p>{date}</p>
                                    </div>
                                </div>
                            </div>
                            <h5 style={{marginLeft: 10 +'px'}}>ID: {id}</h5>
                            <div className="row data">
                                <div className="col-sm-12 col-xs-12 goleft">
                                    {message}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
            me.setState({posts: posts});
        }).catch(function (err) {
            console.log(err);
        });
    },

    getByDate: function () {
        var me = this,
            From = this.state.From,
            to = this.state.to,
            url = 'http://localhost:3000/api/posts?from='+ From;

        if(to && From) {
            url = 'http://localhost:3000/api/posts?from='+ From +'&to='+ to;
        }
        if(!From) {
            From = to;
            url = 'http://localhost:3000/api/posts?from='+ From;
        }

        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((result) => result.json())
        .then(function (result) {
            var posts = [];

            for(var i = 0; i < result.length; i++) {
                var id = result[i].id,
                    date = result[i].date,
                    author = result[i].author,
                    message = result[i].content;

                if(!message) {
                    message = "Error: no content";
                }

                posts.push(
                    <div className="col-lg-6 col-md-6 col-sm-6 mb" key={'post'+ i}>
                        <div className="weather-2 pn">
                            <div className="weather-2-header">
                                <div className="row" style={{marginTop: 5 +'px'}}>
                                    <div className="col-sm-6 col-xs-6">
                                        <p>{author}</p>
                                    </div>
                                    <div className="col-sm-6 col-xs-6 goright">
                                        <p>{date}</p>
                                    </div>
                                </div>
                            </div>
                            <h5 style={{marginLeft: 10 +'px'}}>ID: {id}</h5>
                            <div className="row data">
                                <div className="col-sm-12 col-xs-12 goleft">
                                    {message}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
            me.setState({posts: posts});
        }).catch(function (err) {
            console.log(err);
        });
    },

    getPosts: function () {
        var me = this;

        fetch('http://localhost:3000/api/posts', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((result) => result.json())
        .then(function (result) {
            var posts = [];

            for(var i = 0; i < result.posts.length; i++) {
                var id = result.posts[i].id,
                    date = result.posts[i].date,
                    author = result.posts[i].author,
                    message = result.posts[i].content;

                if(!message) {
                    message = "Error: no content";
                }

                posts.push(
                    <div className="col-lg-6 col-md-6 col-sm-6 mb" key={'post'+ i}>
                        <div className="weather-2 pn">
                            <div className="weather-2-header">
                                <div className="row" style={{marginTop: 5 +'px'}}>
                                    <div className="col-sm-6 col-xs-6">
                                        <p>{author}</p>
                                    </div>
                                    <div className="col-sm-6 col-xs-6 goright">
                                        <p>{date}</p>
                                    </div>
                                </div>
                            </div>
                            <h5 style={{marginLeft: 10 +'px'}}>ID: {id}</h5>
                            <div className="row data">
                                <div className="col-sm-12 col-xs-12 goleft">
                                    {message}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
            me.setState({posts: posts});
        }).catch(function (err) {
            console.log(err);
        });
    },

    render: function () {
        var posts = this.state.posts;

        return (
            <div id="Posts">
                <div>
                    <div className="col-lg-12 col-md-12 col-sm-12 mb">
                        <div className="col-sm-6">
                            <input name="id" type="number" placeholder="id" onFocus={this.clearInput} onInput={this.updateID} className="form-control round-form"/>
                            <button type="submit" onClick={this.getByID} className="btn btn-theme round-form search"><i className="fa fa-search"></i></button>
                        </div>
                        <div className="col-sm-6">
                            <input name="author" type="text" placeholder="Auteur" onFocus={this.clearInput} onInput={this.updateAuthor} className="form-control round-form"/>
                            <button type="submit" onClick={this.getByAuthor} className="btn btn-theme round-form search"><i className="fa fa-search"></i></button>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="col-lg-12 col-md-12 col-sm-12 mb">
                        <div className="col-sm-6">
                            <span>Depuis</span>
                            <input name="from" type="date" placeholder="yyyy-mm-dd" onInput={this.updateFrom} className="form-control round-form"/>
                        </div>
                        <div className="col-sm-6">
                            <span>Jusqu&#39;à</span>
                        </div>
                        <div className="col-sm-6">
                            <input name="to" type="date" placeholder="yyyy-mm-dd" onInput={this.updateTo} className="form-control round-form" style={{paddingRight: 40 +'px'}}/>
                            <button type="submit" onClick={this.getByDate} className="btn btn-theme round-form search"><i className="fa fa-search"></i></button>
                        </div>
                    </div>
                </div>
                <button type="submit" onClick={this.getPosts} className="btn btn-theme" style={{marginLeft: 30 +"px"}}>Recharger tous les messages</button>
                <div className="wrapper">
                    {posts}
                </div>
            </div>
        );
    }
});

module.exports = Posts;
