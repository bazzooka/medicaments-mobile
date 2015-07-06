import NavBar from '../components/NavBar.js';

class Page {
	 constructor(options){
 		this.id = options.id;
 		this.isDefault = options.isDefault; 
	 }

	 init(){

	 }

 	render(isDefault){
		var pageFrag = document.createDocumentFragment();
		this.pageElem = document.createElement('div');
		this.pageElem.id = "home-page";
		this.pageElem.className += "page home-page" + (isDefault ? " current" : "");

		// Create NavBar
		

		pageFrag.appendChild(this.pageElem); 
		return pageFrag;
	}
}

module.exports = Page;  