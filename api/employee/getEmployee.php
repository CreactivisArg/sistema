<?php
require_once('../db.php');
connect_to_db();

if (isset($_POST['id'])) {
    //si viene el $_POST['id'] muestra un solo registro
    $id = $_POST['id'];
    $query = sprintf("select employee.id, contact.name, contact.lastname, contact.dni, contact.address, contact.phone, contact.mobile, contact.email, contact.facebook, contact.twitter, status.name as status, employee.id_status from employee left join contact on contact.id = employee.id_contact left join status on status.id = employee.id_status WHERE employee.id = '%s'",mysql_real_escape_string($id));
    $result = mysql_query ($query);
}
else if (isset($_POST['id_dojo'])) {
    //si viene el $_POST['id_dojo'] muestra los empleados del dojo
    $id_dojo = $_POST['id_dojo'];
    $query = sprintf("select employee.id, contact.name, contact.lastname, contact.dni, contact.address, contact.phone, contact.mobile, contact.email, contact.facebook, contact.twitter, status.name as status, employee.id_status from employee left join contact on contact.id = employee.id_contact left join status on status.id = employee.id_status inner join dojo_employee on dojo_employee.id_employee = employee.id and dojo_employee.id_dojo = '%s' order by contact.lastname, contact.name",mysql_real_escape_string($id_dojo));
    $result = mysql_query ($query);
}
else {
    //si NO viene el $_POST['id'] o $_POST['id_dojo'] lista todos los registros
    $query = "select employee.id, contact.name, contact.lastname, contact.dni, contact.address, contact.phone, contact.mobile, contact.email, contact.facebook, contact.twitter, status.name as status, employee.id_status from employee left join contact on contact.id = employee.id_contact left join status on status.id = employee.id_status order by contact.lastname, contact.name";
    $result = mysql_query ($query);
}

if ($result) {
    $employees = array();
    while ($row = mysql_fetch_row($result)) {
        $idEmployee = $row[0];
        $queryDojo = sprintf("select dojo.id, dojo.name from dojo_employee left join dojo on dojo.id = dojo_employee.id_dojo where dojo_employee.id_employee = '%s' order by dojo.name",mysql_real_escape_string($idEmployee));
        $resultDojo = mysql_query ($queryDojo);
        $dojos = array();
        while ($rowDojo = mysql_fetch_row($resultDojo)) {
            $dojos [] = array('id' => $rowDojo[0],
                              'name' => utf8_encode($rowDojo[1])
                        );
        }
        $employees [] = array('id' => $idEmployee,
                            'name' => utf8_encode($row[1]),
                            'lastname' => utf8_encode($row[2]),
                            'dni' => $row[3],
                            'address' => utf8_encode($row[4]),
                            'phone' => utf8_encode($row[5]),
                            'mobile' => utf8_encode($row[6]),
                            'email' => utf8_encode($row[7]),
                            'facebook' => utf8_encode($row[8]),
                            'twitter' => utf8_encode($row[9]),
                            'status' => utf8_encode($row[10]),
                            'id_status' => $row[11],
                            'dojos' => $dojos
                            );
    }
    header('content-type: application/json; charset=utf-8');
    header("HTTP/1.1 200 OK");
    echo json_encode($employees);
}
else 
    header("HTTP/1.1 500 Internal Server Error");
?>