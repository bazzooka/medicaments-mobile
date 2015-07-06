import doT from "dot";

class NavBar{
	constructor(options){
		this.navBarId = options.navBarId;
		this.navBarContainer = document.getElementById(this.navBarId);
		var html = render.navBar({datas: "titi"});

		this.navBarContainer.innerHTML = html;
		
	}

	setTitle(title){

	}

	setLeftButton(options){

	}

	setRightButton(options){
		
	}
}

module.exports = NavBar;