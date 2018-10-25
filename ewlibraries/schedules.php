<?php
header("Content-type:text/javascript");
require_once(__DIR__ .'/loader.php');

if($User_Timezone = @$_GET['tz']){
	$ew = new EverWebinar(
		$Api_Key, $Webinar_Id, $Force_Timezone, $User_Timezone
	); 
	$sch = $ew->schedules($Maximum_Schedule); 
	echo 'window.EW_JitConfig.Schedule_List = '. json_encode($sch);
}
