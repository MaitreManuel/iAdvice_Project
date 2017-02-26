var React = require("react");

var Header = require("./Header.js");
var NavBar = require("./NavBar.js");

var Home = React.createClass({
    render: function () {
        return (
            <div id="Home">
                <Header />
                <NavBar />
            </div>
        );
    }
});

module.exports = Home;
