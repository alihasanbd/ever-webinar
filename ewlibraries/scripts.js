(function(w, d){
	function Ew_Initiator()
	{
		this.tz = null;
		this.dropdown = null;
		this.url = 'SCRIPTS_BASE_URL';
		this.lang = LANGUAGE_TRANSLATION; 
		this.counters = null; 
		this.schedules = [];
	}

	Ew_Initiator.prototype.setSchedule = function(schedules)
	{
		const self = this;
		let scheduleHtml = ""; 
		this.schedules = schedules;
		schedules.forEach(function(sch){
			scheduleHtml += "<option value='"+ sch.schedule 
			+"'>"+ sch.date_translate +" ("+ sch.timezone +")</option>"; 
		});
		//this.initCounter(schedule[0]);
		this.dropdown.innerHTML = scheduleHtml;
	}
	
	Ew_Initiator.prototype.schedule = function(selector, counters)
	{
		const self = this;
		this.counters = counters;
		if(this.dropdown = this.queryElement(selector)){
			this.dropdown.innerHTML = "<option>Loading schedules ...</option>";
			this.getScript(this.url +'jstz.min.js', function(){
				self.tz = jstz.determine().name();
				let param = 'schedules.php?tz='+ self.tz;
				self.getScript(self.url + param, function(){
					self.setSchedule(w.EverWebinar_Schedule_List); 
				});
			});
		}else{
			console.error("Invalid element selector");
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
	
	/** 
		selector = String "#element" / ".element select"
		selector = Array [String selector, 0 / 1]
	*/
	Ew_Initiator.prototype.queryElement = function(selector)
	{
		var index = 0, elem = selector;
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

	w.EverWebinar = new Ew_Initiator();
}(window, document))
