(function(w, d){
	function Ew_Initiator()
	{
		this.tz = null; 
		this.dropdown = null;
		this.url = 'SCRIPTS_BASE_URL';
		this.counters = null;
	}
	
	Ew_Initiator.prototype.register = function(email, fname, lname)
	{
		fname = fname || ""; lname = lname || ""; 
		let param = 'tz='+ this.tz +'&we='+ email +'&wf='+ fname +'&wl='+ lname + '&ws='+ this.dropdown.value +'&wt='+ this.selectedTime();
		w.location.href = this.url +'registrar.php?'+ encodeURI(param); 
	}

	Ew_Initiator.prototype.selectedTime = function()
	{
		let retval = '', self = this; 
		w.EverWebinar_Schedule_List.forEach(function(schedule){
			if(self.dropdown.value == schedule.schedule){
				retval = schedule.user_time;
			}
		});
		return retval;
	}
	
	Ew_Initiator.prototype.schedule = function(selector, counters)
	{
		const self = this;
		this.counters = counters; 
		this.getScript(this.url +'counter.php', function(){
			self.getSchedule(selector, w.EverWebinar_Countdown_Timer);
		});
	}

	Ew_Initiator.prototype.getSchedule = function(selector, counter)
	{
		const self = this;
		if(this.dropdown = counter.queryElement(selector)){
			this.dropdown.innerHTML = "<option>Loading schedules ...</option>";
			this.getScript(this.url +'jstz.min.js', function(){
				self.tz = jstz.determine().name();
				let param = 'schedules.php?tz='+ self.tz;
				self.getScript(self.url + param, function(){
					self.setSchedule(w.EverWebinar_Schedule_List, counter); 
				});
			});
		}else{
			console.error("Invalid element selector");
		}
	}

	Ew_Initiator.prototype.setSchedule = function(schedules, counter)
	{
		let scheduleHtml = "";  
		schedules.forEach(function(sch){
			scheduleHtml += "<option value='"+ sch.schedule 
			+"'>"+ sch.date_translate +" ("+ sch.timezone +")</option>"; 
		});
		this.dropdown.innerHTML = scheduleHtml;
		if(this.counters && schedules[0].user_time != undefined){
			counter.init(this.counters, new Date(schedules[0].user_time));
		}
	}

	Ew_Initiator.prototype.getScript = function(url, callback)
	{
		const self = this;
		let script = d.createElement('script');
		script.onload = callback; script.src = url;
		let snippet = d.getElementsByTagName('script');
		snippet[0].parentNode.insertBefore(script, null);
	}

	w.EverWebinar = new Ew_Initiator();
}(window, document))
