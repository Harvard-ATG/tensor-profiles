<?php

require_once(dirname(__FILE__).'/config.php');
if (empty($key)) return self::error('Missing the YouTube API key in parsers/youtube/config.php');

if ($single) {
	if (stristr($query, '://')) $query = substr($query, strrpos($query,'/')+1); 
	$url = 'https://www.googleapis.com/youtube/v3/videos?id='.$query.'&key='.$key.'&part=snippet';
} else {
	$url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q='.$query.'&maxResults=50&type=video&key='.$key;
}
// TODO: pageToken

// Generic HTTPS handler
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
$content = curl_exec($ch);
curl_close($ch);
?>