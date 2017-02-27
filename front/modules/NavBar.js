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
                        <li className="mt">
                            <span><i className="fa fa-search"></i> Rechercher :</span>
                        </li>
                        <li className="mt">
                            <div className="col-sm-12">
                                <input type="text" placeholder="id" className="form-control round-form"/>
                                <button type="submit" className="btn btn-theme round-form search"><i className="fa fa-search"></i></button>
                            </div>
                        </li>
                        <li className="mt centered">
                            <div className="col-sm-12">
                                <span>ou</span>
                            </div>
                        </li>
                        <li className="mt">
                            <div className="col-sm-12">
                                <input type="text" placeholder="Auteur" className="form-control round-form"/>
                                <button type="submit" className="btn btn-theme round-form search"><i className="fa fa-search"></i></button>
                            </div>
                        </li>
                    </ul>
                </div>
            </aside>
        );
    }
});

module.exports = NavBar;
