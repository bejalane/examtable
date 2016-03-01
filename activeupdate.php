<?php 

$data = json_decode(file_get_contents("php://input"));
$activevalue = $data->activevalue;
$id = $data->id;

$jsonString = file_get_contents('users.json');
$jsonData = json_decode($jsonString, true);

$jsonData[$id]['active'] = $activevalue;

$newJsonString = json_encode($jsonData);
file_put_contents('users.json', $newJsonString);

if(!file_put_contents('users.json', $newJsonString)){
	echo 2;
} else {
	echo $newJsonString;
}


?>