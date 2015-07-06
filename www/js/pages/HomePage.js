import Page from '../components/Page.js';
import NavBar from '../components/NavBar.js';

class HomePage extends Page{
	constructor(options){
		super(options);
	}

	show(){
		console.log("Show Home"); 
	}

	render(isDefault){
		var frag = super.render(isDefault);

		for(var i = 0; i < 1000; i++){
			this.pageElem.innerHTML += "RENDERED HOME TEMPLATE AS STRING";	
		}

		return frag;

	}

};


module.exports = HomePage;