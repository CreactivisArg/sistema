<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
	$rawdata = file_get_contents('php://input');
	$obj = json_decode($rawdata);

	$id_mentor = $obj->id_mentor;
	$skills = $obj->skills;

	$error = false;

	$con->begin_transaction();
	foreach ($skills as $skill) {
		$query = sprintf("INSERT INTO mentor_skill (id_mentor, id_skill) VALUES ('%s', '%s')",$con->real_escape_string($id_mentor),$con->real_escape_string($skill));
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