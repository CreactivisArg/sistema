<?php
require_once('../db.php');
connect_to_db();

if (isset($_POST['id_dojo'])){
    $members = array();
    $id_dojo = $_POST['id_dojo'];
    $queryPadawans  = sprintf("select padawan.id, contact.name, contact.lastname, contact.dni, contact.birthdate, contact.address, contact.phone, contact.mobile, contact.email, contact.facebook, contact.twitter, contact.school, status.name as status, padawan.id_status from padawan left join contact on contact.id = padawan.id_contact left join status on status.id = padawan.id_status inner join dojo_padawan on dojo_padawan.id_padawan = padawan.id and dojo_padawan.id_dojo = '%s' order by contact.lastname, contact.name",mysql_real_escape_string($id_dojo));
    $resultPadawans = mysql_query ($queryPadawans);
    $padawans = array();
    while ($rowPadawan = mysql_fetch_row($resultPadawans)){
        $padawans [] = array('id' => $rowPadawan[0],
                            'name' => utf8_encode($rowPadawan[1]),
                            'lastname' => utf8_encode($rowPadawan[2]),
                            'dni' => $rowPadawan[3],
                            'birthdate' => $rowPadawan[4],
                            'address' => utf8_encode($rowPadawan[5]),
                            'phone' => utf8_encode($rowPadawan[6]),
                            'mobile' => utf8_encode($rowPadawan[7]),
                            'email' => utf8_encode($rowPadawan[8]),
                            'facebook' => utf8_encode($rowPadawan[9]),
                            'twitter' => utf8_encode($rowPadawan[10]),
                            'school' => utf8_encode($rowPadawan[11]),
                            'status' => utf8_encode($rowPadawan[12]),
                            'id_status' => $rowPadawan[13]
                            );
    }
    $queryMentors  = sprintf("select mentor.id, contact.name, contact.lastname, contact.dni, contact.address, contact.phone, contact.mobile, contact.email, contact.facebook, contact.twitter, status.name as status, mentor.id_status from mentor left join contact on contact.id = mentor.id_contact left join status on status.id = mentor.id_status inner join dojo_mentor on dojo_mentor.id_mentor = mentor.id and dojo_mentor.id_dojo = '%s' order by contact.lastname, contact.name",mysql_real_escape_string($id_dojo));
    $resultMentors = mysql_query ($queryMentors);
    $mentors = array();
    while ($rowMentors = mysql_fetch_row($resultMentors)){
        $mentors [] = array('id' => $rowMentors[0],
                            'name' => utf8_encode($rowMentors[1]),
                            'lastname' => utf8_encode($rowMentors[2]),
                            'dni' => $rowMentors[3],
                            'address' => utf8_encode($rowMentors[4]),
                            'phone' => utf8_encode($rowMentors[5]),
                            'mobile' => utf8_encode($rowMentors[6]),
                            'email' => utf8_encode($rowMentors[7]),
                            'facebook' => utf8_encode($rowMentors[8]),
                            'twitter' => utf8_encode($rowMentors[9]),
                            'status' => utf8_encode($rowMentors[10]),
                            'id_status' => $rowMentors[11]
                            );
    }
    $queryResponsibles  = sprintf("select responsible.id, contact.name, contact.lastname, contact.dni, contact.address, contact.phone, contact.mobile, contact.email, contact.facebook, contact.twitter, status.name as status, responsible.id_status from responsible left join contact on contact.id = responsible.id_contact left join status on status.id = responsible.id_status left join dojo_padawan on dojo_padawan.id_dojo = '%s' inner join responsible_padawan on responsible_padawan.id_padawan = dojo_padawan.id_padawan order by contact.lastname, contact.name",mysql_real_escape_string($id_dojo));
    $resultResponsibles = mysql_query ($queryResponsibles);
    $responsibles = array();
    while ($rowResponsibles = mysql_fetch_row($resultResponsibles)){
        $responsibles [] = array('id' => $rowResponsibles[0],
                            'name' => utf8_encode($rowResponsibles[1]),
                            'lastname' => utf8_encode($rowResponsibles[2]),
                            'dni' => $rowResponsibles[3],
                            'address' => utf8_encode($rowResponsibles[4]),
                            'phone' => utf8_encode($rowResponsibles[5]),
                            'mobile' => utf8_encode($rowResponsibles[6]),
                            'email' => utf8_encode($rowResponsibles[7]),
                            'facebook' => utf8_encode($rowResponsibles[8]),
                            'twitter' => utf8_encode($rowResponsibles[9]),
                            'status' => utf8_encode($rowResponsibles[10]),
                            'id_status' => $rowResponsibles[11]
                            );
    }
    $queryEmployees  = sprintf("select employee.id, contact.name, contact.lastname, contact.dni, contact.address, contact.phone, contact.mobile, contact.email, contact.facebook, contact.twitter, status.name as status, employee.id_status from employee left join contact on contact.id = employee.id_contact left join status on status.id = employee.id_status inner join dojo_employee on dojo_employee.id_employee = employee.id and dojo_employee.id_dojo = '%s' order by contact.lastname, contact.name",mysql_real_escape_string($id_dojo));
    $resultemployees = mysql_query ($queryEmployees);
    $employees = array();
    while ($rowEmployee = mysql_fetch_row($resultemployees)){
        $employees [] = array('id' => $rowEmployee[0],
                            'name' => utf8_encode($rowEmployee[1]),
                            'lastname' => utf8_encode($rowEmployee[2]),
                            'dni' => $rowEmployee[3],
                            'address' => utf8_encode($rowEmployee[4]),
                            'phone' => utf8_encode($rowEmployee[5]),
                            'mobile' => utf8_encode($rowEmployee[6]),
                            'email' => utf8_encode($rowEmployee[7]),
                            'facebook' => utf8_encode($rowEmployee[8]),
                            'twitter' => utf8_encode($rowEmployee[9]),
                            'status' => utf8_encode($rowEmployee[10]),
                            'id_status' => $rowEmployee[11],
                            );
    }
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
?>