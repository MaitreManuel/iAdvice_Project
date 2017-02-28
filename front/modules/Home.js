var React = require("react");

var Header = require("./Header.js");
var NavBar = require("./NavBar.js");
var Posts = require("./Posts.js");

var Home = React.createClass({
    render: function () {
        return (
            <div id="Home">
                <Header />
                <NavBar />
                <section id="main-content">
                    <section className="wrapper site-min-height">
                        <h3><i className="fa fa-comment-o"></i> Posts</h3>
                        <div className="row mt">
                            <Posts />
                        </div>
                    </section>
                </section>
            </div>
        );
    }
});

module.exports = Home;
