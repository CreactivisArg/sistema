<?php
require_once('../db.php');
connect_to_db();

$rawdata = file_get_contents('php://input');
$obj = json_decode($rawdata);

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

$queryID = "select UUID() as uuid";
$resultID = mysql_query($queryID);
$rowID = mysql_fetch_row($resultID);
$contactID = $rowID[0];

mysql_query("BEGIN"); 
$newContact = sprintf("INSERT INTO contact (id, name, lastname, dni, address, phone, mobile, email, facebook, twitter) VALUES ('%s', '%s', '%s', %s, '%s', '%s', '%s', '%s', '%s', '%s');",$contactID,mysql_real_escape_string(utf8_decode($name)),mysql_real_escape_string(utf8_decode($lastname)),mysql_real_escape_string($dni),mysql_real_escape_string(utf8_decode($address)),mysql_real_escape_string(utf8_decode($phone)),mysql_real_escape_string(utf8_decode($mobile)),mysql_real_escape_string(utf8_decode($email)),mysql_real_escape_string(utf8_decode($facebook)),mysql_real_escape_string(utf8_decode($twitter)));
$resultContact = mysql_query($newContact);
if ($resultContact){
	$newResponsible = sprintf("INSERT INTO responsible (id, id_contact, id_status, creation_date) VALUES ((select UUID()), '%s', '%s', now());",$contactID,$id_status);
	$resultResponsible = mysql_query($newResponsible);
    if ($resultResponsible) {
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