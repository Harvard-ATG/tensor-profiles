<?php

require_once(dirname(__FILE__).'/config.php');
if (empty($key)) return self::error('Missing the Harvard Art Museum API key in parsers/harvard-art-museum/config.php');

$fields = 'id,places,people,culture,url,images,title,description,primaryimageurl,accessionmethod,accessionyear,period,dated,datebegin,dateend,medium,dimensions,provenance,copyright,classification,creditline,accesslevel,imagepermissionlevel,lendingpermissionlevel'; // Specify fields so we can get place data



if($single){
  $exploded = explode('/', $query);
  $id = end($exploded);
  $url = 'https://api.harvardartmuseums.org/object?apikey=' . $key . '&fields=' . $fields . '&q=id:' . $id;
} else {
  $url = 'https://api.harvardartmuseums.org/object?apikey=' . $key . '&size=100&keyword=' . $query .'&fields=' . $fields . '&page=' . $page;
}


/**
Get from *.json, use for multiselect?
$color = file_get_contents(__DIR__ . "/field_terms/color.json");
$century = file_get_contents(__DIR__ . "/field_terms/century.json");
$culture = file_get_contents(__DIR__ . "/field_terms/culture.json");
$medium = file_get_contents(__DIR__ . "/field_terms/medium.json");
$period = file_get_contents(__DIR__ . "/field_terms/period.json");
$worktype = file_get_contents(__DIR__ . "/field_terms/worktype.json");

$has_image
$objectnumber ?
$person ?
$hasimage
$technique
$yearmade
$sort
**/

// Generic HTTPS handler
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
$content = curl_exec($ch);
curl_close($ch);
?>
