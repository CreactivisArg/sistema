<?php
require_once('../db.php');
connect_to_db();

if (isset($_POST['id'])) {
    //si viene el $_POST['id'] muestra un solo registro
    $id = $_POST['id'];
    $query = sprintf("select dojo.id, dojo.name, dojo.address, dojo.city, dojo.description, dojo.phone, dojo.email, dojo.facebook, dojo.twitter, status.name as status, dojo.id_status from dojo left join status on status.id = dojo.id_status WHERE dojo.id = '%s'",mysql_real_escape_string($id));
    $result = mysql_query ($query);
}
else {
    //si NO viene el $_POST['id'] lista todos los registros
    $query = "select dojo.id, dojo.name, dojo.address, dojo.city, dojo.description, dojo.phone, dojo.email, dojo.facebook, dojo.twitter, status.name as status, dojo.id_status from dojo left join status on status.id = dojo.id_status order by dojo.name";
    $result = mysql_query ($query);
}

if ($result) {
    $json = array();
    while ($row = mysql_fetch_row($result)) {
        $json [] = array(   'id' => $row[0],
                            'name' => utf8_encode($row[1]),
                            'address' => utf8_encode($row[2]),
                            'city' => utf8_encode($row[3]),
                            'description' => utf8_encode($row[4]),
                            'phone' => utf8_encode($row[5]),
                            'email' => utf8_encode($row[6]),
                            'facebook' => utf8_encode($row[7]),
                            'twitter' => utf8_encode($row[8]),
                            'status' => utf8_encode($row[9]),
                            'id_status' => $row[10]
                            );
    }
    header('content-type: application/json; charset=utf-8');
    header("HTTP/1.1 200 OK");
    echo json_encode($json);
}
else 
    header("HTTP/1.1 500 Internal Server Error");
?>