<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
	$rawdata = file_get_contents('php://input');
	$obj = json_decode($rawdata);

	$id_dojo = $obj->id_dojo;
	$id_mentor = $obj->id_mentor;

	$query = sprintf("delete from dojo_mentor where id_dojo = '%s' and id_mentor = '%s'",$con->real_escape_string($id_dojo),$con->real_escape_string($id_mentor));

	$result = $con->query($query);
	if ($result)
	    header("HTTP/1.1 200 OK");
	else 
		header("HTTP/1.1 500 Internal Server Error");
}
else
	header("HTTP/1.1 500 Internal Server Error");
?>