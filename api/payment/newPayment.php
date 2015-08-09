<?php
require_once('../db.php');
connect_to_db();

$rawdata = file_get_contents('php://input');
$obj = json_decode($rawdata);

$month = $obj->month;
$year = $obj->year;
$amount = $obj->amount;
$observation = $obj->observation;
$id_dojo = $obj->id_dojo;
$id_padawan = $obj->id_padawan;

$query = sprintf("INSERT INTO payment (id, date, month, year, amount, observation, id_dojo, id_padawan) VALUES 
((select UUID()), now(), %s, %s, %s, '%s', '%s', '%s');",mysql_real_escape_string($month),mysql_real_escape_string($year),mysql_real_escape_string($amount),mysql_real_escape_string(utf8_decode($observation)),mysql_real_escape_string($id_dojo),mysql_real_escape_string($id_padawan));

$result = mysql_query($query);

if ($result)
    header("HTTP/1.1 200 OK");
else 
	header("HTTP/1.1 500 Internal Server Error");
?>