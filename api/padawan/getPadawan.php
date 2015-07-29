<?php
require_once('../db.php');
connect_to_db();

if (isset($_POST['id']))
{
    //si viene el $_POST['id'] muestra un solo registro
    $id = $_POST['id'];
    $query  = sprintf("select padawan.id, contact.name, contact.lastname, contact.dni, contact.birthdate, contact.address, contact.phone, contact.mobile, contact.email, contact.facebook, contact.twitter, contact.school, status.name as status, padawan.id_status from padawan left join contact on contact.id = padawan.id_contact left join status on status.id = padawan.id_status WHERE padawan.id = '%s'",mysql_real_escape_string($id));
    $result = mysql_query ($query);
}
else if (isset($_POST['id_dojo']))
{
    //si viene el $_POST['id_dojo'] muestra los padawan del dojo
    $id_dojo = $_POST['id_dojo'];
    $query  = sprintf("select padawan.id, contact.name, contact.lastname, contact.dni, contact.birthdate, contact.address, contact.phone, contact.mobile, contact.email, contact.facebook, contact.twitter, contact.school, status.name as status, padawan.id_status from padawan left join contact on contact.id = padawan.id_contact left join status on status.id = padawan.id_status inner join dojo_padawan on dojo_padawan.id_padawan = padawan.id and dojo_padawan.id_dojo = '%s' order by contact.lastname, contact.name",mysql_real_escape_string($id_dojo));
    $result = mysql_query ($query);
}
else
{
    //si NO viene el $_POST['id'] o $_POST['id_dojo'] lista todos los registros
    $query  = "select padawan.id, contact.name, contact.lastname, contact.dni, contact.birthdate, contact.address, contact.phone, contact.mobile, contact.email, contact.facebook, contact.twitter, contact.school, status.name as status, padawan.id_status from padawan left join contact on contact.id = padawan.id_contact left join status on status.id = padawan.id_status order by contact.lastname, contact.name";
    $result = mysql_query ($query);
}

if ($result)
{
    $padawans = array();
    while ($row = mysql_fetch_row($result))
    {
        $idPadawan = $row[0];
        $queryDojo  = sprintf("select dojo.id, dojo.name from dojo_padawan left join dojo on dojo.id = dojo_padawan.id_dojo where dojo_padawan.id_padawan = '%s' order by dojo.name",mysql_real_escape_string($idPadawan));
        $resultDojo = mysql_query ($queryDojo);
        $dojos = array();
        while ($rowDojo = mysql_fetch_row($resultDojo)){
            $dojos [] = array('id' => $rowDojo[0],
                              'name' => $rowDojo[1]
                        );
        }
        $queryResponsibles  = sprintf("select responsible.id, contact.name, contact.lastname from responsible_padawan left join responsible on responsible.id = responsible_padawan.id_responsible left join contact on contact.id = responsible.id_contact where id_padawan = '%s' order by contact.lastname, contact.name",mysql_real_escape_string($idPadawan));
        $resultResponsibles = mysql_query ($queryResponsibles);
        $responsibles = array();
        while ($rowResponsible = mysql_fetch_row($resultResponsibles)){
            $responsibles [] = array('id' => $rowResponsible[0],
                              'name' => $rowResponsible[1],
                              'lastname' => $rowResponsible[2]
                        );
        }
        $queryProject  = sprintf("select project.id, project.name from project_padawan left join project on project.id = project_padawan.id_project where project_padawan.id_padawan = '%s' order by project.name",mysql_real_escape_string($idPadawan));
        $resultProject = mysql_query ($queryProject);
        $projects = array();
        while ($rowProject = mysql_fetch_row($resultProject)){
            $projects [] = array('id' => $rowProject[0],
                              'name' => $rowProject[1]
                        );
        }
        $padawans [] = array('id' => $idPadawan,
                            'name' => utf8_encode($row[1]),
                            'lastname' => utf8_encode($row[2]),
                            'dni' => $row[3],
                            'birthdate' => $row[4],
                            'address' => utf8_encode($row[5]),
                            'phone' => utf8_encode($row[6]),
                            'mobile' => utf8_encode($row[7]),
                            'email' => utf8_encode($row[8]),
                            'facebook' => utf8_encode($row[9]),
                            'twitter' => utf8_encode($row[10]),
                            'school' => utf8_encode($row[11]),
                            'status' => utf8_encode($row[12]),
                            'id_status' => $row[13],
                            'dojos' => $dojos,
                            'responsibles' => $responsibles,
                            'projects' => $projects
                            );
    }
    header('content-type: application/json; charset=utf-8');
    header("HTTP/1.1 200 OK");
    echo json_encode($padawans);
}
else 
    header("HTTP/1.1 500 Internal Server Error");
?>