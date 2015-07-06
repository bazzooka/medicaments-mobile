import TouchEvents from './TouchEvents.js';
import EventController from '../EventController.js';

class SideMenu {
	constructor(options){
		this.menuId = options.menuId;
		this.menuContainer = document.getElementById(this.menuId);
		this.sideMenuId = options.sideMenuId;
		this.sideMenuContainer = document.getElementById(this.sideMenuId);
		this.isOpen = options.isOpen || false;
		this.triggerDistance = options.triggerDistance;

		this.touchState = {
			menuWidth : this.sideMenuContainer.offsetWidth,
			winWidth : window.innerWidth
		};

		// Create overlay
		var overlayFrag = document.createDocumentFragment();
		this.overlayElt = document.createElement('div');
		this.overlayElt.classList.add("menu-overlay");
		overlayFrag.appendChild(this.overlayElt);
		this.menuContainer.appendChild(overlayFrag);

		// Create grip
		var gripFrag = document.createDocumentFragment();
		this.gripElt = document.createElement('div');
		this.gripElt.classList.add("menu-grip");
		gripFrag.appendChild(this.gripElt);
		this.sideMenuContainer.appendChild(gripFrag);

		// Slide menu with slide-menu
		this.sideMenuContainer.addEventListener(TouchEvents.start, this.onTouchStart.bind(this), false);
		this.sideMenuContainer.addEventListener(TouchEvents.move, this.onTouchMove.bind(this), false);
		this.sideMenuContainer.addEventListener(TouchEvents.end, this.onTouchEnd.bind(this), false);
		this.sideMenuContainer.addEventListener("contextmenu", function(e){e.preventDefault();});

		// Slide menu with grip
		this.gripElt.addEventListener(TouchEvents.start, this.onTouchStart.bind(this), false);
		this.gripElt.addEventListener(TouchEvents.move, this.onTouchMove.bind(this), false);
		this.gripElt.addEventListener(TouchEvents.end, this.onTouchEnd.bind(this), false);
		this.gripElt.addEventListener("contextmenu", function(e){e.preventDefault();});

		// Click on overlay
		this.overlayElt.addEventListener(TouchEvents.click, this.onOverlayClick.bind(this));

	}

	onOverlayClick(){
		if(this.isOpen){
			this.closeMenu();
		}
	}

	isTouch(e){
		return e.targetTouches && e.targetTouches.length
	}

	onTouchStart(e){
		if(this.isTouch(e)){
			this.touchState.isTouching = true;
			this.touchState.startTouchX = e.targetTouches[0].clientX;
			this.sideMenuContainer.style['transition'] = "none";
			this.overlayElt.style['transition'] = "none";
			this.overlayElt.style['visibility'] = "visible";
		}
	}

	onTouchMove(e){ 
		if(this.isTouch(e)){
			if(this.touchState.isTouching){
				this.touchState.isMoving = true;
				var currentX = 0;
				if(!this.isOpen){
					currentX = -this.touchState.menuWidth + this.touchState.startTouchX + e.targetTouches[0].clientX;
				} else {
					currentX = -(this.touchState.startTouchX - e.targetTouches[0].clientX);
				}
				console.log(currentX);
				if(currentX >= 0){
					currentX = 0;
				}
				this.touchState.currentX = currentX;
				this.sideMenuContainer.style['transform'] = "translate3d(" + currentX +"px, 0,0)";
				this.overlayElt.style['opacity'] = 1 + (currentX / this.touchState.menuWidth);
			}
		}
	}

	onTouchEnd(e){
		this.sideMenuContainer.style['transition'] = "transform 0.5s";
		this.overlayElt.style['transition'] = "opacity 0.5s";
		if(this.touchState.isMoving){
			var touchEndXPosition = e.changedTouches[0].clientX;
			var deplacement = this.touchState.startTouchX - touchEndXPosition;

			this.sideMenuContainer.style['transform'] = "";
			this.overlayElt.style['opacity'] = "";
			this.overlayElt.style['visibility'] = "";
			if(deplacement < -20){
				this.openMenu();
			} else if(deplacement > 20){
				this.closeMenu();
			} else if(this.isOpen){
				this.openMenu();
			} else {
				this.closeMenu();
			}
		}

		if(!this.touchState.isMoving){
			var target = e.target;
			if(target.tagName === "A"){
				var href = target.href;
				this.closeMenu();
			}
		}

		this.touchState.isTouching = false;
		this.touchState.isMoving = false;
		
	}

	toggleMenu(){
		this.menuContainer.toggleClass("open");
		this.isOpen = !this.isOpen;
	}

	openMenu(){
		this.menuContainer.classList.add("open");
		this.isOpen = true;
	}

	closeMenu(){
		this.menuContainer.classList.remove("open");
		this.isOpen = false;
	}
};

module.exports = SideMenu;