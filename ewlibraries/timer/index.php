<?php
header("Content-type:text/javascript");
require_once(__DIR__ .'/../../lang.php');

$script = file_get_contents(
	__DIR__ .'/timer.js'
);

$extra = explode('?', $_SERVER['REQUEST_URI']);
$url = '//'. $_SERVER['HTTP_HOST']. rtrim($extra[0], '/timer/');

$script = str_replace(
	'SCRIPTS_BASE_URL', $url .'/', $script
); 

echo str_replace(
	'LANGUAGE_TRANSLATION', 
	json_encode($Language_Translation), 
	$script
);