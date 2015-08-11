<?php
require_once('../db.php');
connect_to_db();

$rawdata = file_get_contents('php://input');
$obj = json_decode($rawdata);

$id_dojo = $obj->id_dojo;
$id_padawan = $obj->id_padawan;
$date = $obj->date;
$comment = $obj->comment;
$answers = $obj->answers;

$queryID = "select UUID() as uuid";
$resultID = mysql_query($queryID);
$rowID = mysql_fetch_row($resultID);
$id_followup = $rowID[0];

$error = false;

mysql_query("BEGIN"); 
$query = sprintf("INSERT INTO followup (id, id_dojo, id_padawan, date, comment) VALUES ('%s', '%s', '%s', '%s', '%s');",$id_followup,mysql_real_escape_string($id_dojo),mysql_real_escape_string($id_padawan),mysql_real_escape_string($date),mysql_real_escape_string(utf8_decode($comment)));
$result = mysql_query($query);
if (!$result)
	$error = true;

foreach ($answers as $answer) {
	$query = sprintf("INSERT INTO followup_answer (id_followup, id_question, answer) VALUES ('%s', '%s', %s)",$id_followup,mysql_real_escape_string($answer->id_question),mysql_real_escape_string($answer->answer));
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