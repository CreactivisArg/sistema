<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
	$rawdata = file_get_contents('php://input');
	$obj = json_decode($rawdata);

	$id_project = $obj->id_project;
	$name = $obj->name;
	$categories = $obj->categories;
	$description = $obj->description;
	$target = $obj->target;
	$why = $obj->why;
	$objective = $obj->objective;
	$scope = $obj->scope;
	$id_status = $obj->id_status;

	$error = false;

	$con->begin_transaction();
	$queryUpdate = sprintf("UPDATE project SET name = '%s', description = '%s', target = '%s', why = '%s', objective = '%s', scope = '%s', id_status = '%s' WHERE id ='%s'",
	    $con->real_escape_string(utf8_decode($name)),$con->real_escape_string(utf8_decode($description)),$con->real_escape_string(utf8_decode($target)),$con->real_escape_string(utf8_decode($why)),$con->real_escape_string(utf8_decode($objective)),$con->real_escape_string(utf8_decode($scope)),$con->real_escape_string($id_status),$con->real_escape_string($id_project));
	$resultUpdate = $con->query($queryUpdate);
	if (!$resultUpdate)
		$error = true;

	$queryCategories = sprintf("select id_category from project_category where id_project = '%s'",$con->real_escape_string($id_project));
	$resultCategories = $con->query($queryCategories);
	$actualCategories = array();
	while ($rowCategories = $resultCategories->fetch_array(MYSQLI_ASSOC)) {
	   array_push($actualCategories, $rowCategories['id_category']);
	}
	$resultCategories->free();
	$deleteCategories = array_diff($actualCategories,$categories);
	$insertCategories = array_diff($categories,$actualCategories);
	foreach ($deleteCategories as $deleteCategory) {
		$queryDelete = sprintf("DELETE FROM project_category WHERE id_project = '%s' AND id_category = '%s'",$con->real_escape_string($id_project),$con->real_escape_string($deleteCategory));
		$resultDelete = $con->query($queryDelete);
		if (!$resultDelete)
			$error = true;
	}
	foreach ($insertCategories as $insertCategory) {
		$queryInsert = sprintf("INSERT INTO project_category (id_project, id_category) VALUES ('%s', '%s')",$con->real_escape_string($id_project),$con->real_escape_string($insertCategory));
		$resultInsert = $con->query($queryInsert);
		if (!$resultInsert)
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