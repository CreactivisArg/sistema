<?php
require_once('../db.php');
connect_to_db();

if (isset($_POST['id'])) {
    //si viene el $_POST['id'] muestra un solo registro
    $id = $_POST['id'];
    $query = sprintf("select payment.id, payment.date, payment.month, payment.year, payment.amount, payment.observation, payment.id_dojo, dojo.name as dojo, payment.id_padawan, contact.name as name_padwan, contact.lastname as lastname_padawan from payment inner join dojo on dojo.id = payment.id_dojo inner join padawan on padawan.id = payment.id_padawan inner join contact on contact.id = padawan.id_contact where payment.id = '%s'",mysql_real_escape_string($id));
    $result = mysql_query ($query);
}
else if (isset($_POST['id_dojo'])) {
    //si viene el $_POST['id_dojo'] muestra los pagos del dojo
    $id_dojo = $_POST['id_dojo'];
    $query = sprintf("select payment.id, payment.date, payment.month, payment.year, payment.amount, payment.observation, payment.id_dojo, dojo.name as dojo, payment.id_padawan, contact.name as name_padwan, contact.lastname as lastname_padawan from payment inner join dojo on dojo.id = payment.id_dojo inner join padawan on padawan.id = payment.id_padawan inner join contact on contact.id = padawan.id_contact where payment.id_dojo = '%s' order by payment.date desc",mysql_real_escape_string($id_dojo));
    $result = mysql_query ($query);
}
else if (isset($_POST['id_padawan'])) {
    //si viene el $_POST['id_padawan'] muestra los pagos del padawan
    $id_padawan = $_POST['id_padawan'];
    $query = sprintf("select payment.id, payment.date, payment.month, payment.year, payment.amount, payment.observation, payment.id_dojo, dojo.name as dojo, payment.id_padawan, contact.name as name_padwan, contact.lastname as lastname_padawan from payment inner join dojo on dojo.id = payment.id_dojo inner join padawan on padawan.id = payment.id_padawan inner join contact on contact.id = padawan.id_contact where payment.id_padawan = '%s' order by payment.date desc",mysql_real_escape_string($id_padawan));
    $result = mysql_query ($query);
}
else {
    //si NO viene el $_POST['id'] o $_POST['id_dojo'] o $_POST['id_padawan'] lista todos los registros
    $query = "select payment.id, payment.date, payment.month, payment.year, payment.amount, payment.observation, payment.id_dojo, dojo.name as dojo, payment.id_padawan, contact.name as name_padwan, contact.lastname as lastname_padawan from payment inner join dojo on dojo.id = payment.id_dojo inner join padawan on padawan.id = payment.id_padawan inner join contact on contact.id = padawan.id_contact order by payment.date desc";
    $result = mysql_query ($query);
}

if ($result) {
    $payments = array();
    while ($row = mysql_fetch_row($result)) {
        $payments [] = array('id' => $row[0],
                            'date' => $row[1],
                            'month' => $row[2],
                            'year' => $row[3],
                            'amount' => $row[4],
                            'observation' => utf8_encode($row[5]),
                            'id_dojo' => $row[6],
                            'name_dojo' => utf8_encode($row[7]),
                            'id_padawan' => $row[8],
                            'name_padawan' => utf8_encode($row[9]),
                            'lastname_padawan' => utf8_encode($row[10])
                            );
    }
    header('content-type: application/json; charset=utf-8');
    header("HTTP/1.1 200 OK");
    echo json_encode($payments);
}
else 
    header("HTTP/1.1 500 Internal Server Error");
?>