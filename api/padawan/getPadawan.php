<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
    $rawdata = file_get_contents('php://input');
    $obj = json_decode($rawdata);

    if (isset($obj->id_padawan))
        $query = sprintf("select padawan.id, contact.name, contact.lastname, contact.dni, contact.birthdate, contact.country, contact.state, contact.city, contact.address, contact.phone, contact.mobile, contact.email, contact.facebook, contact.twitter, contact.school, status.name as status, padawan.id_status, padawan.admission_date from padawan left join contact on contact.id = padawan.id_contact left join status on status.id = padawan.id_status WHERE padawan.id = '%s'",$con->real_escape_string($obj->id_padawan));
    else if (isset($obj->id_dojo))
        $query = sprintf("select padawan.id, contact.name, contact.lastname, contact.dni, contact.birthdate, contact.country, contact.state, contact.city, contact.address, contact.phone, contact.mobile, contact.email, contact.facebook, contact.twitter, contact.school, status.name as status, padawan.id_status, padawan.admission_date from padawan left join contact on contact.id = padawan.id_contact left join status on status.id = padawan.id_status inner join dojo_padawan on dojo_padawan.id_padawan = padawan.id and dojo_padawan.id_dojo = '%s' order by contact.lastname, contact.name",$con->real_escape_string($obj->id_dojo));
    else
        $query = "select padawan.id, contact.name, contact.lastname, contact.dni, contact.birthdate, contact.country, contact.state, contact.city, contact.address, contact.phone, contact.mobile, contact.email, contact.facebook, contact.twitter, contact.school, status.name as status, padawan.id_status, padawan.admission_date from padawan left join contact on contact.id = padawan.id_contact left join status on status.id = padawan.id_status order by contact.lastname, contact.name";

    $result = $con->query($query);
    if ($result) {
        $padawans = array();
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            $id_padawan = $row['id'];
            $queryDojo = sprintf("select dojo.id, dojo.name from dojo_padawan left join dojo on dojo.id = dojo_padawan.id_dojo where dojo_padawan.id_padawan = '%s' order by dojo.name",$con->real_escape_string($id_padawan));
            $resultDojo = $con->query($queryDojo);
            $dojos = array();
            while ($rowDojo = $resultDojo->fetch_array(MYSQLI_ASSOC)) {
                $dojos [] = array('id' => $rowDojo['id'],
                                  'name' => utf8_encode($rowDojo['name'])
                            );
            }
            $resultDojo->free();
            $queryResponsibles = sprintf("select responsible.id, contact.name, contact.lastname from responsible_padawan left join responsible on responsible.id = responsible_padawan.id_responsible left join contact on contact.id = responsible.id_contact where id_padawan = '%s' order by contact.lastname, contact.name",$con->real_escape_string($id_padawan));
            $resultResponsibles = $con->query($queryResponsibles);
            $responsibles = array();
            while ($rowResponsible = $resultResponsibles->fetch_array(MYSQLI_ASSOC)) {
                $responsibles [] = array('id' => $rowResponsible['id'],
                                  'name' => utf8_encode($rowResponsible['name']),
                                  'lastname' => utf8_encode($rowResponsible['lastname'])
                            );
            }
            $resultResponsibles->free();
            $queryProject = sprintf("select project.id, project.name from project_padawan left join project on project.id = project_padawan.id_project where project_padawan.id_padawan = '%s' order by project.name",$con->real_escape_string($id_padawan));
            $resultProject = $con->query($queryProject);
            $projects = array();
            while ($rowProject = $resultProject->fetch_array(MYSQLI_ASSOC)) {
                $projects [] = array('id' => $rowProject['id'],
                                  'name' => utf8_encode($rowProject['name'])
                            );
            }
            $resultProject->free();
            $querySkill = sprintf("select skill.id, skill.name from padawan_skill inner join skill on skill.id = padawan_skill.id_skill where id_padawan = '%s' order by skill.name",$con->real_escape_string($id_padawan));
            $resultSkill = $con->query($querySkill);
            $skills = array();
            while ($rowSkill = $resultSkill->fetch_array(MYSQLI_ASSOC)) {
                $skills [] = array('id' => $rowSkill['id'],
                                  'name' => utf8_encode($rowSkill['name'])
                            );
            }
            $resultSkill->free();
            $padawans [] = array('id' => $id_padawan,
                                'name' => utf8_encode($row['name']),
                                'lastname' => utf8_encode($row['lastname']),
                                'dni' => $row['dni'],
                                'birthdate' => $row['birthdate'],
                                'country' => utf8_encode($row['country']),
                                'state' => utf8_encode($row['state']),
                                'city' => utf8_encode($row['city']),
                                'address' => utf8_encode($row['address']),
                                'phone' => utf8_encode($row['phone']),
                                'mobile' => utf8_encode($row['mobile']),
                                'email' => utf8_encode($row['email']),
                                'facebook' => utf8_encode($row['facebook']),
                                'twitter' => utf8_encode($row['twitter']),
                                'school' => utf8_encode($row['school']),
                                'status' => utf8_encode($row['status']),
                                'id_status' => $row['id_status'],
                                'admission_date' => $row['admission_date'],
                                'skills' => $skills,
                                'dojos' => $dojos,
                                'responsibles' => $responsibles,
                                'projects' => $projects
                                );
        }
        $result->free();
        header('content-type: application/json; charset=utf-8');
        header("HTTP/1.1 200 OK");
        echo json_encode($padawans);
    }
    else 
        header("HTTP/1.1 500 Internal Server Error");
}
else
    header("HTTP/1.1 500 Internal Server Error");
?>