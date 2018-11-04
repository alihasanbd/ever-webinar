(function(w, d){
	function EW_ThankYou(){
		this.url = 'SCRIPTS_BASE_URL';
	}
	
	EW_ThankYou.prototype.init = function(selectors)
	{
		let time = this.param().user_time;
		if((new Date(time) !== "Invalid Date") && !isNaN(new Date(time))){
			this.getScript(this.url +'counter.php', function(){
				w.EverWebinar_Countdown_Timer.init(selectors, new Date(time));
			});
		}
	}
	
	EW_ThankYou.prototype.param = function()
	{
		let query_string = {};
		let lets = w.location.search.substring(1).split("&");
		for(let i=0; i< lets.length; i++){
			
			let pair = lets[i].split("=");
			let key = decodeURIComponent(pair[0]);
			let value = decodeURIComponent(pair[1]); 
			
			if(typeof query_string[key] === "undefined"){
				query_string[key] = decodeURIComponent(value); 
			}
			else if(typeof query_string[key] === "string"){
				let arr = [query_string[key], decodeURIComponent(value)];
				query_string[key] = arr; 
			}
			else{
				query_string[key].push(decodeURIComponent(value));
			}
		}
		return query_string;
	}

	EW_ThankYou.prototype.getScript = function(url, callback)
	{
		const self = this;
		let script = d.createElement('script');
		script.onload = callback; script.src = url;
		let snippet = d.getElementsByTagName('script');
		snippet[0].parentNode.insertBefore(script, null);
	}
	
	w.EverWebinar_Timer = new EW_ThankYou();
}(window, document))