<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
	$rawdata = file_get_contents('php://input');
	$obj = json_decode($rawdata);

	$id_mentor = $obj->id_mentor;
	$name = $obj->name;
	$lastname = $obj->lastname;
	$dni = $obj->dni;
	$birthdate = $obj->birthdate;
	$country = $obj->country;
	$state = $obj->state;
	$city = $obj->city;
	$address = $obj->address;
	$phone = $obj->phone;
	$mobile = $obj->mobile;
	$email = $obj->email;
	$facebook = $obj->facebook;
	$twitter = $obj->twitter;
	$admission_date = $obj->admission_date;
	$id_status = $obj->id_status; 

	$con->begin_transaction(); 
	$queryContact = sprintf("UPDATE contact SET name = '%s', lastname = '%s', dni = %s, birthdate = '%s', country = '%s', state = '%s', city = '%s', address = '%s', phone = '%s', mobile = '%s', email = '%s', facebook = '%s', twitter = '%s' WHERE id in (select id_contact from mentor where id = '%s')",
		$con->real_escape_string(utf8_decode($name)),$con->real_escape_string(utf8_decode($lastname)),$con->real_escape_string($dni),$con->real_escape_string(utf8_decode($birthdate)),$con->real_escape_string(utf8_decode($country)),$con->real_escape_string(utf8_decode($state)),$con->real_escape_string(utf8_decode($city)),$con->real_escape_string(utf8_decode($address)),$con->real_escape_string(utf8_decode($phone)),$con->real_escape_string(utf8_decode($mobile)),$con->real_escape_string(utf8_decode($email)),$con->real_escape_string(utf8_decode($facebook)),$con->real_escape_string(utf8_decode($twitter)),$con->real_escape_string($id_mentor));
	$resultContact = $con->query($queryContact);
	if ($resultContact) {
		$queryMentor = sprintf("UPDATE mentor SET id_status = '%s', admission_date = '%s' WHERE id ='%s'", $con->real_escape_string($id_status),$con->real_escape_string($admission_date),$con->real_escape_string($id_mentor));
		$resultMentor = $con->query($queryMentor);
		if ($resultMentor) {
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