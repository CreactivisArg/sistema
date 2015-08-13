<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
	$rawdata = file_get_contents('php://input');
	$obj = json_decode($rawdata);

	$month = $obj->month;
	$year = $obj->year;
	$amount = $obj->amount;
	$observation = $obj->observation;
	$id_dojo = $obj->id_dojo;
	$id_padawan = $obj->id_padawan;

	$query = sprintf("INSERT INTO payment (id, date, month, year, amount, observation, id_dojo, id_padawan) VALUES ((select UUID()), now(), %s, %s, %s, '%s', '%s', '%s');",
		$con->real_escape_string($month),$con->real_escape_string($year),$con->real_escape_string($amount),$con->real_escape_string(utf8_decode($observation)),$con->real_escape_string($id_dojo),$con->real_escape_string($id_padawan));

	$result = $con->query($query);
	if ($result)
	    header("HTTP/1.1 200 OK");
	else 
		header("HTTP/1.1 500 Internal Server Error");
}
else
	header("HTTP/1.1 500 Internal Server Error");
?>