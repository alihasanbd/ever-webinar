(function(w, d){
	function EwTankyou(elems){
		this.elems = elems;
		this.time = {day:0,hrs:0,mim:0,sec:0};
		this.initialize();
	}
	
	EwTankyou.prototype.initialize = function()
	{
		var self = this;
		var time = this.param().user_time;
		if((new Date(time) !== "Invalid Date") && !isNaN(new Date(time))){
			this.calculate(new Date(time));
			this.elems.forEach(function(elem){
				self.broadcast(elem.seconds, elem.minutes, 
				elem.hours, elem.days);
			});
		}
	}
	
	EwTankyou.prototype.broadcast = function(sSelector, mSelector, 
		hSelector, dSelector)
	{
		const self = this;
		setInterval(function(){  
			mSelector.html(self.time.min);
			sSelector.html(self.time.sec);
			if(typeof hSelector != "undefined" && hSelector){
				jQuery(hSelector).html(self.time.hrs);
			}
			if(typeof dSelector != "undefined" && dSelector){
				jQuery(dSelector).html(self.time.day);
			} 
		}, 500);
	}
	
	EwTankyou.prototype.calculate = function(jit)
	{
		const self = this; 
		var secinDay = 60 * 60 * 24;
		var secinHr = 60 * 60; 
		
		setInterval(function(){  
			var diff = (jit - new Date())/1000; 
			self.time.day = parseInt(diff / secinDay);
			var dayConsume = self.time.day * secinDay;
			self.time.hrs = parseInt((diff - dayConsume) / secinHr);
			var hrConsume = dayConsume + self.time.hrs * secinHr; 
			self.time.min = parseInt((diff - hrConsume) / 60);
			self.time.sec = parseInt(diff-(hrConsume + self.time.min * 60));
			if(diff <= 0){
				self.time.day = 0;
				self.time.hrs = 0;
				self.time.min = 0;
				self.time.sec = 0;
			}
		}, 500);
	} 
	
	EwTankyou.prototype.param = function()
	{
		var query_string = {};
		var vars = window.location.search.substring(1).split("&");
		for(var i=0; i< vars.length; i++){
			
			var pair = vars[i].split("=");
			var key = decodeURIComponent(pair[0]);
			var value = decodeURIComponent(pair[1]); 
			
			if(typeof query_string[key] === "undefined"){
				query_string[key] = decodeURIComponent(value); 
			}
			else if(typeof query_string[key] === "string"){
				var arr = [query_string[key], decodeURIComponent(value)];
				query_string[key] = arr; 
			}
			else{
				query_string[key].push(decodeURIComponent(value));
			}
		}
		return query_string;
	}
	
	w.Ew_Countdown = function(elems){
		new EwTankyou(elems);
	}
}(window, document))
