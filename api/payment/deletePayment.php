<?php
require_once('../db.php');
connect_to_db();

if (isset($_POST['id'])) {
    //si viene el $_POST['id'] muestra un solo registro
    $id = $_POST['id'];
    $query  = sprintf("delete from payment where id = '%s'",mysql_real_escape_string($id));
    $result = mysql_query ($query);
    if ($result)
		header("HTTP/1.1 200 OK");
    else 
    	header("HTTP/1.1 500 Internal Server Error");
}
else 
    header("HTTP/1.1 500 Internal Server Error");
?>