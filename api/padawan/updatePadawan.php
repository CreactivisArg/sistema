<?php
require_once('../db.php');
connect_to_db();

$rawdata = file_get_contents('php://input');
$obj = json_decode($rawdata);

$id = $obj->id;
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

mysql_query("BEGIN"); 
$queryContact = sprintf("UPDATE contact SET name = '%s', lastname = '%s', dni = %s, birthdate = '%s', address = '%s', phone = '%s', mobile = '%s', email = '%s', facebook = '%s', twitter = '%s', school = '%s' WHERE id in (select id_contact from padawan where id = '%s')", mysql_real_escape_string(utf8_decode($name)),mysql_real_escape_string(utf8_decode($lastname)),mysql_real_escape_string($dni),mysql_real_escape_string(utf8_decode($birthdate)),mysql_real_escape_string(utf8_decode($address)),mysql_real_escape_string(utf8_decode($phone)),mysql_real_escape_string(utf8_decode($mobile)),mysql_real_escape_string(utf8_decode($email)),mysql_real_escape_string(utf8_decode($facebook)),mysql_real_escape_string(utf8_decode($twitter)),mysql_real_escape_string(utf8_decode($school)),mysql_real_escape_string($id));
$resultContact = mysql_query($queryContact);
if ($resultContact) {
	$queryPadawan = sprintf("UPDATE padawan SET id_status = '%s', admission_date = '%s' WHERE id = '%s'", mysql_real_escape_string($id_status),mysql_real_escape_string($admission_date),mysql_real_escape_string($id));
	$resultPadawan = mysql_query($queryPadawan);
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