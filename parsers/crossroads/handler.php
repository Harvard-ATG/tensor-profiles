<?php

if (empty($url)) return self::error('Invalid URL');

preg_match_all('/\d+/', $url, $matches);
$numbers = $matches[0];
if (!isset($numbers[0])) return self::error('URL not formatted correctly');
$project_num = (int) $numbers[0];

$url = 'https://crossroads.oxy.edu/srv/projects/'.$project_num.'/resources.json?page=1&itemsPerPage=all&sortBy=sequence&sortOrder=asc';

// Generic HTTP handler
session_start();
$opts = array('http' => array('header'=> 'Cookie: ' . @$_SERVER['HTTP_COOKIE']."\r\n"));
$context = stream_context_create($opts);
session_write_close();
$content = file_get_contents($url, false, $context);
?>