class SideMenu {
	constructor(options){
		this.menuId = options.menuId;
		this.menuContainer = document.getElementById(this.menuId);
		this.isOpen = options.isOpen || false;
	}

	toggleMenu(){
		this.menuContainer.toggleClass("open");
	}

	openMenu(){
		this.menuContainer.classList.add("open");
	}

	closeMenu(){
		this.menuContainer.classList.remove("open");
	}
};

module.exports = SideMenu;