var EventController  = {
	observables : [],

	addObservable : function(subject){
		if(this.observables[subject]){
			throw "This observable already exists in the list";
		}
		this.observables[subject] = [];
	},

	observe : function(subject, callback){
		if(!this.observables[subject]){
			throw "This observable doesn't exists";
		}
		this.observables[subject].push(callback);
	},

	notifyObservers : function(subject, params){
		if(!this.observables[subject]){
			throw "This observable doesn't exists";
		}
		for(var i = 0, l = this.observables[subject].length; i < l; i ++){
			this.observables[subject][i].apply(this, Array.prototype.slice.call(arguments).slice(1)); 
		}
	} 

};

module.exports = EventController; 