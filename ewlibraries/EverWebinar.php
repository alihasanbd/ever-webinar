<?php

class EverWebinar
{
	private $http, $token, $webinar, $timezone, $ftzone, $utzone;

	public function __construct($apiToken, $webinarId, 
		$forceTimezone=false, $userTimezone=null)
	{
		$this->token = $apiToken;
		$this->webinar = $webinarId;
		$this->ftzone = $forceTimezone;
		$this->utzone = $userTimezone; 
		
		$this->http = new GuzzleHttp\Client([
			'base_uri' => 'https://webinarjam.genndi.com/'
		]);
	}
	
	public function schedules($max)
	{
		$this->timezone = ($t = $this->ftzone)?$t:$this->utzone;
		$time = new DateTime('now', new DateTimeZone($this->timezone));
		if($schedule = $this->getSchedules($time->format('P'))){
			return array_slice($schedule, 0, $max);
		} 
		return array();
	} 
	
	public function register($schedule, $email, $fn, $ln)
	{
		$timezone = ($t = $this->ftzone)?$t:$this->utzone;
		$time = new DateTime('now', new DateTimeZone($timezone));
		
		$tz = $time->format('P');	
		if($data = $this->callRegistrar($schedule, $tz, $email, $fn, $ln)){
			if(true == isset($data->user)){
				return $data->user;
			}
		} 
		return false;
	}
	
	private function getSchedules($timezone)
	{
		$toReturn = array();
		$url = 'api/everwebinar/webinar';
		$schedule = $this->callEverweb($url, [
			'api_key' => $this->token,
			'webinar_id' => $this->webinar, 
			'timezone' => 'GMT'. $timezone,
			'real_dates' => 1,
		]);
		
		if(isset($schedule->webinar->schedules)){
			foreach($schedule->webinar->schedules as $sch){
				if($sch->schedule !== 'ir'){
					$date = DateTime::createFromFormat(
						'l, d M h:i A', $sch->date
					);
					$sch->date_translate = $this->translate($date);
					$sch->schedule_time = $date->format('Y-m-d H:i:s');
					$sch->user_time = $this->convert2userTime($date);
					$sch->timezone = $this->timezone;
					$toReturn[] = $sch;
				}
			}
		}
		return $toReturn;
	}
	
	private function translate($date)
	{
		return Translate($date->format('l')) .', '.
		Translate($date->format('d')) .' '.
		Translate($date->format('F')) .' '.
		Translate($date->format('h:i A'));
	}
	
	private function convert2userTime($date)
	{
		$time = new DateTime(
			$date->format('Y-m-d H:i:s'), 
			new DateTimeZone($this->timezone)
		);
		$time->setTimezone(new DateTimeZone($this->utzone));
		return str_replace(
			' ', 'T', 
			$time->format('Y-m-d H:i:s')
		);
	}
	
	private function callRegistrar($s, $tz, $email, $fn, $ln)
	{
		$url = 'api/everwebinar/register';
		return $this->callEverweb($url, [
			'api_key' => $this->token,
			'webinar_id' => $this->webinar, 
			'timezone' => 'GMT'. $tz,
			'first_name' => $fn,
			'last_name' => $ln,
			'email' => $email,
			'schedule' => $s,
			'real_dates' => 1,
		]);  
	}
	
	private function callEverweb($url, $postData)
	{
		return json_decode($this->http->post($url, [
			'form_params' => $postData
		])->getBody()->__toString());
	}
}
