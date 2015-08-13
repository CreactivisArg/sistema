<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
	$rawdata = file_get_contents('php://input');
	$obj = json_decode($rawdata);

	$name = $obj->name;
	$categories = $obj->categories;
	$description = $obj->description;
	$target = $obj->target;
	$why = $obj->why;
	$who = $obj->who;
	$scope = $obj->scope;
	$id_status = $obj->id_status;

	$queryID = "select UUID() as uuid";
	$resultID = $con->query($queryID);
	$rowID = $resultID->fetch_array(MYSQLI_ASSOC);
	$id_project = $rowID['uuid'];
	$resultID->free();

	$error = false;

	$con->begin_transaction();
	$query = sprintf("INSERT INTO project (id, name, description, target, why, who, scope, id_status, creation_date) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', now());",
		$id_project,$con->real_escape_string(utf8_decode($name)),$con->real_escape_string(utf8_decode($description)),$con->real_escape_string(utf8_decode($target)),$con->real_escape_string(utf8_decode($why)),$con->real_escape_string(utf8_decode($who)),$con->real_escape_string(utf8_decode($scope)),$con->real_escape_string($id_status));
	$result = $con->query($query);
	if (!$result)
		$error = true;

	foreach ($categories as $category) {
		$query = sprintf("INSERT INTO project_category (id_project, id_category) VALUES ('%s', '%s')",$con->real_escape_string($id_project),$con->real_escape_string($category));
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