<?php
require_once('../db.php');
connect_to_db();

if (isset($_POST['id'])) {
    //si viene el $_POST['id'] muestra un solo registro
    $id = $_POST['id'];
    $query = sprintf("select followup.id as id_followup, followup.date, followup.comment, dojo.id as id_dojo, dojo.name as dojo_name, padawan.id as id_padwan, contact.name as padawan_name, contact.lastname as padawan_lastname from followup inner join dojo on dojo.id = followup.id_dojo inner join padawan on padawan.id = followup.id_padawan inner join contact on contact.id = padawan.id_contact where followup.id = '%s'",mysql_real_escape_string($id));
    $result = mysql_query ($query);
}
else if (isset($_POST['id_dojo'])) {
    //si viene el $_POST['id_dojo'] muestra los seguimientos del dojo
    $id_dojo = $_POST['id_dojo'];
    $query = sprintf("select followup.id as id_followup, followup.date, followup.comment, dojo.id as id_dojo, dojo.name as dojo_name, padawan.id as id_padwan, contact.name as padawan_name, contact.lastname as padawan_lastname from followup inner join dojo on dojo.id = followup.id_dojo inner join padawan on padawan.id = followup.id_padawan inner join contact on contact.id = padawan.id_contact where followup.id_dojo = '%s'",mysql_real_escape_string($id_dojo));
    $result = mysql_query ($query);
}
else if (isset($_POST['id_padawan'])) {
    //si viene el $_POST['id_padawan'] muestra los seguimientos del padawan
    $id_padawan = $_POST['id_padawan'];
    $query = sprintf("select followup.id as id_followup, followup.date, followup.comment, dojo.id as id_dojo, dojo.name as dojo_name, padawan.id as id_padwan, contact.name as padawan_name, contact.lastname as padawan_lastname from followup inner join dojo on dojo.id = followup.id_dojo inner join padawan on padawan.id = followup.id_padawan inner join contact on contact.id = padawan.id_contact where followup.id_padawan = '%s'",mysql_real_escape_string($id_padawan));
    $result = mysql_query ($query);
}
else {
    //si NO viene el $_POST['id'] o $_POST['id_dojo'] o $_POST['id_padawan'] lista todos los registros
    $query = "select followup.id as id_followup, followup.date, followup.comment, dojo.id as id_dojo, dojo.name as dojo_name, padawan.id as id_padwan, contact.name as padawan_name, contact.lastname as padawan_lastname from followup inner join dojo on dojo.id = followup.id_dojo inner join padawan on padawan.id = followup.id_padawan inner join contact on contact.id = padawan.id_contact";
    $result = mysql_query ($query);
}

if ($result) {
    $followup = array();
    while ($row = mysql_fetch_row($result)) {
        $id_followup = $row[0];
        $queryAnswer = sprintf("select question.id as id_question, question.question, followup_answer.answer from followup_answer inner join question on question.id = followup_answer.id_question where followup_answer.id_followup = '%s'",mysql_real_escape_string($id_followup));
        $resultAnswer = mysql_query ($queryAnswer);
        $answers = array();
        while ($rowAnswer = mysql_fetch_row($resultAnswer)) {
            $answers [] = array('id_question' => $rowAnswer[0],
                                'question' => utf8_encode($rowAnswer[1]),
                                'answer' => $rowAnswer[2]
                        );
        }
        $followup [] = array('id' => $id_followup,
                            'date' => $row[1],
                            'comment' => utf8_encode($row[2]),
                            'id_dojo' => $row[3],
                            'dojo_name' => utf8_encode($row[4]),
                            'id_padawan' => $row[5],
                            'padawan_name' => utf8_encode($row[6]),
                            'padawan_lastname' => utf8_encode($row[7]),
                            'answers' => $answers
                            );
    }
    header('content-type: application/json; charset=utf-8');
    header("HTTP/1.1 200 OK");
    echo json_encode($followup);
}
else 
    header("HTTP/1.1 500 Internal Server Error");
?>