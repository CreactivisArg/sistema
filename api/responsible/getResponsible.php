<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
    $rawdata = file_get_contents('php://input');
    $obj = json_decode($rawdata);

    if (isset($obj->id_responsible))
        $query = sprintf("select responsible.id, contact.name, contact.lastname, contact.dni, contact.country, contact.state, contact.city, contact.address, contact.phone, contact.mobile, contact.email, contact.facebook, contact.twitter, status.name as status, responsible.id_status from responsible left join contact on contact.id = responsible.id_contact left join status on status.id = responsible.id_status WHERE responsible.id = '%s'",$con->real_escape_string($obj->id_responsible));
    else if (isset($obj->id_dojo))
        $query = sprintf("select distinct responsible.id, contact.name, contact.lastname, contact.dni, contact.country, contact.state, contact.city, contact.address, contact.phone, contact.mobile, contact.email, contact.facebook, contact.twitter, status.name as status, responsible.id_status from responsible left join contact on contact.id = responsible.id_contact left join status on status.id = responsible.id_status left join dojo_padawan on dojo_padawan.id_dojo = '%s' inner join responsible_padawan on responsible_padawan.id_padawan = dojo_padawan.id_padawan order by contact.lastname, contact.name",$con->real_escape_string($obj->id_dojo));
    else
        $query = "select responsible.id, contact.name, contact.lastname, contact.dni, contact.country, contact.state, contact.city, contact.address, contact.phone, contact.mobile, contact.email, contact.facebook, contact.twitter, status.name as status, responsible.id_status from responsible left join contact on contact.id = responsible.id_contact left join status on status.id = responsible.id_status order by contact.lastname, contact.name";

    $result = $con->query($query);
    if ($result) {
        $responsibles = array();
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            $id_responsible = $row['id'];
            $queryPadawan = sprintf("select padawan.id, contact.name, contact.lastname from responsible_padawan left join padawan on padawan.id = responsible_padawan.id_padawan left join contact on contact.id = padawan.id_contact where responsible_padawan.id_responsible = '%s' order by contact.lastname, contact.name",$con->real_escape_string($id_responsible));
            $resultPadawan = $con->query($queryPadawan);
            $padawans = array();
            while ($rowPadawan = $resultPadawan->fetch_array(MYSQLI_ASSOC)) {
                $padawans [] = array('id' => $rowPadawan['id'],
                                  'name' => utf8_encode($rowPadawan['name']),
                                  'lastname' => utf8_encode($rowPadawan['lastname'])
                            );
            }
            $resultPadawan->free();
            $responsibles [] = array('id' => $id_responsible,
                                'name' => utf8_encode($row['name']),
                                'lastname' => utf8_encode($row['lastname']),
                                'dni' => $row['dni'],
                                'country' => utf8_encode($row['country']),
                                'state' => utf8_encode($row['state']),
                                'city' => utf8_encode($row['city']),
                                'address' => utf8_encode($row['address']),
                                'phone' => utf8_encode($row['phone']),
                                'mobile' => utf8_encode($row['mobile']),
                                'email' => utf8_encode($row['email']),
                                'facebook' => utf8_encode($row['facebook']),
                                'twitter' => utf8_encode($row['twitter']),
                                'status' => utf8_encode($row['status']),
                                'id_status' => $row['id_status'],
                                'padawans' => $padawans
                                );
        }
        $result->free();
        header('content-type: application/json; charset=utf-8');
        header("HTTP/1.1 200 OK");
        echo json_encode($responsibles);
    }
    else 
        header("HTTP/1.1 500 Internal Server Error");
}
else
    header("HTTP/1.1 500 Internal Server Error");
?>