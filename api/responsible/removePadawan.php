<?php
require_once('../db.php');
connect_to_db();

$rawdata = file_get_contents('php://input');
$obj = json_decode($rawdata);

$id_responsible = $obj->id_responsible;
$id_padawan = $obj->id_padawan;

$query = sprintf("delete from responsible_padawan where id_responsible = '%s' and id_padawan = '%s'",mysql_real_escape_string($id_responsible),mysql_real_escape_string($id_padawan));

$result = mysql_query($query);

if ($result)
    header("HTTP/1.1 200 OK");
else 
	header("HTTP/1.1 500 Internal Server Error");
?>