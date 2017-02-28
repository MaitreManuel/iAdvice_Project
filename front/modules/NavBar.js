var React = require("react");

import NavLink from './NavLink'

var NavBar = React.createClass({
    render: function () {
        return (
            <aside id="NavBar">
                <div id="sidebar"  className="nav-collapse ">
                    <ul className="sidebar-menu" id="nav-accordion" role="nav">

                        <p className="centered"><a href="https://github.com/MaitreManuel" target="_blank"><img src="/assets/img/me.jpg" className="img-circle" width="60"/></a></p>
                        <h5 className="centered">Trystan Eveno</h5>

                        <li className="mt">
                            <NavLink to="/api/posts">
                                <i className="fa fa-comment-o"></i>
                                <span>Posts</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </aside>
        );
    }
});

module.exports = NavBar;
