<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
    $rawdata = file_get_contents('php://input');
    $obj = json_decode($rawdata);

    if (isset($obj->id_dojo)) {
        $id_dojo = $obj->id_dojo;
        $query_mentor = sprintf("select log_mentor.id, log_mentor.date, dojo.id as id_dojo, dojo.name as dojo_name, mentor.id as id_mentor, contact.name as mentor_name, contact.lastname as mentor_lastname from log_mentor inner join dojo on dojo.id = log_mentor.id_dojo inner join mentor on mentor.id = log_mentor.id_mentor inner join contact on contact.id = mentor.id_contact where log_mentor.id_dojo = '%s' order by log_mentor.date, contact.lastname, contact.name",$con->real_escape_string($id_dojo));
        $query_padawan = sprintf("select log_padawan.id, log_padawan.date, dojo.id as id_dojo, dojo.name as dojo_name, padawan.id as id_padawan, contact.name as padawan_name, contact.lastname as padawan_lastname from log_padawan inner join dojo on dojo.id = log_padawan.id_dojo inner join padawan on padawan.id = log_padawan.id_padawan inner join contact on contact.id = padawan.id_contact where log_padawan.id_dojo = '%s' order by log_padawan.date, contact.lastname, contact.name",$con->real_escape_string($id_dojo));
        $result_mentor = $con->query($query_mentor);
        $result_padawan = $con->query($query_padawan);
        if (($result_mentor)&&($result_padawan)) {
                $log = array();
                $mentors = array();
                while ($rowMentors = $result_mentor->fetch_array(MYSQLI_ASSOC)) {
                    $mentors [] = array('id' => $rowMentors['id'],
                    					'date' => $rowMentors['date'],
                                        'id_dojo' => $rowMentors['id_dojo'],
                                        'dojo_name' => utf8_encode($rowMentors['dojo_name']),
                                        'id_mentor' => $rowMentors['id_mentor'],
                                        'mentor_name' => utf8_encode($rowMentors['mentor_name']),
                                        'mentor_lastname' => utf8_encode($rowMentors['mentor_lastname'])
                                        );
                }
                $result_mentor->free();
                $padawans = array();
                while ($rowPadawans = $result_padawan->fetch_array(MYSQLI_ASSOC)) {
                    $padawans [] = array('id' => $rowPadawans['id'],
                    					'date' => $rowPadawans['date'],
                                        'id_dojo' => $rowPadawans['id_dojo'],
                                        'dojo_name' => utf8_encode($rowPadawans['dojo_name']),
                                        'id_padawan' => $rowPadawans['id_padawan'],
                                        'padawan_name' => utf8_encode($rowPadawans['padawan_name']),
                                        'padawan_lastname' => utf8_encode($rowPadawans['padawan_lastname'])
                                        );
                }
                $result_padawan->free();
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
        if (isset($obj->id_mentor)) {
            $query = sprintf("select log_mentor.id, log_mentor.date, dojo.id as id_dojo, dojo.name as dojo_name, mentor.id as id_mentor, contact.name as mentor_name, contact.lastname as mentor_lastname from log_mentor inner join dojo on dojo.id = log_mentor.id_dojo inner join mentor on mentor.id = log_mentor.id_mentor inner join contact on contact.id = mentor.id_contact where log_mentor.id_mentor = '%s' order by log_mentor.date, contact.lastname, contact.name",$con->real_escape_string($obj->id_mentor));
            $result = $con->query($query);
            if ($result) {
                $json = array();
                while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
                    $json [] = array(   'id' => $row['id'],
                    					'date' => $row['date'],
                                        'id_dojo' => $row['id_dojo'],
                                        'dojo_name' => utf8_encode($row['dojo_name']),
                                        'id_mentor' => $row['id_mentor'],
                                        'mentor_name' => utf8_encode($row['mentor_name']),
                                        'mentor_lastname' => utf8_encode($row['mentor_lastname'])
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
        else if (isset($obj->id_padawan)) {
            $query = sprintf("select log_padawan.id, log_padawan.date, dojo.id as id_dojo, dojo.name as dojo_name, padawan.id as id_padawan, contact.name as padawan_name, contact.lastname as padawan_lastname from log_padawan inner join dojo on dojo.id = log_padawan.id_dojo inner join padawan on padawan.id = log_padawan.id_padawan inner join contact on contact.id = padawan.id_contact where log_padawan.id_padawan = '%s'order by log_padawan.date, contact.lastname, contact.name",$con->real_escape_string($obj->id_padawan));
            $result = $con->query($query);
            if ($result) {
                $json = array();
                while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
                    $json [] = array(   'id' => $row['id'],
                    					'date' => $row['date'],
                                        'id_dojo' => $row['id_dojo'],
                                        'dojo_name' => utf8_encode($row['dojo_name']),
                                        'id_padawan' => $row['id_padawan'],
                                        'padawan_name' => utf8_encode($row['padawan_name']),
                                        'padawan_lastname' => utf8_encode($row['padawan_lastname'])
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
    }
}
else
    header("HTTP/1.1 500 Internal Server Error");
?>