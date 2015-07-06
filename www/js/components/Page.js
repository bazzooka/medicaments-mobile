class Page {
	 constructor(options){
 		this.id = options.id;
 		this.isDefault = options.isDefault; 
	 }

 	render(isDefault){
		var pageFrag = document.createDocumentFragment();
		this.pageElem = document.createElement('div');
		this.pageElem.id = "home-page";
		this.pageElem.className += "page home-page" + (isDefault ? " current" : "");


		// for(var i = 0; i < 1000; i++){
		// 	pageElem.innerHTML += "RENDERED HOME TEMPLATE AS STRING";	
		// }
		

		pageFrag.appendChild(this.pageElem); 
		return pageFrag;
	}
}

module.exports = Page;  