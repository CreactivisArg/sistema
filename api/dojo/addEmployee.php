<?php
require_once('../db.php');
connect_to_db();

$rawdata = file_get_contents('php://input');
$obj = json_decode($rawdata);

$id_dojo = $obj->id_dojo;
$employees = $obj->employees;

foreach ($employees as $employee) {
	$query =  sprintf("INSERT INTO dojo_employee (id_dojo, id_employee) VALUES ('%s', '%s')",mysql_real_escape_string($id_dojo),mysql_real_escape_string($employee));
	$result = mysql_query($query);
}

if ($result)
    header("HTTP/1.1 200 OK");
else 
	header("HTTP/1.1 500 Internal Server Error");
?>