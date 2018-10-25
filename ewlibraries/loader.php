<?php

require_once(__DIR__ .'/../lang.php');
require_once(__DIR__ .'/../config.php');
require_once(__DIR__ .'/../vendor/autoload.php');
require_once(__DIR__ .'/EverWebinar.php');
require_once(__DIR__ .'/Database.php');

function Translate($lang)
{
	global $Language_Translation;
	if($translation = @$Language_Translation[strtolower($lang)]){
		return $translation;
	}
	return $lang;
}