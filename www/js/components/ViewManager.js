var director = require('director');
var Router = director.Router;

 
class ViewManager {
	/**
	 * options.pages = [page...]
	 */
	constructor(options){
		console.log("View Panager ");
		this.currentPage = "";
		this.containerId = options.containerId || "master-container";
		this.container = document.getElementById(this.containerId);

		this.routes = {};

		if(options.pages){
			var defaultPage = "";
			for(var i = 0, l = options.pages.length; i < l ; i++){
				this.addPage(options.pages[i]);
				if(options.pages[i].isDefaultPage){
					defaultPage = options.pages[i].id; 
				}
			}
			this.router = Router(this.routes);
			this.router.init();
		}
	}

	showPage(instance){
		document.getElementById(this.currentPage).classList.remove("current");
		document.getElementById(instance.id).classList.add("current");

		this.currentPage = instance.id;
		//instance.show();
	}

	/**
	 * Add a page to the DOM
	 * page : {id, reference}
	 */
	addPage (page){
		var instance = new page.reference(page);
		instance.id = page.id;
		this.container.appendChild(instance.render(page.isDefaultPage));
		this.currentPage = page.isDefaultPage ? page.id : this.currentPage;

		this.routes[page.route] = function(){
			this.showPage(instance);
		}.bind(this);

	}


	removePage(){

	}


}

module.exports = ViewManager;