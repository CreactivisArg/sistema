<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
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
	$resultID = $con->query($queryID);
	$rowID = $resultID->fetch_array(MYSQLI_ASSOC);
	$id_contact = $rowID['uuid'];
	$resultID->free();
	
	$con->begin_transaction();
	$newContact = sprintf("INSERT INTO contact (id, name, lastname, dni, address, phone, mobile, email, facebook, twitter) VALUES ('%s', '%s', '%s', %s, '%s', '%s', '%s', '%s', '%s', '%s');",
		$id_contact,$con->real_escape_string(utf8_decode($name)),$con->real_escape_string(utf8_decode($lastname)),$con->real_escape_string($dni),$con->real_escape_string(utf8_decode($address)),$con->real_escape_string(utf8_decode($phone)),$con->real_escape_string(utf8_decode($mobile)),$con->real_escape_string(utf8_decode($email)),$con->real_escape_string(utf8_decode($facebook)),$con->real_escape_string(utf8_decode($twitter)));
	$resultContact = $con->query($newContact);
	if ($resultContact) {
		$newMentor = sprintf("INSERT INTO mentor (id, id_contact, id_status, creation_date) VALUES ((select UUID()), '%s', '%s', now());",$id_contact,$con->real_escape_string($id_status));
		$resultMentor = $con->query($newMentor);
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