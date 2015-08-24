<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
    $rawdata = file_get_contents('php://input');
    $obj = json_decode($rawdata);

    if (isset($obj->id_employee))
        $query = sprintf("select employee.id, contact.name, contact.lastname, contact.dni, contact.country, contact.state, contact.city, contact.address, contact.phone, contact.mobile, contact.email, contact.facebook, contact.twitter, status.name as status, employee.id_status from employee left join contact on contact.id = employee.id_contact left join status on status.id = employee.id_status WHERE employee.id = '%s'",$con->real_escape_string($obj->id_employee));
    else if (isset($obj->id_dojo))
        $query = sprintf("select employee.id, contact.name, contact.lastname, contact.dni, contact.country, contact.state, contact.city, contact.address, contact.phone, contact.mobile, contact.email, contact.facebook, contact.twitter, status.name as status, employee.id_status from employee left join contact on contact.id = employee.id_contact left join status on status.id = employee.id_status inner join dojo_employee on dojo_employee.id_employee = employee.id and dojo_employee.id_dojo = '%s' order by contact.lastname, contact.name",$con->real_escape_string($obj->id_dojo));
    else 
        $query = "select employee.id, contact.name, contact.lastname, contact.dni, contact.country, contact.state, contact.city, contact.address, contact.phone, contact.mobile, contact.email, contact.facebook, contact.twitter, status.name as status, employee.id_status from employee left join contact on contact.id = employee.id_contact left join status on status.id = employee.id_status order by contact.lastname, contact.name";

    $result = $con->query($query);
    if ($result) {
        $employees = array();
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            $id_employee = $row['id'];
            $queryDojo = sprintf("select dojo.id, dojo.name from dojo_employee left join dojo on dojo.id = dojo_employee.id_dojo where dojo_employee.id_employee = '%s' order by dojo.name",$con->real_escape_string($id_employee));
            $resultDojo = $con->query($queryDojo);
            $dojos = array();
            while ($rowDojo = $resultDojo->fetch_array(MYSQLI_ASSOC)) {
                $dojos [] = array('id' => $rowDojo['id'],
                                  'name' => utf8_encode($rowDojo['name'])
                            );
            }
            $resultDojo->free();
            $employees [] = array('id' => $id_employee,
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
                                'dojos' => $dojos
                                );
        }
        $result->free();
        header('content-type: application/json; charset=utf-8');
        header("HTTP/1.1 200 OK");
        echo json_encode($employees);
    }
    else 
        header("HTTP/1.1 500 Internal Server Error");
}
else
    header("HTTP/1.1 500 Internal Server Error");
?>