(function(){
	function Ew_Initiator()
	{
		this.tz = null;
		this.url = 'SCRIPTS_BASE_URL';
		window.EW_JitConfig.schedule.html(
			"<option>Loading schedules ...</option>"
		);
		this.time = {day:0,hrs:0,mim:0,sec:0};
		this.getLibrary();
	}

	Ew_Initiator.prototype.register = function(email, fname, lname)
	{
		fname = fname || ""; lname = lname || ""; 
		let schedule = window.EW_JitConfig.schedule.val(); 
		let param = 'tz='+ this.tz.timezone +'&we='+ email +'&wl='+ lname;
		param += '&wf='+ fname +'&ws='+ schedule +'&wt='+ this.getTime();
		window.location.href = this.url +'registrar.php?'+ encodeURI(param); 
	}

	Ew_Initiator.prototype.getTime = function()
	{
		var retval = '';
		var selected = window.EW_JitConfig.schedule.val();
		window.EW_JitConfig.Schedule_List.forEach(function(sch){
			if(selected == sch.schedule){
				retval = sch.user_time;
			}
		});
		return retval;
	}

	Ew_Initiator.prototype.initCounter = function(next)
	{
		const self = this;
		this.calculate(new Date(next.user_time));
		setInterval(function(){ 
			if(0 < window.EW_JitConfig.counter.length){
				window.EW_JitConfig.counter.forEach(function(timer){
					self.broadcast(timer.seconds, timer.minutes, 
					timer.hours, timer.days); 
				}); 
			}
		}, 500); 
	}
	
	
	Ew_Initiator.prototype.broadcast = function(sSelector, mSelector, 
		hSelector, dSelector)
	{
		const self = this;
		setInterval(function(){  
			mSelector.html(self.time.min);
			sSelector.html(self.time.sec);
			if(typeof hSelector != "undefined" && hSelector){
				hSelector.html(self.time.hrs);
			}
			if(typeof dSelector != "undefined" && dSelector){
				dSelector.html(self.time.day);
			} 
		}, 500);
	}
	
	Ew_Initiator.prototype.calculate = function(jit)
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

	Ew_Initiator.prototype.setSchedule = function(schedule)
	{
		const self = this;
		let scheduleHtml = ""; 
		schedule.forEach(function(sch){
			scheduleHtml += "<option value='"+ sch.schedule 
			+"'>"+ sch.date +" ("+ sch.timezone +")</option>"; 
		});
		this.initCounter(schedule[0]);
		window.EW_JitConfig.schedule.html(
			scheduleHtml
		);
	}

	Ew_Initiator.prototype.getScript = function(url, callback)
	{
		const self = this;
		let script = document.createElement('script');
		script.onload = callback; script.src = url;
		let snippet = document.getElementsByTagName('script');
		snippet[0].parentNode.insertBefore(script, null);
	}

	Ew_Initiator.prototype.getLibrary = function()
	{
		const self = this;
		this.getScript(this.url +'jstz.min.js', function(){
			let tz = self.tz = self.getTz();
			let param = 'schedules.php?tz='+ tz.timezone;
			self.getScript(self.url + param, function(){
				if('undefined' != typeof window.EW_JitConfig.Schedule_List){
					self.setSchedule(window.EW_JitConfig.Schedule_List);
				}
			}); 
		}); 
	}

	Ew_Initiator.prototype.getTz = function()
	{
		let offset = (new Date()).getTimezoneOffset();
		return {
			'offset': (offset < 0)?offset *(-1):offset,
			'timezone': jstz.determine().name(),
			'polarity': (offset < 0)?'p':'n'
		};
	}
	window.EverWebinar = new Ew_Initiator();
}())
