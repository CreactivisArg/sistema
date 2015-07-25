<?php
require_once('../db.php');
connect_to_db();

$rawdata = file_get_contents('php://input');
$obj = json_decode($rawdata);

$id_dojo = $obj->id_dojo;
$id_employee = $obj->id_employee;

$query =  sprintf("delete from dojo_employee where id_dojo = '%s' and id_employee = '%s'",mysql_real_escape_string($id_dojo),mysql_real_escape_string($id_employee));

$result = mysql_query($query);

if ($result)
    header("HTTP/1.1 200 OK");
else 
	header("HTTP/1.1 500 Internal Server Error");
?>