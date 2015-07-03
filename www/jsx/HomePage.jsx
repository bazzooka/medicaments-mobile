import React from 'react';
import Router from 'react-router';
import TouchEvents from './components/TouchEvents.js';
import $ from 'jquery';

var RouteHandler = Router.RouteHandler;

var HomePage = React.createClass({

    getInitialState: function(){
        return {responses: []};
    },

    getMedicamentStartWith: function(pattern){
        var me = this;
        $.ajax({
            url: "http://localhost:3000/getMedicLike/"+ pattern,
            method: "GET",
            success: function(response){
                console.log(response);
                me.setState({responses: response});
            }, error: function(err){
                console.log(err);
            }
        });
    },

    componentDidMount: function(){
        document.getElementById('search-input').addEventListener("input", function(e){
            var medicPattern = e.currentTarget.value;

            if(medicPattern.length > 3){
                console.log(medicPattern);
                this.getMedicamentStartWith(medicPattern);
            }
        }.bind(this));
    },

    render () {
        var medics = [];
        for(let i = 0, l = entries.length; i < l; i++) {
            medics.push(
                <Link className="" to="" dangerouslySetInnerHTML={{__html:entries[i].title}} onClick={() => this.props.onMenuClick(entries[i])}></Link>
            )
        }
        return (
            <div className="homePage">
                <div className="search-container">
                    <input type="text" id="search-input"/>
                    <div className="search-button" id="search-button">O</div>
                </div>
                <div className="result-container">

                </div>
                <RouteHandler/>
            </div>
        )
    }
});

module.exports = HomePage;