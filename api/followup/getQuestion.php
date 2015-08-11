<?php
require_once('../db.php');
connect_to_db();

if (isset($_POST['id'])) {
    $id = $_POST['id'];
    $query = sprintf("select question.id, question.question from dojo_question inner join question on question.id = dojo_question.id_question where id_dojo = '%s'",mysql_real_escape_string($id));
}
else 
    $query = "select id, question from question";

$result = mysql_query ($query);
if ($result) {
    $json = array();
    while ($row = mysql_fetch_row($result)) {
        $json [] = array(   'id' => $row[0],
                            'question' => utf8_encode($row[1])
                            );
    }
    header('content-type: application/json; charset=utf-8');
    header("HTTP/1.1 200 OK");
    echo json_encode($json);
}
else 
    header("HTTP/1.1 500 Internal Server Error");
?>