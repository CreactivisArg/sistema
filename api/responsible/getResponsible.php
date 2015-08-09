<?php
require_once('../db.php');
connect_to_db();

if (isset($_POST['id'])) {
    //si viene el $_POST['id'] muestra un solo registro
    $id = $_POST['id'];
    $query = sprintf("select responsible.id, contact.name, contact.lastname, contact.dni, contact.address, contact.phone, contact.mobile, contact.email, contact.facebook, contact.twitter, status.name as status, responsible.id_status from responsible left join contact on contact.id = responsible.id_contact left join status on status.id = responsible.id_status WHERE responsible.id = '%s'",mysql_real_escape_string($id));
    $result = mysql_query ($query);
}
else if (isset($_POST['id_dojo'])) {
    //si viene el $_POST['id_dojo'] muestra los padres del dojo
    $id_dojo = $_POST['id_dojo'];
    $query = sprintf("select responsible.id, contact.name, contact.lastname, contact.dni, contact.address, contact.phone, contact.mobile, contact.email, contact.facebook, contact.twitter, status.name as status, responsible.id_status from responsible left join contact on contact.id = responsible.id_contact left join status on status.id = responsible.id_status left join dojo_padawan on dojo_padawan.id_dojo = '%s' inner join responsible_padawan on responsible_padawan.id_padawan = dojo_padawan.id_padawan order by contact.lastname, contact.name",mysql_real_escape_string($id_dojo));
    $result = mysql_query ($query);
}
else {
    //si NO viene el $_POST['id'] o $_POST['id_dojo'] lista todos los registros
    $query = "select responsible.id, contact.name, contact.lastname, contact.dni, contact.address, contact.phone, contact.mobile, contact.email, contact.facebook, contact.twitter, status.name as status, responsible.id_status from responsible left join contact on contact.id = responsible.id_contact left join status on status.id = responsible.id_status order by contact.lastname, contact.name";
    $result = mysql_query ($query);
}

if ($result) {
    $responsibles = array();
    while ($row = mysql_fetch_row($result)) {
        $idResponsible = $row[0];
        $queryPadawan = sprintf("select padawan.id, contact.name, contact.lastname from responsible_padawan left join padawan on padawan.id = responsible_padawan.id_padawan left join contact on contact.id = padawan.id_contact where responsible_padawan.id_responsible = '%s' order by contact.lastname, contact.name",mysql_real_escape_string($idResponsible));
        $resultPadawan = mysql_query ($queryPadawan);
        $padawans = array();
        while ($rowPadawan = mysql_fetch_row($resultPadawan)) {
            $padawans [] = array('id' => $rowPadawan[0],
                              'name' => utf8_encode($rowPadawan[1]),
                              'lastname' => utf8_encode($rowPadawan[2])
                        );
        }
        $responsibles [] = array('id' => $idResponsible,
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
                            'padawans' => $padawans
                            );
    }
    header('content-type: application/json; charset=utf-8');
    header("HTTP/1.1 200 OK");
    echo json_encode($responsibles);
}
else 
    header("HTTP/1.1 500 Internal Server Error");
?>