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

$query =  sprintf("INSERT INTO project (id, name, description, target, why, who, scope, id_status, creation_date) VALUES 
('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', now());",$projectID,mysql_real_escape_string($name),mysql_real_escape_string($description),mysql_real_escape_string($target),mysql_real_escape_string($why),mysql_real_escape_string($who),mysql_real_escape_string($scope),mysql_real_escape_string($id_status));
$result = mysql_query($query);

foreach ($categories as $category) {
	$query = sprintf("INSERT INTO project_category (id_project, id_category) VALUES ('%s', '%s')",mysql_real_escape_string($projectID),mysql_real_escape_string($category));
	$result = mysql_query($query);
}

if ($result)
    header("HTTP/1.1 200 OK");
else 
	header("HTTP/1.1 500 Internal Server Error");
?>