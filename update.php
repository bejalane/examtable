<?php 

$data = json_decode(file_get_contents("php://input"));
$username = $data->username;
$firstname = $data->firstname;
$lastname = $data->lastname;
$address = $data->address;
$id = $data->id;


$replace = array('!','"','£','$','%','%','^','&','*','(',')','-','+','=','\\','/','[',']','{','}',';',':','@','#','~','<',',','>','.','?','|');
$username = str_replace($replace, "", $username);
$firstname = str_replace($replace, "", $firstname);
$lastname = str_replace($replace, "", $lastname);
$address = str_replace($replace, "", $address);


if(strlen($username) >=3 && strlen($firstname) >=3 && strlen($lastname) >=3 && strlen($address) >=3) {
	$jsonString = file_get_contents('users.json');
	$jsonData = json_decode($jsonString, true);

	$jsonData[$id]['username'] = $username;
	$jsonData[$id]['firstname'] = $firstname;
	$jsonData[$id]['lastname'] = $lastname;
	$jsonData[$id]['address'] = $address;

	$newJsonString = json_encode($jsonData);
	file_put_contents('users.json', $newJsonString);

	if(!file_put_contents('users.json', $newJsonString)){
		echo 2;
	} else {
		echo $newJsonString;
	}
} else {
	echo 3;
}




?>