<?php
require_once('../db.php');
connect_to_db();

$rawdata = file_get_contents('php://input');
$obj = json_decode($rawdata);

$id = $obj->id;
$name = $obj->name;
$categories = $obj->categories;
$description = $obj->description;
$target = $obj->target;
$why = $obj->why;
$who = $obj->who;
$scope = $obj->scope;
$id_status = $obj->id_status;

$error = false;

mysql_query("BEGIN");
$queryUpdate = sprintf("UPDATE project SET name = '%s', description = '%s', target = '%s', why = '%s', who = '%s', scope = '%s', id_status = '%s' WHERE id ='%s'",
    mysql_real_escape_string(utf8_decode($name)),mysql_real_escape_string(utf8_decode($description)),mysql_real_escape_string(utf8_decode($target)),mysql_real_escape_string(utf8_decode($why)),mysql_real_escape_string(utf8_decode($who)),mysql_real_escape_string(utf8_decode($scope)),mysql_real_escape_string($id_status),mysql_real_escape_string($id));
$resultUpdate = mysql_query($queryUpdate);
if (!$resultUpdate)
	$error = true;

$queryCategories = sprintf("select id_category from project_category where id_project = '%s'",mysql_real_escape_string($id));
$resultCategories = mysql_query($queryCategories);
$actualCategories = array();
while ($rowCategories = mysql_fetch_row($resultCategories)) {
   array_push($actualCategories, $rowCategories[0]);
}
$deleteCategories = array_diff($actualCategories,$categories);
$insertCategories = array_diff($categories,$actualCategories);
foreach ($deleteCategories as $deleteCategory) {
	$queryDelete = sprintf("DELETE FROM project_category WHERE id_project = '%s' AND id_category = '%s'",mysql_real_escape_string($id),mysql_real_escape_string($deleteCategory));
	$resultDelete = mysql_query($queryDelete);
	if (!$resultDelete)
		$error = true;
}
foreach ($insertCategories as $insertCategory) {
	$queryInsert = sprintf("INSERT INTO project_category (id_project, id_category) VALUES ('%s', '%s')",mysql_real_escape_string($id),mysql_real_escape_string($insertCategory));
	$resultInsert = mysql_query($queryInsert);
	if (!$resultInsert)
		$error = true;
}

if (!$error) {
	mysql_query("COMMIT");  
    header("HTTP/1.1 200 OK");
}
else {
	mysql_query("ROLLBACK");  
	header("HTTP/1.1 500 Internal Server Error");
}
?>