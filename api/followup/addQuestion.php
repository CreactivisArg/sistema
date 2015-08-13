<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
	$rawdata = file_get_contents('php://input');
	$obj = json_decode($rawdata);

	$id_dojo = $obj->id_dojo;
	$questions = $obj->questions;

	$error = false;

	$con->begin_transaction();
	foreach ($questions as $question) {
	    $query = sprintf("INSERT INTO dojo_question (id_dojo, id_question) VALUES ('%s', '%s')",$con->real_escape_string($id_dojo),$con->real_escape_string($question));
		$result = $con->query($query);
		if (!$result)
			$error = true;
	}

	if (!$error) {
		$con->commit();
	    header("HTTP/1.1 200 OK");
	}
	else {
		$con->rollback();
		header("HTTP/1.1 500 Internal Server Error");
	}
}
else
	header("HTTP/1.1 500 Internal Server Error");
?>