<?php

require_once(dirname(__FILE__).'/config.php');
if (empty($key)) return self::error('Missing the Harvard Art Museum API key in parsers/harvard-art-museum/config.php');

$fields = 'id,places,people,culture,url,images,title,description,primaryimageurl,accessionmethod,accessionyear,period,dated,datebegin,dateend,medium,dimensions,provenance,copyright,classification,creditline,accesslevel,imagepermissionlevel,lendingpermissionlevel'; // Specify fields so we can get place data

$url = 'https://api.harvardartmuseums.org/object?apikey=' . $key . '&size=100&keyword=' . $query .'&fields=' . $fields;

// Generic HTTPS handler
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
$content = curl_exec($ch);
curl_close($ch);
?>
