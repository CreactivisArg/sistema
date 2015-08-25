<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
	$rawdata = file_get_contents('php://input');
	$obj = json_decode($rawdata);

	$id_dojo = $obj->id_dojo;
	$date = $obj->date;

	$error = false;

	$con->begin_transaction();
	if (isset($obj->padawans)){
		$padawans = $obj->padawans;
		foreach ($padawans as $padawan) {
			$querySelect = sprintf("select id from log_padawan where date = '%s' and id_dojo = '%s' and id_padawan = '%s'",$con->real_escape_string($date),$con->real_escape_string($id_dojo),$con->real_escape_string($padawan));
			$resultSelect = $con->query($querySelect);
			if ($resultSelect->num_rows==0) {
				$queryInsert = sprintf("INSERT INTO log_padawan (date,id_dojo,id_padawan) VALUES ('%s','%s','%s')",$con->real_escape_string($date),$con->real_escape_string($id_dojo),$con->real_escape_string($padawan));
				$resultInsert = $con->query($queryInsert);
				if (!$resultInsert)
					$error = true;
			}
		}
	}
	if (isset($obj->mentors)){
		$mentors = $obj->mentors;
		foreach ($mentors as $mentor) {
			$querySelect = sprintf("select id from log_mentor where date = '%s' and id_dojo = '%s' and id_mentor = '%s'",$con->real_escape_string($date),$con->real_escape_string($id_dojo),$con->real_escape_string($mentor));
			$resultSelect = $con->query($querySelect);
			if ($resultSelect->num_rows==0) {
				$queryInsert = sprintf("INSERT INTO log_mentor (date,id_dojo,id_mentor) VALUES ('%s','%s','%s')",$con->real_escape_string($date),$con->real_escape_string($id_dojo),$con->real_escape_string($mentor));
				$resultInsert = $con->query($queryInsert);
				if (!$resultInsert)
					$error = true;
			}
		}
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