<?php

require_once('../db.php');
connect_to_db();

$rawdata = file_get_contents('php://input');
$obj = json_decode($rawdata);

$id = $obj->id;
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
    mysql_real_escape_string($name),mysql_real_escape_string($address),mysql_real_escape_string($city),mysql_real_escape_string($description),mysql_real_escape_string($phone),mysql_real_escape_string($email),mysql_real_escape_string($facebook),mysql_real_escape_string($twitter),mysql_real_escape_string($id_status),mysql_real_escape_string($id));
    
$result = mysql_query($query);

if ($result)
    header("HTTP/1.1 200 OK");
else 
	header("HTTP/1.1 500 Internal Server Error");
?>