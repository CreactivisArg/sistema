<?php
require_once('../db.php');
connect_to_db();

$rawdata = file_get_contents('php://input');
$obj = json_decode($rawdata);

$name = $obj->name;
$lastname = $obj->lastname;
$dni = $obj->dni;
$birthdate = $obj->birthdate;
$address = $obj->address;
$phone = $obj->phone;
$mobile = $obj->mobile;
$email = $obj->email;
$facebook = $obj->facebook;
$twitter = $obj->twitter;
$school = $obj->school;
$id_status = $obj->id_status; 

$queryID = "select UUID() as uuid";
$resultID = mysql_query($queryID);
$rowID = mysql_fetch_row($resultID);
$contactID = $rowID[0];

$newContact =  sprintf("INSERT INTO contact (id, name, lastname, dni, birthdate, address, phone, mobile, email, facebook, twitter, school) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s');",$contactID,mysql_real_escape_string($name),mysql_real_escape_string($lastname),mysql_real_escape_string($dni),mysql_real_escape_string($birthdate),mysql_real_escape_string($address),mysql_real_escape_string($phone),mysql_real_escape_string($mobile),mysql_real_escape_string($email),mysql_real_escape_string($facebook),mysql_real_escape_string($twitter),mysql_real_escape_string($school));
$resultContact = mysql_query($newContact);
if ($resultContact){
	$newPadawan =  sprintf("INSERT INTO padawan (id, id_contact, id_status, creation_date) VALUES ((select UUID()), '%s', '%s', now());",$contactID,$id_status);
	$resultPadawan = mysql_query($newPadawan);
    if ($resultPadawan)
    	header("HTTP/1.1 200 OK");
    else
    	header("HTTP/1.1 500 Internal Server Error");
}
else 
	header("HTTP/1.1 500 Internal Server Error");
?>