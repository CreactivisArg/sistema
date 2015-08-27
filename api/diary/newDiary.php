<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
	$rawdata = file_get_contents('php://input');
	$obj = json_decode($rawdata);

	$id_padawan = $obj->id_padawan;
	$id_project = $obj->id_project;
	$date = $obj->date;
	$last_week = $obj->last_week;
	$daily_target = $obj->daily_target;
	$tools = $obj->tools;
	$observations = $obj->observations;
	$attitude = $obj->attitude;

	$queryID = "select UUID() as uuid";
	$resultID = $con->query($queryID);
	$rowID = $resultID->fetch_array(MYSQLI_ASSOC);
	$id_diary = $rowID['uuid'];
	$resultID->free();
	
	$query = sprintf("INSERT INTO diary (id, id_padawan, id_project, date, last_week, daily_target, tools, observations, attitude) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s');",
		$id_diary,$con->real_escape_string($id_padawan),$con->real_escape_string($id_project),$con->real_escape_string($date),$con->real_escape_string(utf8_decode($last_week)),$con->real_escape_string(utf8_decode($daily_target)),$con->real_escape_string(utf8_decode($tools)),$con->real_escape_string(utf8_decode($observations)),$con->real_escape_string(utf8_decode($attitude)));
	$result = $con->query($query);
	if ($result)
	    header("HTTP/1.1 200 OK");
	else 
		header("HTTP/1.1 500 Internal Server Error");
}
else
	header("HTTP/1.1 500 Internal Server Error");
?>