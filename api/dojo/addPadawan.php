<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
	$rawdata = file_get_contents('php://input');
	$obj = json_decode($rawdata);

	$id_dojo = $obj->id_dojo;
	$padawans = $obj->padawans;

	$error = false;

	$con->begin_transaction();
	foreach ($padawans as $padawan) {
		$querySelect = sprintf("select id from dojo_padawan where id_dojo = '%s' and id_padawan = '%s'",$con->real_escape_string($id_dojo),$con->real_escape_string($padawan));
		$resultSelect = $con->query($querySelect);
		if ($resultSelect->num_rows==0) {
		    $queryInsert = sprintf("INSERT INTO dojo_padawan (id_dojo, id_padawan) VALUES ('%s', '%s')",$con->real_escape_string($id_dojo),$con->real_escape_string($padawan));
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