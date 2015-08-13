<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
	$rawdata = file_get_contents('php://input');
	$obj = json_decode($rawdata);

	$id_payment = $obj->id_payment;
	$month = $obj->month;
	$year = $obj->year;
	$amount = $obj->amount;
	$observation = $obj->observation;
	$id_dojo = $obj->id_dojo;
	$id_padawan = $obj->id_padawan;

	$query = sprintf("UPDATE payment SET month = %s, year = %s, amount = %s, observation = '%s', id_dojo = '%s', id_padawan = '%s' WHERE id ='%s'",
	    $con->real_escape_string($month),$con->real_escape_string($year),$con->real_escape_string($amount),$con->real_escape_string(utf8_decode($observation)),$con->real_escape_string($id_dojo),$con->real_escape_string($id_padawan),$con->real_escape_string($id_payment));
	    
	$result = $con->query($query);
	if ($result)
	    header("HTTP/1.1 200 OK");
	else 
		header("HTTP/1.1 500 Internal Server Error");
}
else
	header("HTTP/1.1 500 Internal Server Error");
?>