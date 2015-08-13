<?php
class DBConnect {
    private $conn;
    function __construct() {        
    }
    function connect() {
        $this->conn = new mysqli(getenv('IP'),getenv('C9_USER'),'','creactivis');
        if (mysqli_connect_errno())
            return NULL;
        return $this->conn;
    }
}
?>