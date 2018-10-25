<?php
require_once(__DIR__ .'/EverWebinar.php');

$User_Timezone = 'Asia/Dhaka';
$ew = new EverWebinar(
	$Api_Key, $Webinar_Id, $Force_Timezone, $User_Timezone
); 
$sch = $ew->schedules($Maximum_Schedule);

echo '<pre>';
print_r($sch);
