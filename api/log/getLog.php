<?php
require_once('../db.php');
connect_to_db();

if (isset($_POST['id_dojo'])) {
    //si viene el $_POST['id_mentor'] muestro las asistencias del dojo
    $id_dojo = $_POST['id_dojo'];
    $query_mentor = sprintf("select log_mentor.date, dojo.id as id_dojo, dojo.name as dojo_name, mentor.id as id_mentor, contact.name as mentor_name, contact.lastname as mentor_lastname from log_mentor inner join dojo on dojo.id = log_mentor.id_dojo inner join mentor on mentor.id = log_mentor.id_mentor inner join contact on contact.id = mentor.id_contact where log_mentor.id_dojo = '%s'",mysql_real_escape_string($id_dojo));
    $query_padawan = sprintf("select log_padawan.date, dojo.id as id_dojo, dojo.name as dojo_name, padawan.id as id_padawan, contact.name as padawan_name, contact.lastname as padawan_lastname from log_padawan inner join dojo on dojo.id = log_padawan.id_dojo inner join padawan on padawan.id = log_padawan.id_padawan inner join contact on contact.id = padawan.id_contact where log_padawan.id_dojo = '%s'",mysql_real_escape_string($id_dojo));
    $result_mentor = mysql_query($query_mentor);
    $result_padawan = mysql_query($query_padawan);
    if (($result_mentor)&&($result_padawan)) {
            $log = array();
            $mentors = array();
            while ($rowMentors = mysql_fetch_row($result_mentor)) {
                $mentors [] = array(   'date' => $rowMentors[0],
                                    'id_dojo' => $rowMentors[1],
                                    'dojo_name' => utf8_encode($rowMentors[2]),
                                    'id_mentor' => $rowMentors[3],
                                    'mentor_name' => utf8_encode($rowMentors[4]),
                                    'mentor_lastname' => utf8_encode($rowMentors[5]
                                    );
            }
            $padawans = array();
            while ($rowPadawans = mysql_fetch_row($result_padawan)) {
                $padawans [] = array(   'date' => $rowPadawans[0],
                                    'id_dojo' => $rowPadawans[1],
                                    'dojo_name' => utf8_encode($rowPadawans[2]),
                                    'id_padawan' => $rowPadawans[3],
                                    'padawan_name' => utf8_encode($rowPadawans[4]),
                                    'padawan_lastname' => utf8_encode($rowPadawans[5]
                                    );
            }
            $log [] = array('mentors' => $mentors,
                            'padawans' => $padawans
                        );
            header('content-type: application/json; charset=utf-8');
            header("HTTP/1.1 200 OK");
            echo json_encode($log);
        }
        else 
            header("HTTP/1.1 500 Internal Server Error");
}
else {
    if (isset($_POST['id_mentor'])) {
        //si viene el $_POST['id_mentor'] muestro las asistencias del mentor
        $id_mentor = $_POST['id_mentor'];
        $query = sprintf("select log_mentor.date, dojo.id as id_dojo, dojo.name as dojo_name, mentor.id as id_mentor, contact.name as mentor_name, contact.lastname as mentor_lastname from log_mentor inner join dojo on dojo.id = log_mentor.id_dojo inner join mentor on mentor.id = log_mentor.id_mentor inner join contact on contact.id = mentor.id_contact where log_mentor.id_mentor = '%s'",mysql_real_escape_string($id_mentor));
        $result = mysql_query($query);
        if ($result) {
            $json = array();
            while ($row = mysql_fetch_row($result)) {
                $json [] = array(   'date' => $row[0],
                                    'id_dojo' => $row[1],
                                    'dojo_name' => utf8_encode($row[2]),
                                    'id_mentor' => $row[3],
                                    'mentor_name' => utf8_encode($row[4]),
                                    'mentor_lastname' => utf8_encode($row[5]
                                    );
            }
            header('content-type: application/json; charset=utf-8');
            header("HTTP/1.1 200 OK");
            echo json_encode($json);
        }
        else 
            header("HTTP/1.1 500 Internal Server Error");
    }
    else if (isset($_POST['id_padawan'])) {
        //si viene el $_POST['id_mentor'] muestro las asistencias del padawan
        $id_padawan = $_POST['id_padawan'];
        $query = sprintf("select log_padawan.date, dojo.id as id_dojo, dojo.name as dojo_name, padawan.id as id_padawan, contact.name as padawan_name, contact.lastname as padawan_lastname from log_padawan inner join dojo on dojo.id = log_padawan.id_dojo inner join padawan on padawan.id = log_padawan.id_padawan inner join contact on contact.id = padawan.id_contact where log_padawan.id_padawan = '%s'",mysql_real_escape_string($id_padawan));
        $result = mysql_query($query);
        if ($result) {
            $json = array();
            while ($row = mysql_fetch_row($result)) {
                $json [] = array(   'date' => $row[0],
                                    'id_dojo' => $row[1],
                                    'dojo_name' => utf8_encode($row[2]),
                                    'id_padawan' => $row[3],
                                    'padawan_name' => utf8_encode($row[4]),
                                    'padawan_lastname' => utf8_encode($row[5]
                                    );
            }
            header('content-type: application/json; charset=utf-8');
            header("HTTP/1.1 200 OK");
            echo json_encode($json);
        }
        else 
            header("HTTP/1.1 500 Internal Server Error");
    }
    else
        header("HTTP/1.1 500 Internal Server Error");
}
?>