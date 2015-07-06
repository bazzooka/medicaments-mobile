import Page from '../components/Page.js';

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

	// render(isDefault){
	// 	var pageFrag = document.createDocumentFragment();
	// 	var pageElem = document.createElement('div');
	// 	pageElem.id = "home-page";
	// 	pageElem.className += "page home-page" + (isDefault ? " current" : "");


	// 	for(var i = 0; i < 1000; i++){
	// 		pageElem.innerHTML += "RENDERED HOME TEMPLATE AS STRING";	
	// 	}
		

	// 	pageFrag.appendChild(pageElem);

	// 	return pageFrag;
	// }
};


module.exports = HomePage;