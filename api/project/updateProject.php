<?php
require_once('../db.php');
connect_to_db();

$rawdata = file_get_contents('php://input');
$obj = json_decode($rawdata);

$id = $obj->id;
$name = $obj->name;
$track = $obj->track;
$description = $obj->description;
$target = $obj->target;
$why = $obj->why;
$who = $obj->who;
$scope = $obj->scope;
$id_status = $obj->id_status;

$query = sprintf("UPDATE project SET name = '%s', track = '%s', description = '%s', target = '%s', why = '%s', who = '%s', scope = '%s', id_status = '%s' WHERE id ='%s'",
    mysql_real_escape_string($name),mysql_real_escape_string($track),mysql_real_escape_string($description),mysql_real_escape_string($target),mysql_real_escape_string($why),mysql_real_escape_string($who),mysql_real_escape_string($scope),mysql_real_escape_string($id_status),mysql_real_escape_string($id));
    
$result = mysql_query($query);

if ($result)
    header("HTTP/1.1 200 OK");
else 
	header("HTTP/1.1 500 Internal Server Error");
?>