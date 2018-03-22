<?php 
header("Access-Control-Allow-Origin: http://localhost:4200");

$from = $_GET['transferFrom'];
$to = $_GET['transferTo'];
$ids = $_GET['ids'];
$stringOfIds = implode(",", $ids);

$connection = new PDO('mysql:host=127.0.0.1:3306;dbname=yourdatabase', "root", "yourpassword");
$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$query = "INSERT INTO $to select * from $from where letters_letter_id IN ($stringOfIds)";

$stmt = $connection->prepare($query);
$stmt->execute();
$query = "DELETE FROM $from WHERE letters_letter_id IN ($stringOfIds)";
$stmt = $connection->prepare($query);
$stmt->execute();
?>