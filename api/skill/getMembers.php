<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
    $rawdata = file_get_contents('php://input');
    $obj = json_decode($rawdata);

    if (isset($obj->id_skill)) {
        $id_skill = $obj->id_skill;
        $query_mentor = sprintf("select mentor.id, contact.lastname, contact.name from mentor_skill inner join mentor on mentor.id = mentor_skill.id_mentor inner join contact on contact.id = mentor.id_contact where mentor_skill.id_skill = '%s' order by contact.lastname, contact.name",$con->real_escape_string($id_skill));
        $query_padawan = sprintf("select padawan.id, contact.lastname, contact.name from padawan_skill inner join padawan on padawan.id = padawan_skill.id_padawan inner join contact on contact.id = padawan.id_contact where padawan_skill.id_skill = '%s' order by contact.lastname, contact.name",$con->real_escape_string($id_skill));
        $result_mentor = $con->query($query_mentor);
        $result_padawan = $con->query($query_padawan);
        if (($result_mentor)&&($result_padawan)) {
                $members = array();
                $mentors = array();
                while ($rowMentors = $result_mentor->fetch_array(MYSQLI_ASSOC)) {
                    $mentors [] = array('id' => $rowMentors['id'],
                                        'name' => utf8_encode($rowMentors['name']),
                                        'lastname' => utf8_encode($rowMentors['lastname'])
                                        );
                }
                $result_mentor->free();
                $padawans = array();
                while ($rowPadawans = $result_padawan->fetch_array(MYSQLI_ASSOC)) {
                    $padawans [] = array('id' => $rowPadawans['id'],
                                        'name' => utf8_encode($rowPadawans['name']),
                                        'lastname' => utf8_encode($rowPadawans['lastname'])
                                        );
                }
                $result_padawan->free();
                $members [] = array('mentors' => $mentors,
                                'padawans' => $padawans
                            );
                header('content-type: application/json; charset=utf-8');
                header("HTTP/1.1 200 OK");
                echo json_encode($members);
            }
            else 
                header("HTTP/1.1 500 Internal Server Error");
    }
    else 
        header("HTTP/1.1 500 Internal Server Error");
}
else
    header("HTTP/1.1 500 Internal Server Error");
?>