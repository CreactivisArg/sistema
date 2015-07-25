<?php
require_once('../db.php');
connect_to_db();

$rawdata = file_get_contents('php://input');
$obj = json_decode($rawdata);

$name = $obj->name;
$address = $obj->address;
$city = $obj->city;
$description = $obj->description;
$phone = $obj->phone;
$email = $obj->email;
$facebook = $obj->facebook;
$twitter = $obj->twitter;
$id_status = $obj->id_status; 

$query =  sprintf("INSERT INTO dojo (id, name, address, city, description, phone, email, facebook, twitter, id_status, creation_date) VALUES 
((select UUID()), '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', now());",mysql_real_escape_string($name),mysql_real_escape_string($address),mysql_real_escape_string($city),mysql_real_escape_string($description),mysql_real_escape_string($phone),mysql_real_escape_string($email),mysql_real_escape_string($facebook),mysql_real_escape_string($twitter),mysql_real_escape_string($id_status));

$result = mysql_query($query);

if ($result)
    header("HTTP/1.1 200 OK");
else 
	header("HTTP/1.1 500 Internal Server Error");
?>