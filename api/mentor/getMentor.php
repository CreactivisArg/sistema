<?php
require_once('../db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
    $rawdata = file_get_contents('php://input');
    $obj = json_decode($rawdata);

    if (isset($obj->id_mentor))
        $query = sprintf("select mentor.id, contact.name, contact.lastname, contact.dni, contact.birthdate, contact.address, contact.phone, contact.mobile, contact.email, contact.facebook, contact.twitter, status.name as status, mentor.id_status, mentor.admission_date from mentor left join contact on contact.id = mentor.id_contact left join status on status.id = mentor.id_status WHERE mentor.id = '%s'",$con->real_escape_string($obj->id_mentor));
    else if (isset($obj->id_dojo))
        $query = sprintf("select mentor.id, contact.name, contact.lastname, contact.dni, contact.birthdate, contact.address, contact.phone, contact.mobile, contact.email, contact.facebook, contact.twitter, status.name as status, mentor.id_status, mentor.admission_date from mentor left join contact on contact.id = mentor.id_contact left join status on status.id = mentor.id_status inner join dojo_mentor on dojo_mentor.id_mentor = mentor.id and dojo_mentor.id_dojo = '%s' order by contact.lastname, contact.name",$con->real_escape_string($obj->id_dojo));
    else
        $query = "select mentor.id, contact.name, contact.lastname, contact.dni, contact.birthdate, contact.address, contact.phone, contact.mobile, contact.email, contact.facebook, contact.twitter, status.name as status, mentor.id_status, mentor.admission_date from mentor left join contact on contact.id = mentor.id_contact left join status on status.id = mentor.id_status order by contact.lastname, contact.name";
        
    $result = $con->query($query);
    if ($result) {
        $mentors = array();
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
        	$id_mentor = $row['id'];
        	$queryDojo = sprintf("select dojo.id, dojo.name from dojo_mentor left join dojo on dojo.id = dojo_mentor.id_dojo where dojo_mentor.id_mentor = '%s' order by dojo.name",$con->real_escape_string($id_mentor));
        	$resultDojo = $con->query($queryDojo);
        	$dojos = array();
            while ($rowDojo = $resultDojo->fetch_array(MYSQLI_ASSOC)) {
            	$dojos [] = array('id' => $rowDojo['id'],
            					  'name' => utf8_encode($rowDojo['name'])
            				);
            }
            $resultDojo->free();
            $mentors [] = array('id' => $id_mentor,
                                'name' => utf8_encode($row['name']),
                                'lastname' => utf8_encode($row['lastname']),
                                'dni' => $row['dni'],
                                'birthdate' => $row['birthdate'],
                                'address' => utf8_encode($row['address']),
                                'phone' => utf8_encode($row['phone']),
                                'mobile' => utf8_encode($row['mobile']),
                                'email' => utf8_encode($row['email']),
                                'facebook' => utf8_encode($row['facebook']),
                                'twitter' => utf8_encode($row['twitter']),
                                'status' => utf8_encode($row['status']),
                                'id_status' => $row['id_status'],
                                'admission_date' => $row['admission_date'],
                                'dojos' => $dojos
                                );
        }
        $result->free();
        header('content-type: application/json; charset=utf-8');
        header("HTTP/1.1 200 OK");
        echo json_encode($mentors);
    }
    else 
        header("HTTP/1.1 500 Internal Server Error");
}
else
    header("HTTP/1.1 500 Internal Server Error");
?>