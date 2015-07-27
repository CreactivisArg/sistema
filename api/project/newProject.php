<?php
require_once('../db.php');
connect_to_db();

$rawdata = file_get_contents('php://input');
$obj = json_decode($rawdata);

$name = $obj->name;
$track = $obj->track;
$description = $obj->description;
$target = $obj->target;
$why = $obj->why;
$who = $obj->who;
$scope = $obj->scope;
$id_status = $obj->id_status;

$query =  sprintf("INSERT INTO project (id, name, track, description, target, why, who, scope, id_status, creation_date) VALUES 
((select UUID()), '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', now());",mysql_real_escape_string($name),mysql_real_escape_string($track),mysql_real_escape_string($description),mysql_real_escape_string($target),mysql_real_escape_string($why),mysql_real_escape_string($who),mysql_real_escape_string($scope),mysql_real_escape_string($id_status));

$result = mysql_query($query);

if ($result)
    header("HTTP/1.1 200 OK");
else 
	header("HTTP/1.1 500 Internal Server Error");
?>