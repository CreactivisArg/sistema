<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
	$rawdata = file_get_contents('php://input');
	$obj = json_decode($rawdata);

	$id_dojo = $obj->id_dojo;
	$name = $obj->name;
	$address = $obj->address;
	$city = $obj->city;
	$description = $obj->description;
	$phone = $obj->phone;
	$email = $obj->email;
	$facebook = $obj->facebook;
	$twitter = $obj->twitter;
	$id_status = $obj->id_status; 

	$query = sprintf("UPDATE dojo SET name = '%s', address = '%s', city = '%s', description = '%s', phone = '%s', email = '%s', facebook = '%s', twitter = '%s', id_status = '%s' WHERE id ='%s'",
	    $con->real_escape_string(utf8_decode($name)),$con->real_escape_string(utf8_decode($address)),$con->real_escape_string(utf8_decode($city)),$con->real_escape_string(utf8_decode($description)),$con->real_escape_string(utf8_decode($phone)),$con->real_escape_string(utf8_decode($email)),$con->real_escape_string(utf8_decode($facebook)),$con->real_escape_string(utf8_decode($twitter)),$con->real_escape_string($id_status),$con->real_escape_string($id_dojo));
	    
	$result = $con->query($query);
	if ($result)
	    header("HTTP/1.1 200 OK");
	else 
		header("HTTP/1.1 500 Internal Server Error");
}
else
	header("HTTP/1.1 500 Internal Server Error");
?>