import React from 'react';
import Router from 'react-router';
import Sidebar from 'react-sidebar';
import SidebarContent from './components/SidebarContent.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

import HomePage from './HomePage.jsx';

let Route = Router.Route,
    RouteHandler = Router.RouteHandler;

var App = React.createClass({
    mixins: [ Router.State ],

    getInitialState() {
        return {docked: false, open: false};
        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    },

    toggleOpen(ev) {
        this.setState({open: !this.state.open});

        if (ev) {
            ev.preventDefault();
        }
    },

    onSetOpen(open) {
        this.setState({open: open});
    },

    componentDidMount() {
        let mql = window.matchMedia(`(min-width: 800px)`);
        mql.addListener(this.mediaQueryChanged);
        this.setState({mql: mql, docked: mql.matches});
    },

    componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
    },

    mediaQueryChanged() {
        this.setState({docked: this.state.mql.matches});
    },

    onMenuClick(menuItem){
        if(this.getPathname() !== menuItem.href){
            // TODO transition
            this.setState({open:false});
        }
    },

    render : function(){
        let sidebar = <SidebarContent onMenuClick={this.onMenuClick}/>;

        const styles = {
            contentHeaderMenuLink: {
                textDecoration: 'none',
                color: 'white',
                padding: 8
            }
        };

        let contentHeader = (
            <span>
                {!this.state.docked &&
                <a onClick={this.toggleOpen} href='#' style={styles.contentHeaderMenuLink}>====</a>} <span>MEDICAMENTS 2.0</span>
      </span>);
        let sidebarProps = {
            sidebar: sidebar,
            docked: this.state.docked,
            open: this.state.open,
            onSetOpen: this.onSetOpen,
            touch: true
        };

        return (
            <Sidebar {...sidebarProps}>
                {contentHeader}
                <div>
                    <RouteHandler/>
                </div>
                <div style={{"position":"absolute", "bottom": 0, "right": 0,"background": "black", "color": "white"}} id="debugger">DEBUGGER</div>
            </Sidebar>
        )
    }
});



var FavoritePage = React.createClass({
    render () {
        return (
            <div>
                <h1>FavoritePage</h1>
                <RouteHandler/>
            </div>
        )
    }
});

var AboutPage = React.createClass({
    render () {
        return (
            <div>
                <h1>AboutPage</h1>
                <RouteHandler/>
            </div>
        )
    }
});

// declare our routes and their hierarchy
var routes = (
    <Route handler={App}>
        <Route path="/"             handler={HomePage}/>
        <Route path="/favoris"      handler={FavoritePage}/>
        <Route path="/about"        handler={AboutPage}/>
    </Route>
);

Router.run(routes, function(Handler) {
    React.render(<Handler />, document.getElementById('master-container'));
});
