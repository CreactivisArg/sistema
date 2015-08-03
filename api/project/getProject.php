<?php
require_once('../db.php');
connect_to_db();

if (isset($_POST['id']))
{
    //si viene el $_POST['id'] muestra un solo registro
    $id = $_POST['id'];
    $query  = sprintf("select project.id, project.name, project.description, project.target, project.why, project.who, project.scope, status.name as status, project.id_status from project left join status on status.id = project.id_status where project.id = '%s'",mysql_real_escape_string($id));
    $result = mysql_query ($query);
}
else if (isset($_POST['id_dojo']))
{
    //si viene el $_POST['id_dojo'] muestra los proyectos del dojo
    $id_dojo = $_POST['id_dojo'];
    $query  = sprintf("select project.id, project.name, project.description, project.target, project.why, project.who, project.scope, status.name as status, project.id_status from dojo_padawan inner join project_padawan on project_padawan.id_padawan = dojo_padawan.id_padawan inner join project on project.id = project_padawan.id_project left join status on status.id = project.id_status where dojo_padawan.id_dojo = '%s' order by project.name",mysql_real_escape_string($id_dojo));
    $result = mysql_query ($query);
}
else if (isset($_POST['id_category']))
{
    //si viene el $_POST['id_category'] muestra los proyectos de la categoría
    $id_category = $_POST['id_category'];
    $query  = sprintf("select project.id, project.name, project.description, project.target, project.why, project.who, project.scope, status.name as status, project.id_status from project_category inner join project on project.id = project_category.id_project left join status on status.id = project.id_status where project_category.id_category = '%s' order by project.name",mysql_real_escape_string($id_category));
    $result = mysql_query ($query);
}
else if (isset($_POST['id_padawan']))
{
    //si viene el $_POST['id_padawan'] muestra los proyectos del padawan
    $id_padawan = $_POST['id_padawan'];
    $query  = sprintf("select project.id, project.name, project.description, project.target, project.why, project.who, project.scope, status.name as status, project.id_status from project_padawan inner join project on project.id = project_padawan.id_project left join status on status.id = project.id_status where project_padawan.id_padawan = '%s' order by project.name",mysql_real_escape_string($id_padawan));
    $result = mysql_query ($query);
}
else
{
    //si NO viene el $_POST['id'] o $_POST['id_dojo'] o $_POST['id_category'] o $_POST['id_padawan'] lista todos los registros
    $query  = "select project.id, project.name, project.description, project.target, project.why, project.who, project.scope, status.name as status, project.id_status from project left join status on status.id = project.id_status";
    $result = mysql_query ($query);
}

if ($result)
{
    $projects = array();
    while ($row = mysql_fetch_row($result))
    {
        $idProject = $row[0];
        $queryCategory  = sprintf("select category.id, category.name from project_category inner join category on category.id = project_category.id_category where id_project = '%s' order by category.name",mysql_real_escape_string($idProject));
        $resultCategory = mysql_query ($queryCategory);
        $categories = array();
        while ($rowCategory = mysql_fetch_row($resultCategory)){
            $categories [] = array('id' => $rowCategory[0],
                              'name' => $rowCategory[1]
                        );
        }
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
                            'categories' => $categories,
                            'description' => utf8_encode($row[2]),
                            'target' => utf8_encode($row[3]),
                            'why' => utf8_encode($row[4]),
                            'who' => utf8_encode($row[5]),
                            'scope' => utf8_encode($row[6]),
                            'status' => utf8_encode($row[7]),
                            'id_status' => $row[8],
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