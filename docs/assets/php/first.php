<?php 
header("Access-Control-Allow-Origin: http://localhost:4200");


$link = mysqli_connect("127.0.0.1:3306", "root", "", "gmail")
    or die("There is a problem with connection to the database: " . mysql_error() . ":(");

    $result = mysqli_query($link, "SELECT * from gmail");

    $arr = [];
    
    while ($obj = mysqli_fetch_object($result)) {
    
        array_push($arr, $obj);
    
    }
    echo json_encode($arr);



?>