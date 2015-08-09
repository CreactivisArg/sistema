<?php
require_once('../db.php');
connect_to_db();

$rawdata = file_get_contents('php://input');
$obj = json_decode($rawdata);

$id_dojo = $obj->id_dojo;
$id_padawan = $obj->id_padawan;

$query = sprintf("delete from dojo_padawan where id_dojo = '%s' and id_padawan = '%s'",mysql_real_escape_string($id_dojo),mysql_real_escape_string($id_padawan));

$result = mysql_query($query);

if ($result)
    header("HTTP/1.1 200 OK");
else 
	header("HTTP/1.1 500 Internal Server Error");
?>