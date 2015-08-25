<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
	$rawdata = file_get_contents('php://input');
	$obj = json_decode($rawdata);

	$id_mentor = $obj->id_mentor;
	$id_skill = $obj->id_skill;

	$query = sprintf("delete from mentor_skill where id_mentor = '%s' and id_skill = '%s'",$con->real_escape_string($id_mentor),$con->real_escape_string($id_skill));

	$result = $con->query($query);
	if ($result)
	    header("HTTP/1.1 200 OK");
	else 
		header("HTTP/1.1 500 Internal Server Error");
}
else
	header("HTTP/1.1 500 Internal Server Error");
?>