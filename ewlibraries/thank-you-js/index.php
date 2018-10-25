<?php
header("Content-type:text/javascript");
require_once(__DIR__ .'/../../lang.php');

$script = file_get_contents(
	__DIR__ .'/thankyou.js'
);

echo str_replace(
	'LANGUAGE_TRANSLATION', 
	json_encode($Language_Translation), 
	$script
);