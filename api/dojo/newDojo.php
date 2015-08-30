<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
	$rawdata = file_get_contents('php://input');
	$obj = json_decode($rawdata);

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
	$id_status = $obj->id_status; 

	$queryID = "select UUID() as uuid";
	$resultID = $con->query($queryID);
	$rowID = $resultID->fetch_array(MYSQLI_ASSOC);
	$id_contact = $rowID['uuid'];
	$resultID->free();

	$con->begin_transaction();
	$newContact = sprintf("INSERT INTO contact (id, country, state, city, address, phone, email, facebook, twitter) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')",
		$id_contact,$con->real_escape_string(utf8_decode($country)),$con->real_escape_string(utf8_decode($state)),$con->real_escape_string(utf8_decode($city)),$con->real_escape_string(utf8_decode($address)),$con->real_escape_string(utf8_decode($phone)),$con->real_escape_string(utf8_decode($email)),$con->real_escape_string(utf8_decode($facebook)),$con->real_escape_string(utf8_decode($twitter)));
	$resultContact = $con->query($newContact);
	if ($resultContact) {
		$newDojo = sprintf("INSERT INTO dojo (id, id_environment, name, id_contact, description, id_status, creation_date) VALUES ((select UUID()), '%s', '%s', '%s', '%s', '%s', now())",$con->real_escape_string($id_environment),$con->real_escape_string(utf8_decode($name)),$id_contact,$con->real_escape_string(utf8_decode($description)),$con->real_escape_string($id_status));
		$resultDojo = $con->query($newDojo);
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