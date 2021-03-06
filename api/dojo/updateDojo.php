<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
	$rawdata = file_get_contents('php://input');
	$obj = json_decode($rawdata);

	$id_dojo = $obj->id_dojo;
	$id_environment = $obj->id_environment;
	$name = $obj->name;
	$country = $obj->country;
	$state = $obj->state;
	$city = $obj->city;
	$address = $obj->address;
	$description = $obj->description;
	$phone = $obj->phone;
	$email = $obj->email;
	$facebook = $obj->facebook;
	$twitter = $obj->twitter;
	$opening_date = $obj->opening_date;
	$id_status = $obj->id_status; 

	$con->begin_transaction();
	$queryContact = sprintf("UPDATE contact SET country = '%s', state = '%s', city = '%s', address = '%s', phone = '%s', email = '%s', facebook = '%s', twitter = '%s' WHERE id in (select id_contact from dojo where id = '%s')",
		$con->real_escape_string(utf8_decode($country)),$con->real_escape_string(utf8_decode($state)),$con->real_escape_string(utf8_decode($city)),$con->real_escape_string(utf8_decode($address)),$con->real_escape_string(utf8_decode($phone)),$con->real_escape_string(utf8_decode($email)),$con->real_escape_string(utf8_decode($facebook)),$con->real_escape_string(utf8_decode($twitter)),$con->real_escape_string($id_dojo));
	$resultContact = $con->query($queryContact);
	if ($resultContact) {
		$queryDojo = sprintf("UPDATE dojo SET id_environment = '%s', name = '%s', description = '%s', opening_date = '%s', id_status = '%s' WHERE id = '%s'", $con->real_escape_string($id_environment),$con->real_escape_string(utf8_decode($name)),$con->real_escape_string(utf8_decode($description)),$con->real_escape_string($opening_date),$con->real_escape_string($id_status),$con->real_escape_string($id_dojo));
		$resultDojo = $con->query($queryDojo);
		if ($resultDojo) {
	    	$con->commit(); 
	    	header("HTTP/1.1 200 OK");
	    }
	    else {
			$con->rollback();  
			header("HTTP/1.1 500 Internal Server Error");
		}
	}
	else {
		$con->rollback();
		header("HTTP/1.1 500 Internal Server Error");
	}
}
else
	header("HTTP/1.1 500 Internal Server Error");
?>