import React from 'react';
import Sidebar from 'react-sidebar';

var App = React.createClass({
    getInitialState: function() {
        return {sidebarOpen: false};
    },

    onSetSidebarOpen: function(open) {
        this.setState({sidebarOpen: open});
    },

    render : function(){
        var sidebarContent = <b>Sidebar content</b>;

        return (
            <Sidebar sidebar={sidebarContent}
                     open={this.state.sidebarOpen}
                     onSetOpen={this.onSetSidebarOpen}>
                <b>Main content</b>
            </Sidebar>
        );
    }
});

React.render(<App />, document.getElementById('master-container'));


