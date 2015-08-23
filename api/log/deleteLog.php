<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
	$rawdata = file_get_contents('php://input');
	$obj = json_decode($rawdata);

	if (isset($obj->log_padawan))
		$query = sprintf("delete from log_padawan where id = %s",$con->real_escape_string($obj->log_padawan));
	else if (isset($obj->log_mentor))
		$query = sprintf("delete from log_mentor where id = %s",$con->real_escape_string($obj->log_mentor));

	$result = $con->query($query);
	if ($result)
		header("HTTP/1.1 200 OK");
	else
		header("HTTP/1.1 500 Internal Server Error");
}
else
	header("HTTP/1.1 500 Internal Server Error");
?>