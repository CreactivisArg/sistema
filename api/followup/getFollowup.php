<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
    $rawdata = file_get_contents('php://input');
    $obj = json_decode($rawdata);

    if (isset($obj->id_followup))
        $query = sprintf("select followup.id as id_followup, followup.date, followup.comment, dojo.id as id_dojo, dojo.name as dojo_name, padawan.id as id_padwan, contact.name as padawan_name, contact.lastname as padawan_lastname from followup inner join dojo on dojo.id = followup.id_dojo inner join padawan on padawan.id = followup.id_padawan inner join contact on contact.id = padawan.id_contact where followup.id = '%s'",$con->real_escape_string($obj->id_followup));
    else if (isset($obj->id_dojo))
        $query = sprintf("select followup.id as id_followup, followup.date, followup.comment, dojo.id as id_dojo, dojo.name as dojo_name, padawan.id as id_padwan, contact.name as padawan_name, contact.lastname as padawan_lastname from followup inner join dojo on dojo.id = followup.id_dojo inner join padawan on padawan.id = followup.id_padawan inner join contact on contact.id = padawan.id_contact where followup.id_dojo = '%s'",$con->real_escape_string($obj->id_dojo));
    else if (isset($obj->id_padawan))
        $query = sprintf("select followup.id as id_followup, followup.date, followup.comment, dojo.id as id_dojo, dojo.name as dojo_name, padawan.id as id_padwan, contact.name as padawan_name, contact.lastname as padawan_lastname from followup inner join dojo on dojo.id = followup.id_dojo inner join padawan on padawan.id = followup.id_padawan inner join contact on contact.id = padawan.id_contact where followup.id_padawan = '%s'",$con->real_escape_string($obj->id_padawan));
    else
        $query = "select followup.id as id_followup, followup.date, followup.comment, dojo.id as id_dojo, dojo.name as dojo_name, padawan.id as id_padwan, contact.name as padawan_name, contact.lastname as padawan_lastname from followup inner join dojo on dojo.id = followup.id_dojo inner join padawan on padawan.id = followup.id_padawan inner join contact on contact.id = padawan.id_contact";

    $result = $con->query($query);
    if ($result) {
        $followup = array();
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            $id_followup = $row['id_followup'];
            $queryAnswer = sprintf("select question.id, question.question, followup_answer.answer from followup_answer inner join question on question.id = followup_answer.id_question where followup_answer.id_followup = '%s'",$con->real_escape_string($id_followup));
            $resultAnswer = $con->query($queryAnswer);
            $answers = array();
            while ($rowAnswer = $resultAnswer->fetch_array(MYSQLI_ASSOC)) {
                $answers [] = array('id_question' => $rowAnswer['id'],
                                    'question' => utf8_encode($rowAnswer['question']),
                                    'answer' => $rowAnswer['answer']
                                    );
            }
            $resultAnswer->free();
            $followup [] = array('id' => $id_followup,
                                'date' => $row['date'],
                                'comment' => utf8_encode($row['comment']),
                                'id_dojo' => $row['id_dojo'],
                                'dojo_name' => utf8_encode($row['dojo_name']),
                                'id_padawan' => $row['id_padawan'],
                                'padawan_name' => utf8_encode($row['padawan_name']),
                                'padawan_lastname' => utf8_encode($row['padawan_lastname']),
                                'answers' => $answers
                                );
        }
        $result->free();
        header('content-type: application/json; charset=utf-8');
        header("HTTP/1.1 200 OK");
        echo json_encode($followup);
    }
    else 
        header("HTTP/1.1 500 Internal Server Error");
}
else
    header("HTTP/1.1 500 Internal Server Error");
?>