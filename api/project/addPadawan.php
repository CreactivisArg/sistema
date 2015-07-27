<?php
require_once('../db.php');
connect_to_db();

$rawdata = file_get_contents('php://input');
$obj = json_decode($rawdata);

$id_project = $obj->id_project;
$padawans = $obj->padawans;

foreach ($padawans as $padawan) {
	$query = sprintf("INSERT INTO project_padawan (id_project, id_padawan) VALUES ('%s', '%s')",mysql_real_escape_string($id_project),mysql_real_escape_string($padawan));
	$result = mysql_query($query);
}

if ($result)
    header("HTTP/1.1 200 OK");
else 
	header("HTTP/1.1 500 Internal Server Error");
?>