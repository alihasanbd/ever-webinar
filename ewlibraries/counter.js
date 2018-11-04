(function(w, d){
	function Ew_Counter(){
		this.time = {day:0,hrs:0,mim:0,sec:0};
		this.lang = LANGUAGE_TRANSLATION;
	}

	/**
		time JS Date()
	*/
	Ew_Counter.prototype.init = function(selectors, time)
	{
		const self = this; 
		this.calculate(time); 
		if(Array.isArray(selectors) == true){ 
			selectors.forEach(function(selector){
				self.broadcast(selector);
			});
		}else{
			this.broadcast(selectors);
		} 
	}
	
	Ew_Counter.prototype.calculate = function(time)
	{
		const self = this; 
		let secinDay = 60 * 60 * 24;
		let secinHr = 60 * 60; 
		
		setInterval(function(){  
			let diff = (time - new Date())/1000; 
			self.time.day = parseInt(diff / secinDay);
			let dayConsume = self.time.day * secinDay;
			self.time.hrs = parseInt((diff - dayConsume) / secinHr);
			let hrConsume = dayConsume + self.time.hrs * secinHr; 
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

	Ew_Counter.prototype.broadcast = function(selector)
	{
		const self = this;
		if(selector = this.queryElement(selector)){
			setInterval(function(){
				selector.innerHTML = self.getHtml();
			}, 500);
		}
	}

	Ew_Counter.prototype.getHtml = function()
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

	/** 
		selector = String "#element" / ".element select"
		selector = Array [String selector, 0 / 1]
	*/
	Ew_Counter.prototype.queryElement = function(selector)
	{
		let index = 0, elem = selector;
		if(Array.isArray(selector) == true){ 
			if(typeof selector[0] != undefined){
				elem = selector[0];
			}
			if(typeof selector[1] != undefined){
				index = selector[1];
			}
		}
		if(elem && Number.isInteger(index)){
			return d.querySelectorAll(elem)[index];
		}
		return false;
	}

	w.EverWebinar_Countdown_Timer = new Ew_Counter();
}(window, document))