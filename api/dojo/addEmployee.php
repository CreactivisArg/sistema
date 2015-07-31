<?php
require_once('../db.php');
connect_to_db();

$rawdata = file_get_contents('php://input');
$obj = json_decode($rawdata);

$id_dojo = $obj->id_dojo;
$employees = $obj->employees;

$error = false;

mysql_query("BEGIN"); 
foreach ($employees as $employee) {
	$query =  sprintf("INSERT INTO dojo_employee (id_dojo, id_employee) VALUES ('%s', '%s')",mysql_real_escape_string($id_dojo),mysql_real_escape_string($employee));
	$result = mysql_query($query);
	if (!$result)
		$error = true;
}

if (!$error){
	mysql_query("COMMIT");  
    header("HTTP/1.1 200 OK");
}
else {
	mysql_query("ROLLBACK");  
	header("HTTP/1.1 500 Internal Server Error");
}
?>