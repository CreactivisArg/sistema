<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
    $query = "SELECT id, name FROM environment order by name";
    $result = $con->query($query);

    if ($result) {
        $json = array();
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            $json [] = array('id' => $row['id'],
                             'name' => utf8_encode($row['name'])
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
?>