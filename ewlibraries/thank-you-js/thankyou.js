(function(w, d){
	function EwTankyou(elems){
		this.elems = elems;
		this.lang = LANGUAGE_TRANSLATION;
		this.time = {day:0,hrs:0,mim:0,sec:0};
		this.initialize();
	}
	
	EwTankyou.prototype.initialize = function()
	{
		var self = this;
		var time = this.param().user_time;
		if((new Date(time) !== "Invalid Date") && !isNaN(new Date(time))){
			this.calculate(new Date(time));
			setInterval(function(){ 
				self.elems.forEach(function(elem){
					elem.html(self.broadcast());
				});
			}, 500);
		}
	}
	
	EwTankyou.prototype.broadcast = function()
	{
		var hour = '', day = '', 
			html = ' <span>' + this.time.min;
			html += ' ' + this.lang.minutes + '</span>';
			html += ' and <span> ';
			html += this.time.sec;
			html += ' ' + this.lang.seconds + '</span> ';
			
		if(this.time.day > 0 || this.time.hrs > 0){
			hour = ' <span>' + this.time.hrs;
			hour += ' ' + this.lang.hours + '</span>, ';
		}
		if(this.time.day > 0){
			day = ' <span>' + this.time.day;
			day += ' ' + this.lang.days + '</span>, ';
		}
		
		return day + hour + html;
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
