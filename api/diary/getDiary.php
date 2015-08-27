<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
    $rawdata = file_get_contents('php://input');
    $obj = json_decode($rawdata);

    if (isset($obj->id_diary))
        $query = sprintf("select diary.id, diary.id_padawan, contact.lastname as padawan_lastname, contact.name as padawan_name, diary.id_project, project.name as project_name, diary.date, diary.last_week, diary.daily_target, diary.tools, diary.observations, diary.attitude from diary inner join padawan on padawan.id = diary.id_padawan inner join contact on contact.id = padawan.id_contact inner join project on project.id = diary.id_project where diary.id = '%s' order by diary.date, contact.lastname, contact.name",$con->real_escape_string($obj->id_diary));
    else if (isset($obj->id_dojo))
        $query = sprintf("select distinct diary.id, diary.id_padawan, contact.lastname as padawan_lastname, contact.name as padawan_name, diary.id_project, project.name as project_name, diary.date, diary.last_week, diary.daily_target, diary.tools, diary.observations, diary.attitude from dojo_padawan inner join padawan on padawan.id = dojo_padawan.id_padawan inner join contact on contact.id = padawan.id_contact inner join diary on diary.id_padawan = padawan.id inner join project on project.id = diary.id_project where dojo_padawan.id_dojo = '%s' order by diary.date, contact.lastname, contact.name",$con->real_escape_string($obj->id_dojo));
    else if (isset($obj->id_padawan))
        $query = sprintf("select diary.id, diary.id_padawan, contact.lastname as padawan_lastname, contact.name as padawan_name, diary.id_project, project.name as project_name, diary.date, diary.last_week, diary.daily_target, diary.tools, diary.observations, diary.attitude from padawan inner join contact on contact.id = padawan.id_contact inner join diary on diary.id_padawan = padawan.id inner join project on project.id = diary.id_project where padawan.id = '%s' order by diary.date, contact.lastname, contact.name",$con->real_escape_string($obj->id_padawan));
    else if (isset($obj->id_project))
        $query = sprintf("select diary.id, diary.id_padawan, contact.lastname as padawan_lastname, contact.name as padawan_name, diary.id_project, project.name as project_name, diary.date, diary.last_week, diary.daily_target, diary.tools, diary.observations, diary.attitude from project inner join diary on diary.id_project = project.id inner join padawan on padawan.id = diary.id_padawan inner join contact on contact.id = padawan.id_contact where project.id = '%s' order by diary.date, contact.lastname, contact.name",$con->real_escape_string($obj->id_project));
    else
        $query = "select diary.id, diary.id_padawan, contact.lastname as padawan_lastname, contact.name as padawan_name, diary.id_project, project.name as project_name, diary.date, diary.last_week, diary.daily_target, diary.tools, diary.observations, diary.attitude from diary inner join padawan on padawan.id = diary.id_padawan inner join contact on contact.id = padawan.id_contact inner join project on project.id = diary.id_project order by diary.date, contact.lastname, contact.name";

    $result = $con->query($query);
    if ($result) {
        $diary = array();
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            $diary [] = array('id' => $row['id'],
                                'id_padawan' => $row['id_padawan'],
                                'padawan_name' => utf8_encode($row['padawan_name']),
                                'padawan_lastname' => utf8_encode($row['padawan_lastname']),
                                'id_project' => $row['id_project'],
                                'project_name' => utf8_encode($row['project_name']),
                                'date' => $row['date'],
                                'last_week' => utf8_encode($row['last_week']),
                                'daily_target' => utf8_encode($row['daily_target']),
                                'tools' => utf8_encode($row['tools']),
                                'observations' => utf8_encode($row['observations']),
                                'attitude' => utf8_encode($row['attitude'])
                                );
        }
        $result->free();
        header('content-type: application/json; charset=utf-8');
        header("HTTP/1.1 200 OK");
        echo json_encode($diary);
    }
    else 
        header("HTTP/1.1 500 Internal Server Error");
}
else
    header("HTTP/1.1 500 Internal Server Error");
?>