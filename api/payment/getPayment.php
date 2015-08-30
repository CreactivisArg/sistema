<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
    $rawdata = file_get_contents('php://input');
    $obj = json_decode($rawdata);

    if (isset($obj->id_payment))
        $query = sprintf("select payment.id, payment.date, payment.month, payment.year, payment.amount, payment.id_method, payment_method.name as method, payment.observation, payment.id_dojo, dojo.name as name_dojo, payment.id_padawan, contact.name as name_padawan, contact.lastname as lastname_padawan from payment inner join payment_method on payment_method.id = payment.id_method inner join dojo on dojo.id = payment.id_dojo inner join padawan on padawan.id = payment.id_padawan inner join contact on contact.id = padawan.id_contact where payment.id = '%s'",$con->real_escape_string($obj->id_payment));
    else if (isset($obj->id_dojo))
        $query = sprintf("select payment.id, payment.date, payment.month, payment.year, payment.amount, payment.id_method, payment_method.name as method, payment.observation, payment.id_dojo, dojo.name as name_dojo, payment.id_padawan, contact.name as name_padawan, contact.lastname as lastname_padawan from payment inner join payment_method on payment_method.id = payment.id_method inner join dojo on dojo.id = payment.id_dojo inner join padawan on padawan.id = payment.id_padawan inner join contact on contact.id = padawan.id_contact where payment.id_dojo = '%s' order by payment.date desc",$con->real_escape_string($obj->id_dojo));
    else if (isset($obj->id_padawan))
        $query = sprintf("select payment.id, payment.date, payment.month, payment.year, payment.amount, payment.id_method, payment_method.name as method, payment.observation, payment.id_dojo, dojo.name as name_dojo, payment.id_padawan, contact.name as name_padawan, contact.lastname as lastname_padawan from payment inner join payment_method on payment_method.id = payment.id_method inner join dojo on dojo.id = payment.id_dojo inner join padawan on padawan.id = payment.id_padawan inner join contact on contact.id = padawan.id_contact where payment.id_padawan = '%s' order by payment.date desc",$con->real_escape_string($obj->id_padawan));
    else
        $query = "select payment.id, payment.date, payment.month, payment.year, payment.amount, payment.id_method, payment_method.name as method, payment.observation, payment.id_dojo, dojo.name as name_dojo, payment.id_padawan, contact.name as name_padawan, contact.lastname as lastname_padawan from payment inner join payment_method on payment_method.id = payment.id_method inner join dojo on dojo.id = payment.id_dojo inner join padawan on padawan.id = payment.id_padawan inner join contact on contact.id = padawan.id_contact order by payment.date desc";

    $result = $con->query($query);
    if ($result) {
        $payments = array();
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            $payments [] = array('id' => $row['id'],
                                'date' => $row['date'],
                                'month' => $row['month'],
                                'year' => $row['year'],
                                'amount' => $row['amount'],
                                'id_method' => $row['id_method'],
                                'method' => utf8_encode($row['method']),
                                'observation' => utf8_encode($row['observation']),
                                'id_dojo' => $row['id_dojo'],
                                'name_dojo' => utf8_encode($row['name_dojo']),
                                'id_padawan' => $row['id_padawan'],
                                'name_padawan' => utf8_encode($row['name_padawan']),
                                'lastname_padawan' => utf8_encode($row['lastname_padawan'])
                                );
        }
        $result->free();
        header('content-type: application/json; charset=utf-8');
        header("HTTP/1.1 200 OK");
        echo json_encode($payments);
    }
    else 
        header("HTTP/1.1 500 Internal Server Error");
}
else
    header("HTTP/1.1 500 Internal Server Error");
?>