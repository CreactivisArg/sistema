<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
    $rawdata = file_get_contents('php://input');
    $obj = json_decode($rawdata);

    if (isset($obj->id_dojo))
        $query = sprintf("select dojo.id, dojo.id_environment, environment.name as environment, dojo.name, contact.country, contact.state, contact.city, contact.address, dojo.description, contact.phone, contact.email, contact.facebook, contact.twitter, status.name as status, dojo.id_status from dojo inner join contact on contact.id = dojo.id_contact left join environment on environment.id = dojo.id_environment left join status on status.id = dojo.id_status where dojo.id = '%s'",$con->real_escape_string($obj->id_dojo));
    else if (isset($obj->id_environment))
        $query = sprintf("select dojo.id, dojo.id_environment, environment.name as environment, dojo.name, contact.country, contact.state, contact.city, contact.address, dojo.description, contact.phone, contact.email, contact.facebook, contact.twitter, status.name as status, dojo.id_status from dojo inner join contact on contact.id = dojo.id_contact left join environment on environment.id = dojo.id_environment left join status on status.id = dojo.id_status where dojo.id_environment = '%s' order by dojo.name",$con->real_escape_string($obj->id_environment));
    else
        $query = "select dojo.id, dojo.id_environment, environment.name as environment, dojo.name, contact.country, contact.state, contact.city, contact.address, dojo.description, contact.phone, contact.email, contact.facebook, contact.twitter, status.name as status, dojo.id_status from dojo inner join contact on contact.id = dojo.id_contact left join environment on environment.id = dojo.id_environment left join status on status.id = dojo.id_status order by dojo.name";

    $result = $con->query($query);
    if ($result) {
        $json = array();
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            $json [] = array(   'id' => $row['id'],
                                'id_environment' => utf8_encode($row['id_environment']),
                                'environment' => utf8_encode($row['environment']),
                                'name' => utf8_encode($row['name']),
                                'country' => utf8_encode($row['country']),
                                'state' => utf8_encode($row['state']),
                                'city' => utf8_encode($row['city']),
                                'address' => utf8_encode($row['address']),
                                'description' => utf8_encode($row['description']),
                                'phone' => utf8_encode($row['phone']),
                                'email' => utf8_encode($row['email']),
                                'facebook' => utf8_encode($row['facebook']),
                                'twitter' => utf8_encode($row['twitter']),
                                'status' => utf8_encode($row['status']),
                                'id_status' => $row['id_status']
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