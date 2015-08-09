<?php
function connect_to_db() {
    $db_host = getenv('IP');
    $db_username = getenv('C9_USER');
    $db_password = '';
    $db_name  = "creactivis";

    $dbLink = mysql_connect($db_host,$db_username,$db_password);
    if (!$dbLink)
        die('ERROR DE CONEXION CON MYSQL: '.mysql_error());

    $database = mysql_select_db($db_name,$dbLink);
    if (!$database)
        die('ERROR CONEXION CON BD: '.mysql_error());

    return $database; 
}
?>