<?php
header("Content-type:text/javascript");
$script = file_get_contents(__DIR__ .'/scripts.js');
$extra = explode('?', $_SERVER['REQUEST_URI']);
$url = '//'. $_SERVER['HTTP_HOST']. $extra[0];

echo str_replace(
	'SCRIPTS_BASE_URL', $url, $script
); 
