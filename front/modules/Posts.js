var React = require("react");

var Posts = React.createClass({
    getInitialState: function() {
        return { posts: [] };
    },

    componentDidMount: function() {
        this.getPosts();
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
                                <div className="row">
                                    <div className="col-sm-6 col-xs-6">
                                        <p>{author}</p>
                                    </div>
                                    <div className="col-sm-6 col-xs-6 goright">
                                        <p>{date}</p>
                                    </div>
                                </div>
                            </div>
                            <h5 style={{marginLeft: 10 +'px'}}> {id}</h5>
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
            <div>
                {posts}
            </div>
        );
    }
});

module.exports = Posts;
