<?php
require_once('../db.php');
connect_to_db();

if (isset($_POST['id']))
{
    //si viene el $_POST['id'] muestra un solo registro
    $id = $_POST['id'];
    $query  = sprintf("select project.id, project.name, project.track, project.description, project.target, project.why, project.who, project.scope, status.name as status, project.id_status from project left join status on status.id = project.id_status where project.id = '%s'",mysql_real_escape_string($id));
    $result = mysql_query ($query);
}
else
{
    //si NO viene el $_POST['id'] lista todos los registros
    $query  = "select project.id, project.name, project.track, project.description, project.target, project.why, project.who, project.scope, status.name as status, project.id_status from project left join status on status.id = project.id_status";
    $result = mysql_query ($query);
}

if ($result)
{
    $projects = array();
    while ($row = mysql_fetch_row($result))
    {
        $idProject = $row[0];
        $queryPadawan  = sprintf("select padawan.id, contact.name, contact.lastname from project_padawan left join padawan on padawan.id = project_padawan.id_padawan left join contact on contact.id = padawan.id_contact where project_padawan.id_project = '%s' order by contact.lastname, contact.name",mysql_real_escape_string($idProject));
        $resultPadawan = mysql_query ($queryPadawan);
        $padawans = array();
        while ($rowPadawan = mysql_fetch_row($resultPadawan)){
            $padawans [] = array('id' => $rowPadawan[0],
                              'name' => $rowPadawan[1],
                              'lastname' => $rowPadawan[2]
                        );
        }
        $projects [] = array('id' => $idProject,
                            'name' => utf8_encode($row[1]),
                            'track' => utf8_encode($row[2]),
                            'description' => utf8_encode($row[3]),
                            'target' => utf8_encode($row[4]),
                            'why' => utf8_encode($row[5]),
                            'who' => utf8_encode($row[6]),
                            'scope' => utf8_encode($row[7]),
                            'status' => utf8_encode($row[8]),
                            'id_status' => $row[9],
                            'padawans' => $padawans
                            );
    }
    header('content-type: application/json; charset=utf-8');
    header("HTTP/1.1 200 OK");
    echo json_encode($projects);
}
else 
    header("HTTP/1.1 500 Internal Server Error");
?>