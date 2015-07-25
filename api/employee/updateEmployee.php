<?php

require_once('../db.php');
connect_to_db();

$rawdata = file_get_contents('php://input');
$obj = json_decode($rawdata);

$id = $obj->id;
$name = $obj->name;
$lastname = $obj->lastname;
$dni = $obj->dni;
$address = $obj->address;
$phone = $obj->phone;
$mobile = $obj->mobile;
$email = $obj->email;
$facebook = $obj->facebook;
$twitter = $obj->twitter;
$id_status = $obj->id_status; 

$queryContact = sprintf("UPDATE contact SET name = '%s', lastname = '%s', dni = '%s', address = '%s', phone = '%s', mobile = '%s', email = '%s', facebook = '%s', twitter = '%s' WHERE id in (select id_contact from employee where id = '%s')", mysql_real_escape_string($name),mysql_real_escape_string($lastname),mysql_real_escape_string($dni),mysql_real_escape_string($address),mysql_real_escape_string($phone),mysql_real_escape_string($mobile),mysql_real_escape_string($email),mysql_real_escape_string($facebook),mysql_real_escape_string($twitter),mysql_real_escape_string($id));
$resultContact = mysql_query($queryContact);
if ($resultContact){
	$queryEmployee = sprintf("UPDATE employee SET id_status = '%s' WHERE id ='%s'", mysql_real_escape_string($id_status),mysql_real_escape_string($id));
	$resultEmployee = mysql_query($queryEmployee);
	if ($resultEmployee)
    	header("HTTP/1.1 200 OK");
    else 
		header("HTTP/1.1 500 Internal Server Error");
}
else 
	header("HTTP/1.1 500 Internal Server Error");
?>