class FavoritePage {
	constructor(options){
		// console.log("Construct home page");

		// document.getElementById('home-page').innerHTML = "HOMEPAGE";
	}

	show(){
		console.log("Show Favorite");
	}

	render(){
		var pageFrag = document.createDocumentFragment();
		var pageElem = document.createElement('div');
		pageElem.id = "favorite-page";
		pageElem.className += "page favorite-page";

		pageElem.innerHTML = "RENDERED FAVORITE TEMPLATE AS STRING";

		pageFrag.appendChild(pageElem);

		return pageFrag;
	}
};


module.exports = FavoritePage;