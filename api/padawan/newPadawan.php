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
$admission_date = $obj->admission_date;
$id_status = $obj->id_status; 

$queryID = "select UUID() as uuid";
$resultID = mysql_query($queryID);
$rowID = mysql_fetch_row($resultID);
$contactID = $rowID[0];

mysql_query("BEGIN"); 
$newContact = sprintf("INSERT INTO contact (id, name, lastname, dni, birthdate, address, phone, mobile, email, facebook, twitter, school) VALUES ('%s', '%s', '%s', %s, '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s');",$contactID,mysql_real_escape_string(utf8_decode($name)),mysql_real_escape_string(utf8_decode($lastname)),mysql_real_escape_string($dni),mysql_real_escape_string(utf8_decode($birthdate)),mysql_real_escape_string(utf8_decode($address)),mysql_real_escape_string(utf8_decode($phone)),mysql_real_escape_string(utf8_decode($mobile)),mysql_real_escape_string(utf8_decode($email)),mysql_real_escape_string(utf8_decode($facebook)),mysql_real_escape_string(utf8_decode($twitter)),mysql_real_escape_string(utf8_decode($school)));
$resultContact = mysql_query($newContact);
if ($resultContact) {
	$newPadawan =  sprintf("INSERT INTO padawan (id, id_contact, id_status, admission_date, creation_date) VALUES ((select UUID()), '%s', '%s', '%s', now());",$contactID,mysql_real_escape_string($id_status),mysql_real_escape_string($admission_date));
	$resultPadawan = mysql_query($newPadawan);
    if ($resultPadawan) {
    	mysql_query("COMMIT");  
    	header("HTTP/1.1 200 OK");
    }
    else {
		mysql_query("ROLLBACK");  
		header("HTTP/1.1 500 Internal Server Error");
	}
}
else {
	mysql_query("ROLLBACK");  
	header("HTTP/1.1 500 Internal Server Error");
}
?>