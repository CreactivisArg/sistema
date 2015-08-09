<?php
require_once('db.php');
connect_to_db();

$query = "SELECT id, name FROM status";
$result = mysql_query ($query);

if ($result) {
    $json = array();
    
    while ($row = mysql_fetch_row($result)) {
        $json [] = array('id' => $row[0],
                         'name' => utf8_encode($row[1])
                        );
    }
    header('content-type: application/json; charset=utf-8');
    header("HTTP/1.1 200 OK");
    echo json_encode($json);
}
else
    header("HTTP/1.1 500 Internal Server Error");
?>