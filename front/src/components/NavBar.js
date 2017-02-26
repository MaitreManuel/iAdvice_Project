var React = require("react");

var NavBar = React.createClass({
    render: function () {
        return (
            <aside id="NavBar">
                <div id="sidebar"  className="nav-collapse ">
                    <ul className="sidebar-menu" id="nav-accordion">

                        <p className="centered"><a href="https://github.com/MaitreManuel"><img src="assets/img/me.jpg" className="img-circle" width="60"/></a></p>
                        <h5 className="centered">Trystan Eveno</h5>

                        <li className="mt">
                            <a className="active" href="index.html">
                                <i className="fa fa-dashboard"></i>
                                <span>Dashboard</span>
                            </a>
                        </li>

                        <li className="sub-menu">
                            <a href="javascript:;" >
                                <i className="fa fa-desktop"></i>
                                <span>UI Elements</span>
                            </a>
                            <ul className="sub">
                                <li><a  href="general.html">General</a></li>
                                <li><a  href="buttons.html">Buttons</a></li>
                                <li><a  href="panels.html">Panels</a></li>
                            </ul>
                        </li>

                    </ul>
                </div>
            </aside>
        );
    }
});

module.exports = NavBar;
