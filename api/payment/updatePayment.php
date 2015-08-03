<?php
require_once('../db.php');
connect_to_db();

$rawdata = file_get_contents('php://input');
$obj = json_decode($rawdata);

$id = $obj->id;
$month = $obj->month;
$year = $obj->year;
$amount = $obj->amount;
$observation = $obj->observation;
$id_dojo = $obj->id_dojo;
$id_padawan = $obj->id_padawan;

$query = sprintf("UPDATE payment SET month = '%s', year = '%s', amount = '%s', observation = '%s', id_dojo = '%s', id_padawan = '%s' WHERE id ='%s'",
    mysql_real_escape_string($month),mysql_real_escape_string($year),mysql_real_escape_string($amount),mysql_real_escape_string($observation),mysql_real_escape_string($id_dojo),mysql_real_escape_string($id_padawan),mysql_real_escape_string($id));
    
$result = mysql_query($query);

if ($result)
    header("HTTP/1.1 200 OK");
else 
	header("HTTP/1.1 500 Internal Server Error");
?>