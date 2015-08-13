<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
	$rawdata = file_get_contents('php://input');
	$obj = json_decode($rawdata);

	$id_dojo = $obj->id_dojo;
	$id_padawan = $obj->id_padawan;
	$date = $obj->date;
	$comment = $obj->comment;
	$answers = $obj->answers;

	$queryID = "select UUID() as uuid";
	$resultID = $con->query($queryID);
	$rowID = $resultID->fetch_array(MYSQLI_ASSOC);
	$id_followup = $rowID['uuid'];
	$resultID->free();
	
	$error = false;

	$con->begin_transaction();
	$query = sprintf("INSERT INTO followup (id, id_dojo, id_padawan, date, comment) VALUES ('%s', '%s', '%s', '%s', '%s');",
		$id_followup,$con->real_escape_string($id_dojo),$con->real_escape_string($id_padawan),$con->real_escape_string($date),$con->real_escape_string(utf8_decode($comment)));
	$result = $con->query($query);
	if (!$result)
		$error = true;

	foreach ($answers as $answer) {
		$query = sprintf("INSERT INTO followup_answer (id_followup, id_question, answer) VALUES ('%s', '%s', %s)",$id_followup,$con->real_escape_string($answer->id_question),$con->real_escape_string($answer->answer));
		$result = $con->query($query);
		if (!$result)
			$error = true;
	}
	if (!$error) {
		$con->commit();  
	    header("HTTP/1.1 200 OK");
	}
	else {
		$con->rollback();  
		header("HTTP/1.1 500 Internal Server Error");
	}
}
else
	header("HTTP/1.1 500 Internal Server Error");
?>