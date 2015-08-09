<?php
require_once('../db.php');
connect_to_db();

$rawdata = file_get_contents('php://input');
$obj = json_decode($rawdata);

$id_dojo = $obj->id_dojo;
$padawans = $obj->padawans;

$error = false;

mysql_query("BEGIN"); 
foreach ($padawans as $padawan) {
    $query = sprintf("INSERT INTO dojo_padawan (id_dojo, id_padawan) VALUES ('%s', '%s')",mysql_real_escape_string($id_dojo),mysql_real_escape_string($padawan));
	$result = mysql_query($query);
	if (!$result)
		$error = true;
}

if (!$error) {
	mysql_query("COMMIT");  
    header("HTTP/1.1 200 OK");
}
else {
	mysql_query("ROLLBACK");  
	header("HTTP/1.1 500 Internal Server Error");
}
?>