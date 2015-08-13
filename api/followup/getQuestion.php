<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
    $rawdata = file_get_contents('php://input');
    $obj = json_decode($rawdata);

    if (isset($obj->id_question))
        $query = sprintf("select question.id, question.question from dojo_question inner join question on question.id = dojo_question.id_question where id_dojo = '%s'",$con->real_escape_string($obj->id_question));
    else 
        $query = "select id, question from question";

    $result = $con->query($query);
    if ($result) {
        $json = array();
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            $json [] = array('id' => $row['id'],
                             'question' => utf8_encode($row['question'])
                            );
        }
        $result->free();
        header('content-type: application/json; charset=utf-8');
        header("HTTP/1.1 200 OK");
        echo json_encode($json);
    }
    else 
        header("HTTP/1.1 500 Internal Server Error");
}
else
    header("HTTP/1.1 500 Internal Server Error");
?>