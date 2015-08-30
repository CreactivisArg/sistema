<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
    $rawdata = file_get_contents('php://input');
    $obj = json_decode($rawdata);

    if (isset($obj->id_project))
        $query = sprintf("select project.id, project.name, project.description, project.target, project.why, project.objective, project.scope, status.name as status, project.id_status from project left join status on status.id = project.id_status where project.id = '%s'",$con->real_escape_string($obj->id_project));
    else if (isset($obj->id_dojo))
        $query = sprintf("select distinct project.id, project.name, project.description, project.target, project.why, project.objective, project.scope, status.name as status, project.id_status from dojo_padawan inner join project_padawan on project_padawan.id_padawan = dojo_padawan.id_padawan inner join project on project.id = project_padawan.id_project left join status on status.id = project.id_status where dojo_padawan.id_dojo = '%s' order by project.name",$con->real_escape_string($obj->id_dojo));
    else if (isset($obj->id_category))
        $query = sprintf("select project.id, project.name, project.description, project.target, project.why, project.objective, project.scope, status.name as status, project.id_status from project_category inner join project on project.id = project_category.id_project left join status on status.id = project.id_status where project_category.id_category = '%s' order by project.name",$con->real_escape_string($obj->id_category));
    else if (isset($obj->id_padawan))
        $query = sprintf("select project.id, project.name, project.description, project.target, project.why, project.objective, project.scope, status.name as status, project.id_status from project_padawan inner join project on project.id = project_padawan.id_project left join status on status.id = project.id_status where project_padawan.id_padawan = '%s' order by project.name",$con->real_escape_string($obj->id_padawan));
    else 
        $query = "select project.id, project.name, project.description, project.target, project.why, project.objective, project.scope, status.name as status, project.id_status from project left join status on status.id = project.id_status";

    $result = $con->query($query);
    if ($result) {
        $projects = array();
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            $id_project = $row['id'];
            $queryCategory = sprintf("select category.id, category.name from project_category inner join category on category.id = project_category.id_category where id_project = '%s' order by category.name",$con->real_escape_string($id_project));
            $resultCategory = $con->query($queryCategory);
            $categories = array();
            while ($rowCategory = $resultCategory->fetch_array(MYSQLI_ASSOC)) {
                $categories [] = array('id' => $rowCategory['id'],
                                  'name' => utf8_encode($rowCategory['name'])
                            );
            }
            $resultCategory->free();
            $queryPadawan = sprintf("select padawan.id, contact.name, contact.lastname from project_padawan left join padawan on padawan.id = project_padawan.id_padawan left join contact on contact.id = padawan.id_contact where project_padawan.id_project = '%s' order by contact.lastname, contact.name",$con->real_escape_string($id_project));
            $resultPadawan = $con->query($queryPadawan);
            $padawans = array();
            while ($rowPadawan = $resultPadawan->fetch_array(MYSQLI_ASSOC)) {
                $padawans [] = array('id' => $rowPadawan['id'],
                                  'name' => utf8_encode($rowPadawan['name']),
                                  'lastname' => utf8_encode($rowPadawan['lastname'])
                            );
            }
            $resultPadawan->free();
            $projects [] = array('id' => $id_project,
                                'name' => utf8_encode($row['name']),
                                'categories' => $categories,
                                'description' => utf8_encode($row['description']),
                                'target' => utf8_encode($row['target']),
                                'why' => utf8_encode($row['why']),
                                'objective' => utf8_encode($row['objective']),
                                'scope' => utf8_encode($row['scope']),
                                'status' => utf8_encode($row['status']),
                                'id_status' => $row['id_status'],
                                'padawans' => $padawans
                                );
        }
        $result->free();
        header('content-type: application/json; charset=utf-8');
        header("HTTP/1.1 200 OK");
        echo json_encode($projects);
    }
    else 
        header("HTTP/1.1 500 Internal Server Error");
}
else
    header("HTTP/1.1 500 Internal Server Error");
?>