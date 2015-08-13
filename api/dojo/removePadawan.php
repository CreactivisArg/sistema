<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
	$rawdata = file_get_contents('php://input');
	$obj = json_decode($rawdata);

	$id_dojo = $obj->id_dojo;
	$id_padawan = $obj->id_padawan;

	$query = sprintf("delete from dojo_padawan where id_dojo = '%s' and id_padawan = '%s'",$con->real_escape_string($id_dojo),$con->real_escape_string($id_padawan));

	$result = $con->query($query);
	if ($result)
	    header("HTTP/1.1 200 OK");
	else 
		header("HTTP/1.1 500 Internal Server Error");
}
else
	header("HTTP/1.1 500 Internal Server Error");
?>