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
    mysql_real_escape_string(utf8_decode($name)),mysql_real_escape_string(utf8_decode($address)),mysql_real_escape_string(utf8_decode($city)),mysql_real_escape_string(utf8_decode($description)),mysql_real_escape_string(utf8_decode($phone)),mysql_real_escape_string(utf8_decode($email)),mysql_real_escape_string(utf8_decode($facebook)),mysql_real_escape_string(utf8_decode($twitter)),mysql_real_escape_string($id_status),mysql_real_escape_string($id));
    
$result = mysql_query($query);

if ($result)
    header("HTTP/1.1 200 OK");
else 
	header("HTTP/1.1 500 Internal Server Error");
?>