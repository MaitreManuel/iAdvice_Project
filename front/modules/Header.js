var React = require("react");

var Header = React.createClass({
    toggle: function () {
        if ($('#sidebar > ul').is(":visible") === true) {
            $('#main-content').css({
                'margin-left': '0px'
            });
            $('#sidebar').css({
                'margin-left': '-210px'
            });
            $('#sidebar > ul').hide("slow");
            $("#container").addClass("sidebar-closed");
        } else {
            $('#main-content').css({
                'margin-left': '210px'
            });
            $('#sidebar > ul').show("slow");
            $('#sidebar').css({
                'margin-left': '0'
            });
            $("#container").removeClass("sidebar-closed");
        }
    },

    render: function () {
        return (
            <header id="Header" className="header black-bg">
                <div className="sidebar-toggle-box">
                    <div className="fa fa-bars tooltips" onClick={this.toggle} data-placement="right" data-original-title="Toggle Navigation"></div>
                </div>
                <a href="index.html" className="logo"><b>Get VDM</b></a>
            </header>
        );
    }
});

module.exports = Header;
