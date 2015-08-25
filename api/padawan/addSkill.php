<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
	$rawdata = file_get_contents('php://input');
	$obj = json_decode($rawdata);

	$id_padawan = $obj->id_padawan;
	$skills = $obj->skills;

	$error = false;

	$con->begin_transaction();
	foreach ($skills as $skill) {
		$querySelect = sprintf("select id from padawan_skill where id_padawan = '%s' and id_skill = '%s'",$con->real_escape_string($id_padawan),$con->real_escape_string($skill));
		$resultSelect = $con->query($querySelect);
		if ($resultSelect->num_rows==0) {
			$queryInsert = sprintf("INSERT INTO padawan_skill (id_padawan, id_skill) VALUES ('%s', '%s')",$con->real_escape_string($id_padawan),$con->real_escape_string($skill));
			$resultInsert = $con->query($queryInsert);
			if (!$resultInsert)
				$error = true;
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