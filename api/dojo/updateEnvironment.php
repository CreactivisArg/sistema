<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
	$rawdata = file_get_contents('php://input');
	$obj = json_decode($rawdata);

	$id_environment = $obj->id_environment;
	$name = $obj->name;

	$query = sprintf("UPDATE environment SET name = '%s' WHERE id ='%s'",
	    $con->real_escape_string(utf8_decode($name)),$con->real_escape_string($id_environment));
	    
	$result = $con->query($query);
	if ($result)
	    header("HTTP/1.1 200 OK");
	else 
		header("HTTP/1.1 500 Internal Server Error");
}
else
	header("HTTP/1.1 500 Internal Server Error");
?>