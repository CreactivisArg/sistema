<?php
require_once('../db.php');
connect_to_db();

$rawdata = file_get_contents('php://input');
$obj = json_decode($rawdata);

$id_dojo = $obj->id_dojo;
$date = $obj->date;
if (isset($obj->id_padawan)){
	$query = sprintf("INSERT INTO log_padawan (date,id_dojo,id_padawan) VALUES ('%s','%s','%s')",mysql_real_escape_string($date),mysql_real_escape_string($id_dojo),mysql_real_escape_string($obj->id_padawan));
}
else if (isset($obj->id_mentor)){
	$query = sprintf("INSERT INTO log_mentor (date,id_dojo,id_mentor) VALUES ('%s','%s','%s')",mysql_real_escape_string($date),mysql_real_escape_string($id_dojo),mysql_real_escape_string($obj->id_mentor));
}

$result = mysql_query($query);

if ($result)
	header("HTTP/1.1 200 OK");
else
	header("HTTP/1.1 500 Internal Server Error");
?>