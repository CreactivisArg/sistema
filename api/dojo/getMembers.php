<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
    $rawdata = file_get_contents('php://input');
    $obj = json_decode($rawdata);

    if (isset($obj->id_dojo)) {
        $members = array();
        $id_dojo = $obj->id_dojo;
        $queryPadawans = sprintf("select padawan.id, contact.name, contact.lastname, contact.dni, contact.birthdate, contact.country, contact.state, contact.city, contact.address, contact.phone, contact.mobile, contact.email, contact.facebook, contact.twitter, contact.school, status.name as status, padawan.id_status, padawan.admission_date, padawan.scholarship from padawan left join contact on contact.id = padawan.id_contact left join status on status.id = padawan.id_status inner join dojo_padawan on dojo_padawan.id_padawan = padawan.id and dojo_padawan.id_dojo = '%s' order by contact.lastname, contact.name",$con->real_escape_string($id_dojo));
        $resultPadawans = $con->query($queryPadawans);
        $padawans = array();
        while ($rowPadawan = $resultPadawans->fetch_array(MYSQLI_ASSOC)) {
            $id_padawan = $rowPadawan['id'];
            $queryResponsibles = sprintf("select responsible.id, contact.name, contact.lastname from responsible_padawan left join responsible on responsible.id = responsible_padawan.id_responsible left join contact on contact.id = responsible.id_contact where id_padawan = '%s' order by contact.lastname, contact.name",$con->real_escape_string($id_padawan));
            $resultResponsibles = $con->query($queryResponsibles);
            $responsiblesAux = array();
            while ($rowResponsible = $resultResponsibles->fetch_array(MYSQLI_ASSOC)) {
                $responsiblesAux [] = array('id' => $rowResponsible['id'],
                                  'name' => utf8_encode($rowResponsible['name']),
                                  'lastname' => utf8_encode($rowResponsible['lastname'])
                                );
            }
            $resultResponsibles->free();
            $queryProject = sprintf("select project.id, project.name from project_padawan left join project on project.id = project_padawan.id_project where project_padawan.id_padawan = '%s' order by project.name",$con->real_escape_string($id_padawan));
            $resultProject = $con->query($queryProject);
            $projectsAux = array();
            while ($rowProject = $resultProject->fetch_array(MYSQLI_ASSOC)) {
                $projectsAux [] = array('id' => $rowProject['id'],
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
                                'name' => utf8_encode($rowPadawan['name']),
                                'lastname' => utf8_encode($rowPadawan['lastname']),
                                'dni' => $rowPadawan['dni'],
                                'birthdate' => $rowPadawan['birthdate'],
                                'country' => utf8_encode($rowPadawan['country']),
                                'state' => utf8_encode($rowPadawan['state']),
                                'city' => utf8_encode($rowPadawan['city']),
                                'address' => utf8_encode($rowPadawan['address']),
                                'phone' => utf8_encode($rowPadawan['phone']),
                                'mobile' => utf8_encode($rowPadawan['mobile']),
                                'email' => utf8_encode($rowPadawan['email']),
                                'facebook' => utf8_encode($rowPadawan['facebook']),
                                'twitter' => utf8_encode($rowPadawan['twitter']),
                                'school' => utf8_encode($rowPadawan['school']),
                                'scholarship' => utf8_encode($rowPadawan['scholarship']),
                                'admission_date' => $rowPadawan['admission_date'],
                                'status' => utf8_encode($rowPadawan['status']),
                                'id_status' => $rowPadawan['id_status'],
                                'responsibles' => $responsiblesAux,
                                'skills' => $skills,
                                'projects' => $projectsAux
                                );
        }
        $resultPadawans->free();
        $queryMentors = sprintf("select mentor.id, contact.name, contact.lastname, contact.dni, contact.country, contact.state, contact.city, contact.address, contact.phone, contact.mobile, contact.email, contact.facebook, contact.twitter, status.name as status, mentor.id_status, mentor.admission_date from mentor left join contact on contact.id = mentor.id_contact left join status on status.id = mentor.id_status inner join dojo_mentor on dojo_mentor.id_mentor = mentor.id and dojo_mentor.id_dojo = '%s' order by contact.lastname, contact.name",$con->real_escape_string($id_dojo));
        $resultMentors = $con->query($queryMentors);
        $mentors = array();
        while ($rowMentors = $resultMentors->fetch_array(MYSQLI_ASSOC)) {
            $id_mentor = $rowMentors['id'];
            $querySkill = sprintf("select skill.id, skill.name from mentor_skill inner join skill on skill.id = mentor_skill.id_skill where id_mentor = '%s' order by skill.name",$con->real_escape_string($id_mentor));
            $resultSkill = $con->query($querySkill);
            $skills = array();
            while ($rowSkill = $resultSkill->fetch_array(MYSQLI_ASSOC)) {
                $skills [] = array('id' => $rowSkill['id'],
                                  'name' => utf8_encode($rowSkill['name'])
                            );
            }
            $resultSkill->free();
            $mentors [] = array('id' => $id_mentor,
                                'name' => utf8_encode($rowMentors['name']),
                                'lastname' => utf8_encode($rowMentors['lastname']),
                                'dni' => $rowMentors['dni'],
                                'country' => utf8_encode($rowMentors['country']),
                                'state' => utf8_encode($rowMentors['state']),
                                'city' => utf8_encode($rowMentors['city']),
                                'address' => utf8_encode($rowMentors['address']),
                                'phone' => utf8_encode($rowMentors['phone']),
                                'mobile' => utf8_encode($rowMentors['mobile']),
                                'email' => utf8_encode($rowMentors['email']),
                                'facebook' => utf8_encode($rowMentors['facebook']),
                                'twitter' => utf8_encode($rowMentors['twitter']),
                                'admission_date' => $rowMentors['admission_date'],
                                'status' => utf8_encode($rowMentors['status']),
                                'id_status' => $rowMentors['id_status'],
                                'skills' => $skills
                                );
        }
        $resultMentors->free();
        $queryResponsibles = sprintf("select distinct responsible.id, contact.name, contact.lastname, contact.dni, contact.country, contact.state, contact.city, contact.address, contact.phone, contact.mobile, contact.email, contact.facebook, contact.twitter, status.name as status, responsible.id_status from responsible left join contact on contact.id = responsible.id_contact left join status on status.id = responsible.id_status left join dojo_padawan on dojo_padawan.id_dojo = '%s' inner join responsible_padawan on responsible_padawan.id_padawan = dojo_padawan.id_padawan and responsible_padawan.id_responsible = responsible.id order by contact.lastname, contact.name",$con->real_escape_string($id_dojo));
        $resultResponsibles = $con->query($queryResponsibles);
        $responsibles = array();
        while ($rowResponsibles = $resultResponsibles->fetch_array(MYSQLI_ASSOC)) {
            $id_responsible = $rowResponsibles['id'];
            $queryPadawan = sprintf("select padawan.id, contact.name, contact.lastname from responsible_padawan left join padawan on padawan.id = responsible_padawan.id_padawan left join contact on contact.id = padawan.id_contact where responsible_padawan.id_responsible = '%s' order by contact.lastname, contact.name",$con->real_escape_string($id_responsible));
            $resultPadawan = $con->query($queryPadawan);
            $padawansAux = array();
            while ($rowPadawan = $resultPadawan->fetch_array(MYSQLI_ASSOC)) {
                $padawansAux [] = array('id' => $rowPadawan['id'],
                                  'name' => utf8_encode($rowPadawan['name']),
                                  'lastname' => utf8_encode($rowPadawan['lastname'])
                            );
            }
            $resultPadawan->free();
            $responsibles [] = array('id' => $id_responsible,
                                'name' => utf8_encode($rowResponsibles['name']),
                                'lastname' => utf8_encode($rowResponsibles['lastname']),
                                'dni' => $rowResponsibles['dni'],
                                'country' => utf8_encode($rowResponsibles['country']),
                                'state' => utf8_encode($rowResponsibles['state']),
                                'city' => utf8_encode($rowResponsibles['city']),
                                'address' => utf8_encode($rowResponsibles['address']),
                                'phone' => utf8_encode($rowResponsibles['phone']),
                                'mobile' => utf8_encode($rowResponsibles['mobile']),
                                'email' => utf8_encode($rowResponsibles['email']),
                                'facebook' => utf8_encode($rowResponsibles['facebook']),
                                'twitter' => utf8_encode($rowResponsibles['twitter']),
                                'status' => utf8_encode($rowResponsibles['status']),
                                'id_status' => $rowResponsibles['id_status'],
                                'padawans' => $padawansAux
                                );
        }
        $resultResponsibles->free();
        $queryEmployees = sprintf("select employee.id, contact.name, contact.lastname, contact.dni, contact.country, contact.state, contact.city, contact.address, contact.phone, contact.mobile, contact.email, contact.facebook, contact.twitter, status.name as status, employee.id_status from employee left join contact on contact.id = employee.id_contact left join status on status.id = employee.id_status inner join dojo_employee on dojo_employee.id_employee = employee.id and dojo_employee.id_dojo = '%s' order by contact.lastname, contact.name",$con->real_escape_string($id_dojo));
        $resultemployees = $con->query($queryEmployees);
        $employees = array();
        while ($rowEmployee = $resultemployees->fetch_array(MYSQLI_ASSOC)) {
            $employees [] = array('id' => $rowEmployee['id'],
                                'name' => utf8_encode($rowEmployee['name']),
                                'lastname' => utf8_encode($rowEmployee['lastname']),
                                'dni' => $rowEmployee['dni'],
                                'country' => utf8_encode($rowEmployee['country']),
                                'state' => utf8_encode($rowEmployee['state']),
                                'city' => utf8_encode($rowEmployee['city']),
                                'address' => utf8_encode($rowEmployee['address']),
                                'phone' => utf8_encode($rowEmployee['phone']),
                                'mobile' => utf8_encode($rowEmployee['mobile']),
                                'email' => utf8_encode($rowEmployee['email']),
                                'facebook' => utf8_encode($rowEmployee['facebook']),
                                'twitter' => utf8_encode($rowEmployee['twitter']),
                                'status' => utf8_encode($rowEmployee['status']),
                                'id_status' => $rowEmployee['id_status'],
                                );
        }
        $resultemployees->free();
        $members [] = array('padawans' => $padawans,
                            'mentors' => $mentors,
                            'responsibles' => $responsibles,
                            'employees' => $employees
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
?>