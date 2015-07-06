// var main = require('../jsx/main.jsx');
var ViewManager = require('./components/ViewManager.js');
var SideMenu = require('./components/SideMenu.js');
var HomePage = require('./pages/HomePage.js'); 
var FavoritePage = require('./pages/FavoritePage.js'); 

class App {

	constructor(options){
		this.options = options;
		this.routes = { 
			'/': HomePage.show 
		}
		this.init();
	} 

	init(){
		console.log("Init"); 
		this.viewManager = new ViewManager({
			containerId: "page-container",
			pages: [
				{reference: HomePage, route: '/', id: "home-page", isDefaultPage: true},
				{reference: FavoritePage, route: '/favorite', id: "favorite-page"}
			]
		});

		this.sideMenu = new SideMenu({
			menuId: "menu-container",
			sideMenuId: "side-menu",
			triggerDistance: "20"
		});
	}
}

var myAPP = new App();

// module.exports = App;

// var author = function () { console.log("author"); };
// var books = function () { console.log(arguments); };
// var viewBook = function (bookId) {
// console.log("viewBook: bookId is populated: " + bookId);
// };

// var routes = {
// '/author': author,
// '/books': [books, function() {
//   console.log("An inline route handler.");
// }],
// '/books/view/:bookId': viewBook
// };

// var router = Router(routes);

// router.init();



