<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
	$rawdata = file_get_contents('php://input');
	$obj = json_decode($rawdata);

	$id_question = $obj->id_question;
	$question = $obj->question;

	$query = sprintf("UPDATE question SET question = '%s' WHERE id ='%s'",
	    $con->real_escape_string(utf8_decode($question)),$con->real_escape_string($id_question));
	    
	$result = $con->query($query);
	if ($result)
	    header("HTTP/1.1 200 OK");
	else 
		header("HTTP/1.1 500 Internal Server Error");
}
else
	header("HTTP/1.1 500 Internal Server Error");
?>