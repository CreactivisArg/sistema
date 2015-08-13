<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
	$rawdata = file_get_contents('php://input');
	$obj = json_decode($rawdata);

	$id_responsible = $obj->id_responsible;
	$id_padawan = $obj->id_padawan;

	$query = sprintf("delete from responsible_padawan where id_responsible = '%s' and id_padawan = '%s'",$con->real_escape_string($id_responsible),$con->real_escape_string($id_padawan));

	$result = $con->query($query);
	if ($result)
	    header("HTTP/1.1 200 OK");
	else 
		header("HTTP/1.1 500 Internal Server Error");
}
else
	header("HTTP/1.1 500 Internal Server Error");
?>