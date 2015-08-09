<?php
require_once('../db.php');
connect_to_db();

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
$resultID = mysql_query($queryID);
$rowID = mysql_fetch_row($resultID);
$projectID = $rowID[0];

$error = false;

mysql_query("BEGIN"); 
$query = sprintf("INSERT INTO project (id, name, description, target, why, who, scope, id_status, creation_date) VALUES 
('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', now());",$projectID,mysql_real_escape_string(utf8_decode($name)),mysql_real_escape_string(utf8_decode($description)),mysql_real_escape_string(utf8_decode($target)),mysql_real_escape_string(utf8_decode($why)),mysql_real_escape_string(utf8_decode($who)),mysql_real_escape_string(utf8_decode($scope)),mysql_real_escape_string($id_status));
$result = mysql_query($query);
if (!$result)
	$error = true;

foreach ($categories as $category) {
	$query = sprintf("INSERT INTO project_category (id_project, id_category) VALUES ('%s', '%s')",mysql_real_escape_string($projectID),mysql_real_escape_string($category));
	$result = mysql_query($query);
	if (!$result)
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