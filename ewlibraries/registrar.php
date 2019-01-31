<?php
error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);

require_once(__DIR__ .'/loader.php');

if(isset($_GET['ws']) && $User_Timezone = @$_GET['tz']){ 
	if(filter_var(@$_GET['we'], FILTER_VALIDATE_EMAIL) && $fn = @$_GET['wf']){  
		$ew = new EverWebinar(
			$Api_Key, $Webinar_Id, $Force_Timezone, $User_Timezone
		);
		
		$phone = ($p = @$_GET['wp'])?$p:null;
		$country = ($c = @$_GET['wc'])?$c:null;
		
		$data = $ew->register(
			$_GET['ws'], $_GET['we'], $fn, @$_GET['wl'], $country, $phone
		);
		
		/* Save lead in database if configured */
		if($table = @$Database_Config['db_table_name']){
			$db = new Database($table, $Database_Config);
			$db->addLead(
				$data->first_name, @$_GET['wl'], 	
				$data->email, $data->date, 
				$data->timezone, $data->webinar_id,  
				$data->user_id, $data->thank_you_url,   
				$data->live_room_url, $data->replay_room_url,    
				$_GET['ws']
			);
		}
		
		if($TY_Url){
			header('location:'. get_tyUrl($TY_Url, $data));
			exit();
		} 
		header('location:'. $data->thank_you_url);
		exit();
	}
}

function get_tyUrl($TY_Url, $data)
{
	$data->user_time = @$_GET['wt'];
	$data->user_timezone = @$_GET['tz'];
	$data->req_schedule = @$_GET['ws'];
	
	if(strpos($TY_Url, '?') === false){
		return $TY_Url .'?'. http_build_query((array)$data);
	}
	return $TY_Url .'&'. http_build_query((array)$data);
}

echo "Invalid parameter.";
