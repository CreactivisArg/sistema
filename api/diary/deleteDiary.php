<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
	$rawdata = file_get_contents('php://input');
	$obj = json_decode($rawdata);

	if (isset($obj->id_diary)) {
	    $query  = sprintf("delete from diary where id = '%s'",$con->real_escape_string($obj->id_diary));
	    $result = $con->query($query);
	    if ($result)
			header("HTTP/1.1 200 OK");
	    else 
	    	header("HTTP/1.1 500 Internal Server Error");
	}
	else 
	    header("HTTP/1.1 500 Internal Server Error");
}
else
	header("HTTP/1.1 500 Internal Server Error");
?>