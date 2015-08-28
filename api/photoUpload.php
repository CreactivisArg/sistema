<?php
require_once('db.php');
$db = new DBConnect();
$con = $db->connect();
if (!is_null($con)){
	if ($_FILES['photo']['name']) {
		if(!$_FILES['photo']['error']) {
			$id_contact = $_POST['id_contact'];
			$photoDir = '../img/photos/'.$id_contact;
			$photoPath = $photoDir.'/'.$_FILES['photo']['name'];
			$path_picture = 'img/photos/'.$id_contact.'/'.$_FILES['photo']['name'];
			if (!file_exists($photoDir))
			    mkdir($photoDir, 0777, true);
			if (file_exists($photoPath))
			 	unlink ($photoPath);
			move_uploaded_file($_FILES['photo']['tmp_name'], $photoPath);
			$updateContact = sprintf("UPDATE contact SET path_picture = '%s' WHERE id = '%s'",$con->real_escape_string($path_picture),$con->real_escape_string($id_contact));
			$resultUpdate = $con->query($updateContact);
			if ($resultUpdate)
				header("HTTP/1.1 200 OK");
			else
				header("HTTP/1.1 500 Internal Server Error");
		}
		else 
	        header("HTTP/1.1 500 Internal Server Error");
	}
	else 
	    header("HTTP/1.1 500 Internal Server Error");
}
else
	header("HTTP/1.1 500 Internal Server Error");
?>